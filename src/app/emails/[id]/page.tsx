'use client';

import { useEffect, useState } from 'react';
import { Email } from '@/types/BackendModels';
import { EmailService } from '@/services/emailService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const EmailDetails = ({ params }: { params: { id: string } }) => {
    const [email, setEmail] = useState<Email | null>(null);
    const emailService = new EmailService();

    useEffect(() => {
        const fetchEmail = async () => {
            const data = await emailService.getById(params.id);
            setEmail(data);
        };
        fetchEmail();
    }, [params.id]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Email Details" />

            <div className="rounded-[20px] border border-stroke bg-white p-9 shadow-2xl dark:border-strokedark dark:bg-boxdark">
                {email ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-dark dark:text-white">
                                Contact Request #{email.Id}
                            </h2>

                            <div className="space-y-4 rounded-2xl bg-gray-1 p-6 dark:bg-meta-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">First Name</span>
                                        <span className="font-medium text-dark dark:text-white">{email.firstName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Last Name</span>
                                        <span className="font-medium text-dark dark:text-white">{email.lastName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Phone Number</span>
                                        <span className="font-medium text-dark dark:text-white">{email.phoneNumber}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                                        <span className="font-medium text-dark dark:text-white">{email.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-meta-4">
                                <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">Location</h3>
                                <p className="text-gray-600 dark:text-gray-300">{email.location}</p>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-meta-4">
                                <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">Message</h3>
                                <p className="text-gray-600 dark:text-gray-300">{email.message}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-40 items-center justify-center">
                        <div className="text-lg font-medium text-body-color">Loading email details...</div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default EmailDetails;
