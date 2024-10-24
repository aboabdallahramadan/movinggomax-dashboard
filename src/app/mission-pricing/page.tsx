'use client';

import { useEffect, useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { MissionPricingService, MissionType } from '@/services/missionPricingService';

interface PricingItem {
    Id: string;
    MissionType: MissionType;
    PriceType: 'Selling' | 'Buying';
    Price: number;
}

export default function MissionPricingPage() {
    const [pricingList, setPricingList] = useState<PricingItem[]>([]);
    const [editMode, setEditMode] = useState<Record<string, boolean>>({});
    const [editValues, setEditValues] = useState<Record<string, number>>({});
    const pricingService = new MissionPricingService();

    useEffect(() => {
        loadPricingData();
    }, []);

    const loadPricingData = async () => {
        const data = await pricingService.getAllPricing();
        setPricingList(data);
    };

    const handleEdit = (id: string, currentPrice: number) => {
        setEditMode({ ...editMode, [id]: true });
        setEditValues({ ...editValues, [id]: currentPrice });
    };

    const handleSave = async (id: string, missionType: MissionType, priceType: 'Selling' | 'Buying') => {
        await pricingService.updatePricing(id,
            missionType,
            priceType,
            editValues[id]
        );
        setEditMode({ ...editMode, [id]: false });
        loadPricingData();
    };

    const getMissionTypeBadgeColor = (type: MissionType) => {
        const colors = {
            Transfer: 'bg-blue-500/10 text-blue-500',
            Cleaning: 'bg-green-500/10 text-green-500',
            Warehousing: 'bg-yellow-500/10 text-yellow-500',
            Emptycar: 'bg-red-500/10 text-red-500'
        }
        return colors[type];
    };

    const getPriceTypeBadgeColor = (type: 'Selling' | 'Buying') => {
        return type === 'Selling'
            ? 'bg-green-500/10 text-green-500'
            : 'bg-orange-500/10 text-orange-500';
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Mission Pricing" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Mission Type</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Price Type</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Price</th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricingList.map((pricing) => (
                                <tr key={pricing.Id}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getMissionTypeBadgeColor(pricing.MissionType)}`}>
                                            {pricing.MissionType}
                                        </span>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getPriceTypeBadgeColor(pricing.PriceType)}`}>
                                            {pricing.PriceType}
                                        </span>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        {editMode[pricing.Id] ? (
                                            <input
                                                type="number"
                                                value={editValues[pricing.Id]}
                                                onChange={(e) => setEditValues({
                                                    ...editValues,
                                                    [pricing.Id]: Number(e.target.value)
                                                })}
                                                className="w-31 rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            />
                                        ) : (<p className="text-black dark:text-white">${pricing.Price}</p>
                                        )}
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            {editMode[pricing.Id] ? (
                                                <button
                                                    className="hover:text-primary"
                                                    onClick={() => handleSave(pricing.Id, pricing.MissionType, pricing.PriceType)}
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className="hover:text-primary"
                                                    onClick={() => handleEdit(pricing.Id, pricing.Price)}
                                                >
                                                    Edit
                                                </button>
                                            )}
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
