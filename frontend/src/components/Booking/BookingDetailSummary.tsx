import { HotelTypeFrontend } from "../../../shared/types/types.ts";
import React from "react";

type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelTypeFrontend;
};

const BookingDetailsSummary: React.FC<Props> = ({
    checkIn,
    checkOut,
    adultCount,
    childCount,
    numberOfNights,
    hotel,
}) => {
    return (
        <div className="grid h-fit gap-4 rounded-lg border border-slate-300 p-5">
            <h2 className="text-xl font-bold">Your Booking Detail</h2>
            <div className="border-b py-2">
                Location:
                <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            </div>

            <div className="flex justify-between">
                <div>
                    Check-In
                    <div className="font-bold">{checkIn.toDateString()}</div>
                </div>

                <div>
                    Check-Out
                    <div className="font-bold">{checkOut.toDateString()}</div>
                </div>
            </div>

            <div className="border-b border-t py-2">
                Total length of stay:
                <div className="font-bold">
                    {numberOfNights} {numberOfNights > 1 ? "nights" : "night"}
                </div>
            </div>

            <div>
                Guest{" "}
                <div className="font-bold">
                    {" "}
                    {adultCount} adults & {childCount} children
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsSummary;
