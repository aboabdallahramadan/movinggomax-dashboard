'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { jobRequestsService, JobRequest } from "@/services/jobRequestsService";
import { useEffect, useState } from "react";

const JobRequestsPage: React.FC = () => {
    const [requests, setRequests] = useState<JobRequest[]>([]);

    useEffect(() => {
        const loadRequests = async () => {
            const result = await jobRequestsService.getAllJobRequests();
            setRequests(result);
        };
        loadRequests();
    }, []);

    const handleDelete = async (id: string) => {
        await jobRequestsService.deleteJobRequest(id);
        setRequests(requests.filter(request => request.id !== id));
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Job Requests" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        All Job Requests
                    </h4>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Title</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Requester</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Status</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Budget</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Priority</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{request.title}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{request.description}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{request.requesterName}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{request.requesterEmail}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <span className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium
                                            ${request.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                                request.status === 'viewed' ? 'bg-blue-50 text-blue-600' :
                                                    'bg-green-50 text-green-600'}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        ${request.budget}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <span className={`inline-block rounded px-2.5 py-0.5 text-sm font-medium
                                            ${request.priority === 'high' ? 'bg-red-50 text-red-600' :
                                                request.priority === 'medium' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-green-50 text-green-600'}`}>
                                            {request.priority}
                                        </span>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-danger" onClick={() => handleDelete(request.id)}>
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </button>

                                            <button
                                                className="hover:text-primary"
                                                onClick={() => window.location.href = `/job-requests/${request.id}`}
                                            >
                                                Details
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

export default JobRequestsPage;
