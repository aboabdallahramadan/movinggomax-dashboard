'use client';

import { useEffect, useState } from 'react';
import { Mission } from '@/types/BackendModels';
import { MissionService } from '@/services/missionService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import CheckMark from '@/components/CheckMarks/CheckMark';
import CloseMark from '@/components/CloseMarks/CloseMark';

export default function NewMissionsPage() {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);
    const missionService = new MissionService();

    useEffect(() => {
        fetchNewMissions();
    }, []);

    const fetchNewMissions = async () => {
        try {
            const response = await missionService.getNewMissions();
            setMissions(response.data);
        } catch (error) {
            console.error('Error fetching new missions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await missionService.approveMission(id);
            fetchNewMissions();
        } catch (error) {
            console.error('Error approving mission:', error);
        }
    };

    const handleReject = async (id: string) => {
        try {
            await missionService.rejectMission(id);
            fetchNewMissions();
        } catch (error) {
            console.error('Error rejecting mission:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Missions" />

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
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Created At</th>
                                <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missions.map((mission, index) => (
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
                                        <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${mission.State === 'completed' ? 'text-success bg-success' :
                                                mission.State === 'pending' ? 'text-warning bg-warning' :
                                                    'text-danger bg-danger'
                                            }`}>
                                            {mission.State}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {new Date(mission.ExecuteDateTime).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td
                                        className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === missions.length - 1 ? "border-b-0" : "border-b"}`}
                                    >
                                        <div className="flex items-center justify-end space-x-3.5">
                                            <button className="hover:text-info group relative" title="Approve">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"/>
                                                </svg>
                                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Approve</span>
                                            </button>
                                            <button className="hover:text-info group relative" title="Reject">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"/>
                                                    <path d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"/>
                                                </svg>
                                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Reject</span>
                                            </button>
                                            <button className=" hover:text-info group relative" title="Chat">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M16 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H16C17.1 18 18 17.1 18 16V4C18 2.9 17.1 2 16 2ZM16 12H4V10H16V12ZM16 9H4V7H16V9Z"/>
                                                </svg>
                                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Chat</span>
                                            </button>
                                            <button className="hover:text-info group relative" title="Edit">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M15.9996 4.99999L14.9996 3.99999C14.6096 3.60999 13.9796 3.60999 13.5896 3.99999L11.9996 5.58999L14.4096 7.99999L15.9996 6.40999C16.3896 6.01999 16.3896 5.38999 15.9996 4.99999Z"/>
                                                    <path d="M11.2927 6.29689L4.99973 12.5899V14.9999H7.40973L13.7027 8.70689L11.2927 6.29689Z"/>
                                                </svg>
                                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Edit</span>
                                            </button>
                                            <button className="hover:text-info group relative" title="Purchase">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M17 4H16V3C16 2.45 15.55 2 15 2C14.45 2 14 2.45 14 3V4H6V3C6 2.45 5.55 2 5 2C4.45 2 4 2.45 4 3V4H3C2.45 4 2 4.45 2 5V17C2 17.55 2.45 18 3 18H17C17.55 18 18 17.55 18 17V5C18 4.45 17.55 4 17 4ZM16 16H4V8H16V16Z"/>
                                                </svg>
                                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Purchase</span>
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
