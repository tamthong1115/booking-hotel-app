import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection.tsx";
import TypeSection from "./TypeSection.tsx";
import FacilitiesSection from "./FacilitiesSection.tsx";
import GuestsSection from "./GuestsSection.tsx";
import ImagesSection from "./ImagesSection.tsx";
import { useEffect } from "react";
import { HotelType } from "@shared/types/types.ts";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imagePublicIds: string[];
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};

type Props = {
    hotel?: HotelType; // for edit
    onSave: (HotelFormData: FormData) => void;
    isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>({
        mode: "onBlur",
    });
    const { handleSubmit, reset } = formMethods;

    // Reset form when hotel changes
    useEffect(() => {
        reset(hotel);
    }, [hotel, reset]);

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        // Use FormData to send files and form data
        const formData = new FormData();

        // Edit mode
        if (hotel) {
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }

        if (formDataJson.imagePublicIds) {
            formDataJson.imagePublicIds.forEach((publicId, index) => {
                formData.append(`imagePublicIds[${index}]`, publicId);
            });
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append("imageFiles", imageFile);
        });

        // Call parent component's onSave function
        onSave(formData);
    });

    // FormProvider provides form methods to all child components
    return (
        <div>
            <FormProvider {...formMethods}>
                <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                    <DetailsSection />
                    <TypeSection />
                    <FacilitiesSection />
                    <GuestsSection />
                    <ImagesSection />
                    <span className="flex justify-end">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500 disabled:bg-gray-600"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </span>
                </form>
            </FormProvider>
        </div>
    );
};

export default ManageHotelForm;
