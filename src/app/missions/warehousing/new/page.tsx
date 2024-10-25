'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateWarehousingMissionModel } from '@/types/BackendModels';
import { MissionService } from '@/services/missionService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export default function NewWarehousingMissionPage() {
    const router = useRouter();
    const missionService = new MissionService();
    const [formData, setFormData] = useState({
        Type: 'Warehousing',
        MissionResponsible: '',
        MissionResponsibleNumber: '',
        FromAddress: '',
        ToAddress: '',
        City: '',
        Price: '',
        ExecuteDateTime: '',
        State: 'pending',
        Description: '',
        SellerId: '',
        BuyerId: '',
        StorageDuration: '',
        AreaInCubicMeter: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.MissionResponsible) newErrors.MissionResponsible = 'Responsible person is required';
        if (!formData.MissionResponsibleNumber) newErrors.MissionResponsibleNumber = 'Contact number is required';
        if (!formData.FromAddress) newErrors.FromAddress = 'From address is required';
        if (!formData.ToAddress) newErrors.ToAddress = 'To address is required';
        if (!formData.City) newErrors.City = 'City is required';
        if (!formData.Price) newErrors.Price = 'Price is required';
        if (isNaN(Number(formData.Price))) newErrors.Price = 'Price must be a number';
        if (!formData.Description) newErrors.Description = 'Description is required';
        if (!formData.ExecuteDateTime) newErrors.ExecuteDateTime = 'Execution date is required';
        if (!formData.StorageDuration) newErrors.StorageDuration = 'Storage duration is required';
        if (!formData.AreaInCubicMeter) newErrors.AreaInCubicMeter = 'Area in cubic meter is required';
        if (!formData.SellerId) newErrors.SellerId = 'Seller ID is required';
        if (!formData.BuyerId) newErrors.BuyerId = 'Buyer ID is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const missionData: CreateWarehousingMissionModel = {
            ...formData,
            Price: Number(formData.Price),
            ExecuteDateTime: new Date(formData.ExecuteDateTime),
            StorageDuration: Number(formData.StorageDuration),
            AreaInCubicMeter: Number(formData.AreaInCubicMeter)
        };

        try {
            await missionService.createWarehousingMission(missionData);
            router.push('/missions');
        } catch (error) {
            console.error('Error creating warehousing mission:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Warehousing Mission" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Responsible Person</label>
                            <input
                                type="text"
                                name="MissionResponsible"
                                value={formData.MissionResponsible}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.MissionResponsible && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.MissionResponsible}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Contact Number</label>
                            <input
                                type="text"
                                name="MissionResponsibleNumber"
                                value={formData.MissionResponsibleNumber}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.MissionResponsibleNumber && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.MissionResponsibleNumber}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">From Address</label>
                            <input
                                type="text"
                                name="FromAddress"
                                value={formData.FromAddress}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.FromAddress && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.FromAddress}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">To Address</label>
                            <input
                                type="text"
                                name="ToAddress"
                                value={formData.ToAddress}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.ToAddress && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.ToAddress}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">City</label>
                            <input
                                type="text"
                                name="City"
                                value={formData.City}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.City && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.City}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Price</label>
                            <input
                                type="number"
                                name="Price"
                                value={formData.Price}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.Price && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.Price}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Storage Duration (months)</label>
                            <input
                                type="number"
                                name="StorageDuration"
                                value={formData.StorageDuration}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.StorageDuration && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.StorageDuration}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Area (m³)</label>
                            <input
                                type="number"
                                name="AreaInCubicMeter"
                                value={formData.AreaInCubicMeter}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.AreaInCubicMeter && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.AreaInCubicMeter}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Execution Date</label>
                            <input
                                type="datetime-local"
                                name="ExecuteDateTime"
                                value={formData.ExecuteDateTime}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.ExecuteDateTime && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.ExecuteDateTime}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Seller ID</label>
                            <input
                                type="text"
                                name="SellerId"
                                value={formData.SellerId}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.SellerId && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.SellerId}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Buyer ID</label>
                            <input
                                type="text"
                                name="BuyerId"
                                value={formData.BuyerId}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.BuyerId && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.BuyerId}</p>}
                        </div>

                        <div className="mb-4 col-span-2">
                            <label className="mb-2.5 block text-black dark:text-white">Description</label>
                            <textarea
                                name="Description"
                                value={formData.Description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {errors.Description && <p className="text-meta-1 text-red-500 text-sm mt-1">{errors.Description}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={() => router.push('/missions')}
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                        >
                            Create Warehousing Mission
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}
