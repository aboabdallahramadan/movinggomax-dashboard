'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { notificationsService } from "@/services/notificationsService";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NewNotificationPage: React.FC = () => {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [missions, setMissions] = useState<Array<{id: string, name: string}>>([]);
    const [invoices, setInvoices] = useState<Array<{id: string, name: string}>>([]);

    useEffect(() => {
        setMissions([
            { id: 'mission-1', name: 'Project Alpha' },
            { id: 'mission-2', name: 'Project Beta' }
        ]);
        
        setInvoices([
            { id: 'invoice-1', name: 'INV-2023-001' },
            { id: 'invoice-2', name: 'INV-2023-002' }
        ]);
    }, []);

    const validateForm = (formData: FormData): boolean => {
        const newErrors: Record<string, string> = {};
        const content = formData.get('content') as string;
        const userIds = formData.get('userIds') as string;

        if (!content?.trim()) {
            newErrors.content = "Content is required";
        }
        

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        if (!validateForm(formData)) return;

        const newNotification = {
            content: formData.get('content') as string,
            userIds: (formData.get('userIds') as string).split(','),
            missionId: (formData.get('missionId') as string) || undefined,
            invoiceId: (formData.get('invoiceId') as string) || undefined,
            isGlobal: formData.get('isGlobal') === 'true'
        };

        await notificationsService.createCustomNotification(newNotification);
        router.push('/notifications');
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Notification" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Create New Notification
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Content <span className="text-red">*</span>
                        </label>
                        <textarea
                            name="content"
                            rows={4}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.content && <p className="text-red mt-1">{errors.content}</p>}
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            User IDs (comma separated) <span className="text-red">*</span>
                        </label>
                        <input
                            type="text"
                            name="userIds"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.userIds && <p className="text-red mt-1">{errors.userIds}</p>}
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Mission
                        </label>
                        <select
                            name="missionId"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                            <option value="">Select Mission</option>
                            {missions.map(mission => (
                                <option key={mission.id} value={mission.id}>
                                    {mission.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Invoice
                        </label>
                        <select
                            name="invoiceId"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                            <option value="">Select Invoice</option>
                            {invoices.map(invoice => (
                                <option key={invoice.id} value={invoice.id}>
                                    {invoice.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="flex cursor-pointer">
                            <input
                                type="checkbox"
                                name="isGlobal"
                                value="true"
                                className="mr-2"
                            />
                            <span className="text-black dark:text-white">Is Global Notification</span>
                        </label>
                    </div>

                    <button type="submit" className="flex justify-center rounded bg-primary p-3 font-medium text-white">
                        Send Notification
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default NewNotificationPage;
