import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./MangaHotelForm.tsx";

const ImagesSection = () => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext<HotelFormData>();

    const existingImageUrls = watch("imageUrls");

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        event.preventDefault();
        setValue(
            "imageUrls",
            existingImageUrls.filter((url) => url !== imageUrl),
        );
    };

    return (
        <div>
            <h2 className="mb-3 text-2xl font-bold">Images</h2>
            <div className="flex flex-col gap-4 rounded border p-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div className="group relative">
                                <img src={url} className="min-h-full object-cover" />
                                <button
                                    onClick={(event) => handleDelete(event, url)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full font-normal text-gray-700"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);

                            if (totalLength === 0) {
                                return "At least one image should be added.";
                            }

                            if (totalLength > 6) {
                                return "Total number of images cannot be more than 6.";
                            }
                        },
                    })}
                />
            </div>
            {errors.imageFiles && <span className="text-sm text-red-700">{errors.imageFiles.message}</span>}
        </div>
    );
};

export default ImagesSection;
