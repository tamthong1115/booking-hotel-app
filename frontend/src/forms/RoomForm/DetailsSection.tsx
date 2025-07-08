import { useFormContext } from "react-hook-form";
import { RoomFormData } from "./RoomForm.tsx";
import { roomTypes } from "../../app/config/hotel-options-config.ts";

const DetailsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<RoomFormData>();

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
                Price Per Night
                <input
                    type="number"
                    className="w-full rounded border px-2 py-1 font-normal"
                    {...register("pricePerNight", { required: "Price is required" })}
                />
                {errors.pricePerNight && <span className="text-red-600">{errors.pricePerNight.message}</span>}
            </label>

            <label className="max-w-[50%] flex-1 text-sm font-bold text-gray-700">
                Room Type
                <select
                    {...register("roomType", {
                        required: "This field is required",
                    })}
                    className="w-full rounded border p-2 font-normal text-gray-700"
                >
                    <option className="text-sm font-bold">Select a Room Type</option>
                    {roomTypes.map((type) => (
                        <option value={type}>{type}</option>
                    ))}
                </select>
                {errors.roomType && <span className="text-red-600">{errors.roomType.message}</span>}
            </label>
        </div>
    );
};

export default DetailsSection;
