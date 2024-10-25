// app/missions/new-transfer.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateTransferMissionModel } from '@/types/BackendModels';
import { MissionService } from '@/services/missionService';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

export default function NewTransferMissionPage() {
    const router = useRouter();
    const missionService = new MissionService();
    const [formData, setFormData] = useState<CreateTransferMissionModel>({
        Type: 'Transfer',
        MissionResponsible: '',
        MissionResponsibleNumber: '',
        FromAddress: '',
        ToAddress: '',
        City: '',
        Price: 0,
        ExecuteDateTime: '',
        State: 'pending',
        Description: '',
        SellerId: '',
        BuyerId: '',
        ApartmentType: '',
        ApartmentArea: '',
        IsElevatorAvailable: false,
        IsWrapping: false,
        FromAddressFloor: '',
        ToAddressFloor: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.MissionResponsible) newErrors.MissionResponsible = 'Responsible person is required';
        if (!formData.MissionResponsibleNumber) newErrors.MissionResponsibleNumber = 'Contact number is required';
        if (!formData.Price || isNaN(Number(formData.Price))) newErrors.Price = 'Price must be a valid number';
        if (!formData.Description) newErrors.Description = 'Description is required';
        if (!formData.ExecuteDateTime) newErrors.ExecuteDateTime = 'Execution date is required';
        if (!formData.ApartmentType) newErrors.ApartmentType = 'Apartment type is required';
        if (!formData.ApartmentArea) newErrors.ApartmentArea = 'Apartment area is required';
        if (!formData.FromAddressFloor) newErrors.FromAddressFloor = 'From address floor is required';
        if (!formData.ToAddressFloor) newErrors.ToAddressFloor = 'To address floor is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const missionData: Omit<CreateTransferMissionModel, 'SellerId' | 'BuyerId'> = {
            ...formData,
            Price: Number(formData.Price),
            ExecuteDateTime: new Date(formData.ExecuteDateTime),
        };

        try {
            await missionService.createTransferMission(missionData);
            router.push('/missions');
        } catch (error) {
            console.error('Error creating mission:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Transfer Mission" />

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
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.MissionResponsible && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.MissionResponsible}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Contact Number</label>
                            <input
                                type="text"
                                name="MissionResponsibleNumber"
                                value={formData.MissionResponsibleNumber}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.MissionResponsibleNumber && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.MissionResponsibleNumber}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Price</label>
                            <input
                                type="number"
                                name="Price"
                                value={formData.Price}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.Price && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.Price}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Execution Date</label>
                            <input
                                type="datetime-local"
                                name="ExecuteDateTime"
                                value={formData.ExecuteDateTime}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.ExecuteDateTime && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.ExecuteDateTime}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Apartment Type</label>
                            <input
                                type="text"
                                name="ApartmentType"
                                value={formData.ApartmentType}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.ApartmentType && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.ApartmentType}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">Apartment Area</label>
                            <input
                                type="text"
                                name="ApartmentArea"
                                value={formData.ApartmentArea}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.ApartmentArea && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.ApartmentArea}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">From Address Floor</label>
                            <input
                                type="text"
                                name="FromAddressFloor"
                                value={formData.FromAddressFloor}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.FromAddressFloor && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.FromAddressFloor}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">To Address Floor</label>
                            <input
                                type="text"
                                name="ToAddressFloor"
                                value={formData.ToAddressFloor}
                                onChange={handleInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.ToAddressFloor && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.ToAddressFloor}</p>}
                        </div>

                        <div className="mb-4 flex items-center">
                            <label className="mr-3 text-black dark:text-white">Elevator Available?</label>
                            <input
                                type="checkbox"
                                name="IsElevatorAvailable"
                                checked={formData.IsElevatorAvailable}
                                onChange={handleInputChange}
                                className="rounded border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4 flex items-center">
                            <label className="mr-3 text-black dark:text-white">Wrapping Needed?</label>
                            <input
                                type="checkbox"
                                name="IsWrapping"
                                checked={formData.IsWrapping}
                                onChange={handleInputChange}
                                className="rounded border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4 col-span-2">
                            <label className="mb-2.5 block text-black dark:text-white">Description</label>
                            <textarea
                                name="Description"
                                value={formData.Description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:focus:border-primary"
                            />
                            {errors.Description && <p className="text-meta-1 text-sm text-red-500 mt-1">{errors.Description}</p>}
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
                            Create Mission
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}
