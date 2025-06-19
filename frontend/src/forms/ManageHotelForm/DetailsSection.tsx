import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./MangaHotelForm.tsx";

const DetailsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="mb-3 text-3xl font-bold">Add Hotel</h1>
            <label className="flex-1 text-sm font-bold text-gray-700">
                Name
                <input
                    type="text"
                    className="w-full rounded border px-2 py-1 font-normal"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
            </label>

            <div className="flex gap-4">
                <label className="flex-1 text-sm font-bold text-gray-700">
                    City
                    <input
                        type="text"
                        className="w-full rounded border px-2 py-1 font-normal"
                        {...register("city", { required: "City is required" })}
                    />
                    {errors.city && <span className="text-red-600">{errors.city.message}</span>}
                </label>

                <label className="flex-1 text-sm font-bold text-gray-700">
                    Country
                    <input
                        type="text"
                        className="w-full rounded border px-2 py-1 font-normal"
                        {...register("country", { required: "Country is required" })}
                    />
                    {errors.country && <span className="text-red-600">{errors.country.message}</span>}
                </label>
            </div>

            <label className="flex-1 text-sm font-bold text-gray-700">
                Description
                <textarea
                    rows={10}
                    className="w-full rounded border px-2 py-1 font-normal"
                    {...register("description", { required: "Description is required" })}
                ></textarea>
                {errors.description && <span className="text-red-600">{errors.description.message}</span>}
            </label>

            <label className="max-w-[50%] flex-1 text-sm font-bold text-gray-700">
                Star Rating
                <select
                    {...register("starRating", {
                        required: "This field is required",
                    })}
                    className="w-full rounded border p-2 font-normal text-gray-700"
                >
                    <option className="text-sm font-bold">Select as Rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option value={num}>{num}</option>
                    ))}
                </select>
                {errors.starRating && <span className="text-red-600">{errors.starRating.message}</span>}
            </label>
        </div>
    );
};

export default DetailsSection;
