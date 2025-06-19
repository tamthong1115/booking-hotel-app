import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../../app/context/SearchContext.tsx";
import { useAppContext } from "../../../app/context/AppContext.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { RoomType } from "../../../../../backend/shared/types.ts";
import { HotelTypeFrontend } from "../../../shared/types/types.ts";

type Props = {
    hotel: HotelTypeFrontend;
    room: RoomType;
};

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
};

const GuestInfoForm = ({ hotel, room }: Props) => {
    const search = useSearchContext();

    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const minDateTomorrow = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate("/sign-in", { state: { from: location } });
    };

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotel._id}/${room._id}/booking`);
    };

    return (
        <div className="mt-8 box-border flex flex-col gap-4 rounded-md bg-blue-200 p-3">
            <form onSubmit={handleSubmit(isLoggedIn ? onSubmit : onSignInClick)}>
                <div className="grid grid-cols-1 items-start gap-3 rounded">
                    <div>
                        <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) => setValue("checkIn", date as Date)}
                            selectsStart
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="min-w-full rounded-md bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />
                        {errors.checkIn && (
                            <span className="text-sm font-semibold text-red-500">{errors.checkIn.message}</span>
                        )}
                    </div>

                    <div>
                        <DatePicker
                            required
                            selected={checkOut}
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDateTomorrow}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="min-w-full rounded-md bg-white p-2 focus:outline-none"
                            wrapperClassName="min-w-full"
                        />

                        {errors.checkOut && (
                            <span className="text-sm font-semibold text-red-500">{errors.checkOut.message}</span>
                        )}
                    </div>

                    <div className="z rounded-md bg-white px-2 py-1">
                        <label className="flex items-center">
                            Adults:
                            <input
                                className="w-[50px] rounded p-1 font-bold focus:outline-none"
                                type="number"
                                min={1}
                                max={hotel.adultCount || 10}
                                {...register("adultCount", {
                                    required: "This field is required",
                                    min: {
                                        value: 1,
                                        message: "Minimum value is 1",
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>

                        <label className="flex items-center rounded-md">
                            Children:
                            <input
                                className="w-[50px] rounded p-1 font-bold focus:outline-none"
                                type="number"
                                min={0}
                                max={hotel.childCount || 10}
                                {...register("childCount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className="text-sm font-semibold text-red-500">{errors.adultCount.message}</span>
                        )}
                    </div>
                    {isLoggedIn ? (
                        <button className="h-full rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500">
                            Book Now
                        </button>
                    ) : (
                        <button className="h-full rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500">
                            Sign in to book
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default GuestInfoForm;
