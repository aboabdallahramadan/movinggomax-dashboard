'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { InvoiceService } from "@/services/invoicesService";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EditInvoicePage: React.FC<{ params: { id: string } }> = ({ params }) => {
    const invoiceService = new InvoiceService();
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [invoice, setInvoice] = useState<any>(null);

    useEffect(() => {
        // Load invoice data when component mounts
        const loadInvoice = async () => {
            // You would need to implement this method in your service
            const data = await invoiceService.getPaginated(1, 1);
            setInvoice(data.data[0]); // For demo purposes
        };
        loadInvoice();
    }, [params.id]);

    const validateForm = (formData: FormData): boolean => {
        const newErrors: Record<string, string> = {};
        const amount = Number(formData.get('amount'));
        const companyId = formData.get('companyId') as string;
        const missionId = formData.get('missionId') as string;

        if (isNaN(amount) || amount <= 0) {
            newErrors.amount = "Please enter a valid amount";
        }
        if (!companyId) newErrors.companyId = "Company is required";
        if (!missionId) newErrors.missionId = "Mission is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        if (!validateForm(formData)) return;

        const updatedInvoice = {
            Amount: Number(formData.get('amount')),
            CompanyId: formData.get('companyId') as string,
            MissionId: formData.get('missionId') as string
        };

        await invoiceService.editInvoice(params.id, updatedInvoice);
        router.push('/invoices');
    };

    if (!invoice) return <div>Loading...</div>;

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Invoice" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Edit Invoice
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Amount <span className="text-red">*</span>
                        </label>
                        <input
                            type="number"
                            name="amount"
                            step="0.01"
                            defaultValue={invoice.Amount}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {errors.amount && <p className="text-red mt-1">{errors.amount}</p>}
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Company <span className="text-red">*</span>
                        </label>
                        <select
                            name="companyId"
                            defaultValue={invoice.CompanyId}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                            <option value="">Select Company</option>
                            {/* Add company options here */}
                        </select>
                        {errors.companyId && <p className="text-red mt-1">{errors.companyId}</p>}
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Mission <span className="text-red">*</span>
                        </label>
                        <select
                            name="missionId"
                            defaultValue={invoice.MissionId}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                            <option value="">Select Mission</option>
                            {/* Add mission options here */}
                        </select>
                        {errors.missionId && <p className="text-red mt-1">{errors.missionId}</p>}
                    </div>

                    <button type="submit" className="flex justify-center rounded bg-primary p-3 font-medium text-white">
                        Update Invoice
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default EditInvoicePage;
