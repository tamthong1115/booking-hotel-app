import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../app/config/hotel-options-config.ts";
import { HotelFormData } from "./MangaHotelForm.tsx";

const TypeSection = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    const typeWatch = watch("type");

    return (
        <div>
            <h2 className="mb-3 text-2xl font-bold">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type) => (
                    <label
                        className={
                            typeWatch === type
                                ? "cursor-pointer select-none rounded-full bg-blue-300 px-4 py-2 text-sm font-semibold"
                                : "cursor-pointer select-none rounded-full bg-gray-300 px-4 py-2 text-sm font-semibold"
                        }
                    >
                        <input
                            type="radio"
                            value={type}
                            {...register("type", {
                                required: "This field is required",
                            })}
                            className="hidden"
                        />

                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && <span className="text-sm font-bold text-red-500">{errors.type.message} </span>}
        </div>
    );
};

export default TypeSection;
