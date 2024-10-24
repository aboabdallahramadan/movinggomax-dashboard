'use client';

import { useEffect, useState } from 'react';
import { WarehousingMission } from '@/types/VwModels';
import { WarehousingMissionService } from '@/services/warehousingMissionService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const WarehousingMissionDetails = ({ params }: { params: { id: string } }) => {
    const [mission, setMission] = useState<WarehousingMission | null>(null);
    const warehousingService = new WarehousingMissionService();

    useEffect(() => {
        const fetchMission = async () => {
            const data = await warehousingService.getById(params.id);
            setMission(data);
        };
        fetchMission();
    }, [params.id]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Warehousing Mission Details" />

            <div className="rounded-[20px] border border-stroke bg-white p-9 shadow-2xl dark:border-strokedark dark:bg-boxdark">
                {mission ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-dark dark:text-white">
                                Warehousing Mission #{mission.Id}
                            </h2>

                            <div className="space-y-4 rounded-2xl bg-gray-1 p-6 dark:bg-meta-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
                                        <span className="font-medium text-dark dark:text-white">{mission.Type}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Responsible</span>
                                        <span className="font-medium text-dark dark:text-white">{mission.MissionResponsible}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Contact</span>
                                        <span className="font-medium text-dark dark:text-white">{mission.MissionResponsibleNumber}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">City</span>
                                        <span className="font-medium text-dark dark:text-white">{mission.City}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">From Address</span>
                                        <span className="font-medium text-dark dark:text-white">{mission.FromAddress}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">To Address</span>
                                        <span className="font-medium text-dark dark:text-white">{mission.ToAddress}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-meta-4">
                                <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
                                    Mission Status
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                                        mission.State === 'Pending'
                                            ? 'bg-warning/10 text-warning'
                                            : 'bg-success/10 text-success'
                                    }`}>
                                        {mission.State}
                                    </span>
                                    <span className="text-2xl font-bold text-primary">${mission.Price}</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-meta-4">
                                <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
                                    Storage Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Storage Duration</span>
                                        <span className="text-lg font-semibold text-dark dark:text-white">
                                            {mission.StorageDuration} days
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Area</span>
                                        <span className="text-lg font-semibold text-dark dark:text-white">
                                            {mission.AreaInCubicMeter} m³
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Execute Date</span>
                                        <span className="text-lg font-semibold text-dark dark:text-white">
                                            {new Date(mission.ExecuteDateTime).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-meta-4">
                                <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300">{mission.Description}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-40 items-center justify-center">
                        <div className="text-lg font-medium text-body-color">Loading mission details...</div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default WarehousingMissionDetails;
