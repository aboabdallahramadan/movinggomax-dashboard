'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { UsersService } from "@/services/usersService";
import { User } from "@/types/BackendModels";
import { useEffect, useState } from "react";

const UserDetailsPage = ({ params }: { params: { id: string } }) => {
    const [user, setUser] = useState<User | null>(null);
    const userService = new UsersService();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await userService.getById(params.id);
                setUser(userData);
            } catch (error) {
                console.error('Error loading user:', error);
            }
        };
        loadUser()
    }, [params.id]);

    if (!user) {
        return (
            <DefaultLayout>
                <div>Loading...</div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            {/* <Breadcrumb pageName={`User Details - ${user.UserName}`} /> */}
            <Breadcrumb pageName={`User Details`} />

            <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-5">
                        <div>
                            <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                                Basic Information
                            </h3>
                            <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <span className="text-sm text-gray-4 dark:text-gray-6">Username:</span>
                                        <p className="text-black dark:text-white">{user.UserName}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-4 dark:text-gray-6">Email:</span>
                                        <p className="text-black dark:text-white">{user.Email}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-4 dark:text-gray-6">Phone Number:</span>
                                        <p className="text-black dark:text-white">{user.PhoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div>
                            <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                                Account Status
                            </h3>
                            <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
                                <div className="flex flex-col gap-3">
                                    {/* <div>
                                        <span className="text-sm text-gray-4 dark:text-gray-6">Account Created:</span>
                                        <p className="text-black dark:text-white">
                                            {new Date(user.CreatedAt).toLocaleDateString()}
                                        </p>
                                    </div> */}
                                    <div>
                                        <span className="text-sm text-gray-4 dark:text-gray-6">Status:</span>
                                        <p className={`${user.IsActive ? 'text-green-500' : 'text-red-500'}`}>
                                            {user.IsActive ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default UserDetailsPage;
