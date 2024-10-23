'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { AdvertisementService } from "@/services/advertisementsService";
import { useRouter } from "next/navigation";

const NewAdvertisementPage: React.FC = () => {
    const adService = new AdvertisementService();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const newAd = {
            Title: formData.get('title') as string,
            Description: formData.get('description') as string,
            ImageUrl: formData.get('imageUrl') as string,
            StartDate: new Date(formData.get('startDate') as string),
            EndDate: new Date(formData.get('endDate') as string),
            IsActive: true
        };

        await adService.addAdvertisement(newAd);
        router.push('/advertisements');
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="New Advertisement" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Create New Advertisement
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>

                    {/* Add similar input fields for description, imageUrl, startDate, endDate */}

                    <button type="submit" className="flex justify-center rounded bg-primary p-3 font-medium text-white">
                        Create Advertisement
                    </button>
                </form>
            </div>
        </DefaultLayout>
    );
};
export default NewAdvertisementPage;