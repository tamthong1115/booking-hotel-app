import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./MangaHotelForm.tsx";

const GuestsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="mb-3 text-2xl font-bold">Guests</h2>
            <div className="grid grid-cols-2 gap-5 rounded bg-gray-100 p-6">
                <label className="text-sm font-semibold text-gray-700">
                    Adults
                    <input
                        className="w-full rounded border px-3 py-2 font-normal"
                        type="number"
                        min={1}
                        {...register("adultCount", {
                            required: "This field is required.",
                        })}
                    />
                    {errors.adultCount?.message && (
                        <span className="text-sm font-bold text-red-700">{errors.adultCount?.message}</span>
                    )}
                </label>

                <label className="text-sm font-semibold text-gray-700">
                    Children
                    <input
                        className="w-full rounded border px-3 py-2 font-normal"
                        type="number"
                        min={0}
                        {...register("childCount", {
                            required: "This field is required.",
                        })}
                    />
                    {errors.childCount?.message && (
                        <span className="text-sm font-bold text-red-700">{errors.childCount?.message}</span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestsSection;
