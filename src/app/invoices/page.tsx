'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { InvoiceService } from "@/services/invoicesService";
import { InvoiceVwModel } from "@/types/BackendModels";
import Link from "next/link";
import { useEffect, useState } from "react";

const InvoicesPage: React.FC = () => {
    const [invoices, setInvoices] = useState<InvoiceVwModel[]>([]);
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const invoiceService = new InvoiceService();

    useEffect(() => {
        const loadInvoices = async () => {
            const result = await invoiceService.getPaginated(currentPage, pageSize);
            setInvoices(result.data);
            setTotalInvoices(result.total);
        };
        loadInvoices();
    }, [currentPage]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Invoices" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex justify-between mb-6">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        All Invoices
                    </h4>
                    <Link
                        href="/invoices/new"
                        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-white hover:bg-opacity-90"
                    >
                        Create Invoice
                    </Link>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Company</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Mission</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Amount</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Date</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.Id}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {invoice.CompanyName}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {invoice.MissionName}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        ${invoice.Amount.toFixed(2)}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {new Date(invoice.CreatedDate).toLocaleDateString()}
                                    </td>
                                    {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button onClick={() => invoiceService.sendInvoice(invoice.Id)}>
                                                Send
                                            </button>
                                            <button onClick={() => invoiceService.deleteInvoice(invoice.Id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td> */}
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <Link
                                                href={`/invoices/edit/${invoice.Id}`}
                                                className="hover:text-primary"
                                            >
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16.8754 11.6719C16.5379 11.6719 16.2754 11.9344 16.2754 12.2719V14.9625C16.2754 15.5125 15.8254 15.9625 15.2754 15.9625H3.27539C2.72539 15.9625 2.27539 15.5125 2.27539 14.9625V2.96094C2.27539 2.41094 2.72539 1.96094 3.27539 1.96094H5.96289C6.30039 1.96094 6.56289 1.69844 6.56289 1.36094C6.56289 1.02344 6.30039 0.760938 5.96289 0.760938H3.27539C2.02539 0.760938 1.07539 1.71094 1.07539 2.96094V14.9625C1.07539 16.2125 2.02539 17.1625 3.27539 17.1625H15.2754C16.5254 17.1625 17.4754 16.2125 17.4754 14.9625V12.2719C17.4754 11.9344 17.2129 11.6719 16.8754 11.6719Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M8.07453 9.1875C7.88703 9.1875 7.69953 9.11250 7.54953 8.96250C7.24953 8.66250 7.24953 8.17500 7.54953 7.87500L14.9995 0.425000C15.2995 0.125000 15.7870 0.125000 16.0870 0.425000C16.3870 0.725000 16.3870 1.21250 16.0870 1.51250L8.63703 8.96250C8.44953 9.11250 8.26203 9.1875 8.07453 9.1875Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </Link>
                                            <button onClick={() => invoiceService.sendInvoice(invoice.Id)}>
                                                Send
                                            </button>
                                            <button onClick={() => invoiceService.deleteInvoice(invoice.Id)}>
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
export default InvoicesPage;
