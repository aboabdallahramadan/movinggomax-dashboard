'use client';

import { useEffect, useState } from 'react';
import { TransferMission } from '@/types/VwModels';
import { TransferMissionService } from '@/services/transferMissionService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const TransferMissionDetails = ({ params }: { params: { id: string } }) => {
    const [mission, setMission] = useState<TransferMission | null>(null);
    const transferService = new TransferMissionService();

    useEffect(() => {
        const fetchMission = async () => {
            const data = await transferService.getById(params.id);
            setMission(data);
        };
        fetchMission();
    }, [params.id]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Mission Details" />

            <div className="rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
                {mission ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-dark dark:text-white">
                                Mission #{mission.Id}
                            </h2>

                            <div className="space-y-2">
                                <p className="text-body-color dark:text-dark-6">
                                    <span className="font-semibold">Type:</span> {mission.Type}
                                </p>
                                <p className="text-body-color dark:text-dark-6">
                                    <span className="font-semibold">Responsible:</span> {mission.MissionResponsible}
                                </p>
                                <p className="text-body-color dark:text-dark-6">
                                    <span className="font-semibold">Contact:</span> {mission.MissionResponsibleNumber}
                                </p>
                                <p className="text-body-color dark:text-dark-6">
                                    <span className="font-semibold">From:</span> {mission.FromAddress} (Floor: {mission.FromAddressFloor})
                                </p>
                                <p className="text-body-color dark:text-dark-6">
                                    <span className="font-semibold">To:</span> {mission.ToAddress} (Floor: {mission.ToAddressFloor})
                                </p>
                                <p className="text-body-color dark:text-dark-6">
                                    <span className="font-semibold">City:</span> {mission.City}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-lg bg-gray-1 p-4 dark:bg-dark-2">
                                <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">
                                    Mission Details
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-body-color dark:text-dark-6">
                                        <span className="font-semibold">Price:</span> ${mission.Price}
                                    </p>
                                    <p className="text-body-color dark:text-dark-6">
                                        <span className="font-semibold">Status:</span>{' '}
                                        <span className={`rounded-full px-2.5 py-0.5 ${
                                            mission.State === 'Pending' ? 'bg-warning-1 text-warning' : 'bg-success-1 text-success'
                                        }`}>
                                            {mission.State}
                                        </span>
                                    </p>
                                    <p className="text-body-color dark:text-dark-6">
                                        <span className="font-semibold">Apartment Type:</span> {mission.ApartmentType}
                                    </p>
                                    <p className="text-body-color dark:text-dark-6">
                                        <span className="font-semibold">Apartment Area:</span> {mission.ApartmentArea}
                                    </p>
                                    <p className="text-body-color dark:text-dark-6">
                                        <span className="font-semibold">Elevator:</span> {mission.IsElevatorAvailable ? 'Available' : 'Not Available'}
                                    </p>
                                    <p className="text-body-color dark:text-dark-6">
                                        <span className="font-semibold">Wrapping Service:</span> {mission.IsWrapping ? 'Included' : 'Not Included'}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg bg-gray-1 p-4 dark:bg-dark-2">
                                <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">Description</h3>
                                <p className="text-body-color dark:text-dark-6">{mission.Description}</p>
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

export default TransferMissionDetails;
