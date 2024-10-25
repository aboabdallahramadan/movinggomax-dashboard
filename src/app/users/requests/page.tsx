'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { AccountRequestsService } from "@/services/accountRequestsService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AccountRequestsPage: React.FC = () => {
    const [requests, setRequests] = useState<any[]>([]);
    const [totalRequests, setTotalRequests] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const requestsService = new AccountRequestsService();

    useEffect(() => {
        const loadRequests = async () => {
            const result = await requestsService.getPaginated(currentPage, pageSize);
            setRequests(result.data);
            setTotalRequests(result.total);
        };
        loadRequests();
    }, [currentPage]);

    const handleSendEmail = async (id: string) => {
        const { value: emailText } = await Swal.fire({
            title: 'Send Email',
            input: 'textarea',
            inputLabel: 'Message',
            inputPlaceholder: 'Type your message here...',
            showCancelButton: true,
            confirmButtonText: 'OK',
            confirmButtonColor:"green",
            cancelButtonText: 'Cancel',
            cancelButtonColor:"red",
            focusConfirm: false,
        });
    
        if (emailText) {
            await requestsService.sendEmail(id, emailText);
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Account Requests" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Username</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Email</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Phone</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Company</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Request Date</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.Id}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {request.UserName}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {request.Email}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {request.PhoneNumber}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {request.CompanyName}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {new Date(request.RequestDate).toLocaleDateString()}
                                    </td>
                                    {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                className="hover:text-success"
                                                onClick={() => requestsService.approveRequest(request.Id)}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>

                                            <button
                                                className="hover:text-danger"
                                                onClick={() => requestsService.rejectRequest(request.Id)}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>

                                            <button
                                                className="hover:text-primary"
                                                onClick={() => handleSendEmail(request.Id)}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 5L2 12.5L21 20M21 5L2 12.5M21 5L12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </td> */}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button
                                                className="hover:text-success group relative"
                                                onClick={() => requestsService.approveRequest(request.Id)}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Approve Request</span>
                                            </button>

                                            <button
                                                className="hover:text-danger group relative"
                                                onClick={() => requestsService.rejectRequest(request.Id)}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Reject Request</span>
                                            </button>

                                            <button
                                                className="hover:text-primary group relative"
                                                onClick={() => handleSendEmail(request.Id)}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M21 5L2 12.5L21 20M21 5L2 12.5M21 5L12 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Send Email</span>
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

export default AccountRequestsPage;
