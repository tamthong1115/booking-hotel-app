import { useQuery } from "react-query";
import BookingForm from "../../forms/BookingForm/BookingForm.tsx";
import { useSearchContext } from "../../../app/context/SearchContext.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../../components/Booking/BookingDetailSummary.tsx";
import LoadingComponent from "../../components/Loading/Loading.tsx";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../../../app/context/AppContext.tsx";

import { createPaymentIntent } from "../../../ApiClient/api-bookings.ts";
import { fetchCurrentUser } from "../../../ApiClient/api-users.ts";
import { fetchHotelById } from "../../../ApiClient/api-hotels.ts";

const Booking = () => {
    const { stripePromise } = useAppContext();
    const search = useSearchContext();
    const { hotelId, roomId } = useParams();

    const [numberOfNights, setNumberOfNights] = useState<number>(0);

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24) || 1;

            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]); // re-run when checkIn or checkOut changes

    const { data: paymentIntentData } = useQuery(
        "createPaymentIntent",
        () => createPaymentIntent(hotelId as string, roomId as string, numberOfNights.toString()),
        {
            enabled: !!hotelId && numberOfNights > 0,
        },
    );

    const { data: hotel } = useQuery("fetchHotelById", () => fetchHotelById(hotelId as string), {
        enabled: !!hotelId,
    });

    const { data: currentUser } = useQuery("fetchCurrentUser", fetchCurrentUser);

    if (!hotel) return LoadingComponent({ isLoading: true });
    // console.log(paymentIntentData)

    return (
        <div className="grid gap-3 md:grid-cols-[1fr_2fr]">
            <BookingDetailSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
            />

            {currentUser && paymentIntentData && (
                <Elements stripe={stripePromise} options={{ clientSecret: paymentIntentData.clientSecret }}>
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
                </Elements>
            )}
        </div>
    );
};

export default Booking;
