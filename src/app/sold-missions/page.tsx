'use client';

import { useEffect, useState } from 'react';
import { Mission } from '@/types/BackendModels';
import { SoldMissionsService } from '@/services/soldMissionsService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export default function SoldMissionsPage() {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const missionService = new SoldMissionsService();

    useEffect(() => {
        fetchMissions();
    }, [currentPage]);

    const fetchMissions = async () => {
        try {
            const response = await missionService.getPaginated(currentPage, pageSize);
            setMissions(response.data);
            setTotalItems(response.total);
        } catch (error) {
            console.error('Error fetching sold missions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await missionService.deleteMission(id);
            fetchMissions();
        } catch (error) {
            console.error('Error deleting mission:', error);
        }
    };

    const handleCancelSale = async (id: string) => {
        try {
            await missionService.cancelSale(id);
            fetchMissions();
        } catch (error) {
            console.error('Error canceling sale:', error);
        }
    };

    const handleEndMission = async (id: string) => {
        try {
            await missionService.endMission(id);
            fetchMissions();
        } catch (error) {
            console.error('Error ending mission:', error);
        }
    };

    const handleFreezeMission = async (id: string) => {
        try {
            await missionService.freezeMission(id);
            fetchMissions();
        } catch (error) {
            console.error('Error freezing mission:', error);
        }
    };

    const handleEnterChat = async (id: string) => {
        try {
            await missionService.enterChat(id);
        } catch (error) {
            console.error('Error entering chat:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Sold Missions" />

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
                                                onClick={() => handleEnterChat(mission.Id)}
                                                className="hover:text-primary"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/>
                                                    <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0z" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleEndMission(mission.Id)}
                                                className="hover:text-primary"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleFreezeMission(mission.Id)}
                                                className="hover:text-primary"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(mission.Id)}
                                                className="hover:text-primary"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 6h14M8 6V4a2 2 0 012-2h0a2 2 0 012 2v2m3 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
