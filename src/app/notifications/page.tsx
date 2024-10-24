'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { NotificationsService } from "@/services/notificationsService";
import { NotificationVwModel } from "@/types/BackendModels";
import { useEffect, useState } from "react";

const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationVwModel[]>([]);
    const [totalNotifications, setTotalNotifications] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const notificationService = new NotificationsService();

    useEffect(() => {
        const loadNotifications = async () => {
            const result = await notificationService.getPaginated(currentPage, pageSize);
            setNotifications(result.data);
            setTotalNotifications(result.total);
        };
        loadNotifications();
    }, [currentPage]);

    const handleMarkAsRead = async (id: string) => {
        await notificationService.markAsRead(id);
        // Refresh notifications after marking as read
        const result = await notificationService.getPaginated(currentPage, pageSize);
        setNotifications(result.data);
    };

    const handleDelete = async (id: string) => {
        await notificationService.deleteNotification(id);
        // Refresh notifications after deletion
        const result = await notificationService.getPaginated(currentPage, pageSize);
        setNotifications(result.data);
        setTotalNotifications(prev => prev - 1);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Notifications" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex justify-between mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        All Notifications
                    </h4>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Content
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Date
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Mission
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Invoice
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((notification) => (
                                <tr key={notification.Id}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {notification.Content}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {new Date(notification.Date).toLocaleDateString()}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {notification.MissionName || '-'}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {notification.InvoiceName || '-'}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button 
                                                onClick={() => handleMarkAsRead(notification.Id)}
                                                className="hover:text-primary"
                                            >
                                                Mark as Read
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(notification.Id)}
                                                className="hover:text-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default NotificationsPage;
