'use client';

import { useEffect, useState } from 'react';
import { Mission } from '@/types/BackendModels';
import { NeedToConfirmTheTerminationMissionsService } from '@/services/NeedToConfirmTheTerminationMissionsService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export default function TerminationMissionsPage() {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const missionService = new NeedToConfirmTheTerminationMissionsService();

    useEffect(() => {
        fetchMissions();
    }, [currentPage]);

    const fetchMissions = async () => {
        try {
            const response = await missionService.getPaginated(currentPage, pageSize);
            setMissions(response.data);
            setTotalItems(response.total);
        } catch (error) {
            console.error('Error fetching termination missions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmTermination = async (id: string) => {
        try {
            await missionService.confirmTermination(id);
            fetchMissions();
        } catch (error) {
            console.error('Error confirming termination:', error);
        }
    };

    const handleRejectTermination = async (id: string) => {
        try {
            await missionService.rejectTermination(id, 'Rejection reason');
            fetchMissions();
        } catch (error) {
            console.error('Error rejecting termination:', error);
        }
    };

    const handleEnterConversation = async (id: string) => {
        try {
            const { chatUrl } = await missionService.enterConversation(id);
            // Handle navigation to chat
            window.location.href = chatUrl;
        } catch (error) {
            console.error('Error entering conversation:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Termination Missions" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Type</th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Responsible</th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Price</th>
                                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">Description</th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Execute Date</th>
                                <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map((mission) => (
                                <tr key={mission.Id}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <h5 className="font-medium text-black dark:text-white">{mission.Type}</h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{mission.MissionResponsible}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">${mission.Price}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{mission.Description}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                                            {mission.State}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {new Date(mission.ExecuteDateTime).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center justify-end space-x-3.5">
                                            <button
                                                onClick={() => handleConfirmTermination(mission.Id)}
                                                className="hover:text-primary"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.667 5l-6.667 6.667L8.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => handleRejectTermination(mission.Id)}
                                                className="hover:text-primary"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => handleEnterConversation(mission.Id)}
                                                className="hover:text-primary"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16 10c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6 6 2.686 6 6z" stroke="currentColor" strokeWidth="2"/>
                                                    <path d="M10 8v4M8 10h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
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
}
