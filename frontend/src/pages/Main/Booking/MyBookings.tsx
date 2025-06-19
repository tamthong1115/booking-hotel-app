import { useQuery } from "react-query";
import LoadingComponent from "../../components/Loading/Loading.tsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchMyBookings } from "../../../ApiClient/api-bookings.ts";

const MyBookings = () => {
    useEffect(() => {}, []);
    const { data: hotels, isLoading } = useQuery("fetchMyHotelsBookings", fetchMyBookings);

    if (isLoading) {
        return LoadingComponent({ isLoading });
    }

    if (!hotels || hotels.length === 0) {
        return <h1>No bookings found</h1>;
    }

    return (
        <div className="space-y-5 pl-40 pr-40">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            {hotels.map((hotel) => (
                <div className="lg:gird-cols-[1fr_3fr] grid grid-cols-1 gap-4 rounded-lg border border-slate-300 p-8">
                    <div className="lg:h-[250px] lg:w-full">
                        <Link to={`/detail/${hotel._id}`}>
                            <img
                                src={hotel.imageUrls[0]}
                                className="h-full w-full object-cover object-center"
                                alt="hotel"
                            />
                        </Link>
                    </div>

                    <div className={"flex max-h-[300px] flex-col gap-4 overflow-y-auto"}>
                        <div className={"text-2xl font-bold"}>
                            {hotel.name}
                            <div className={"text-sx font-normal"}>
                                {hotel.city}, {hotel.country}
                            </div>
                        </div>
                    </div>
                    {hotel.bookings.map((booking) => (
                        <div className={"flex justify-between rounded border p-5"}>
                            <div>
                                <div>
                                    <span className={"mr-2 font-bold"}>Dates:</span>
                                    <span>
                                        {new Date(booking.checkIn).toDateString()} -{" "}
                                        {new Date(booking.checkOut).toDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span className={"mr-2 font-bold"}>Guest:</span>
                                    <span>
                                        {booking.adultCount} adults, {booking.childCount} children
                                    </span>
                                </div>

                                <div>
                                    <span className={"mr-2 font-bold"}>Total:</span>
                                    <span>${booking.totalCost}</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                {new Date(booking.checkOut) < new Date() ? (
                                    <div className="text-2xl font-semibold text-red-500">Expired</div>
                                ) : (
                                    <div className="text-2xl font-semibold text-green-500">Active</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyBookings;
