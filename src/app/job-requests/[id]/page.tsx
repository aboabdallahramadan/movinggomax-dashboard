'use client';

import { useEffect, useState } from 'react';
import { jobRequestsService, JobRequest } from '@/services/jobRequestsService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const JobRequestDetails = ({ params }: { params: { id: string } }) => {
    const [request, setRequest] = useState<JobRequest | null>(null);

    useEffect(() => {
        const fetchJobRequest = async () => {
            const data = await jobRequestsService.viewJobRequest(params.id);
            setRequest(data);
        };
        fetchJobRequest();
    }, [params.id]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Job Request Details" />

            <div className="rounded-[20px] border border-stroke bg-white p-9 shadow-2xl dark:border-strokedark dark:bg-boxdark">
                {request ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-dark dark:text-white">
                                {request.title}
                            </h2>

                            <div className="space-y-4 rounded-2xl bg-gray-1 p-6 dark:bg-meta-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Requester Name</span>
                                        <span className="font-medium text-dark dark:text-white">{request.requesterName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                                        <span className="font-medium text-dark dark:text-white">{request.requesterEmail}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Submission Date</span>
                                        <span className="font-medium text-dark dark:text-white">
                                            {new Date(request.submissionDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Priority</span>
                                        <span className="font-medium text-dark dark:text-white">{request.priority}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-meta-4">
                                <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
                                    Request Status
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                                        request.status === 'pending'
                                            ? 'bg-warning/10 text-warning'
                                            : request.status === 'viewed'
                                            ? 'bg-success/10 text-success'
                                            : 'bg-danger/10 text-danger'
                                    }`}>
                                        {request.status}
                                    </span>
                                    <span className="text-2xl font-bold text-primary">${request.budget}</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-meta-4">
                                <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">
                                    Required Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {request.skills.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-1 dark:bg-meta-4">
                                <h3 className="mb-4 text-xl font-semibold text-dark dark:text-white">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300">{request.description}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-40 items-center justify-center">
                        <div className="text-lg font-medium text-body-color">Loading request details...</div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default JobRequestDetails;
