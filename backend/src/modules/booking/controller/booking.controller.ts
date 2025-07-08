import { RequestHandler } from "express";
import CustomError from "@utils/ExpressError";
import Hotel from "@modules/hotel/hotel";
import { ERROR_CODES } from "../../../../../shared/constants/errorCodes";
import { BookingModelType } from "@type/model/hotelType";

export const getBookings: RequestHandler = async (req, res, next) => {
    try {
        const hotels = await Hotel.find({}).populate<{ bookings: BookingModelType[] }>({
            path: "bookings",
            match: {
                userId: req.user_backend?._id,
            },
        });

        const result = hotels.map((hotel) => {
            const userBookings = hotel.bookings?.filter((booking) => booking.userId === req.user_backend?._id);

            if (!userBookings || userBookings.length === 0) return null;

            // Sort the bookings by check-out date in descending order
            userBookings?.sort((a, b) => new Date(a.checkOut).getTime() - new Date(b.checkOut).getTime());

            const hotelWithUserBookings = {
                ...hotel.toObject(),
                bookings: userBookings, // Only return the bookings that match the user ID
            };

            return hotelWithUserBookings;
        });

        // remove null from result
        const filteredResult = result.filter((hotel) => hotel !== null);

        res.status(200).json(filteredResult);
    } catch (err) {
        console.log(err);
        next(
            new CustomError(
                "Failed to get bookings",
                ERROR_CODES.BOOKING_FAILED.code,
                ERROR_CODES.BOOKING_FAILED.statusCode,
            ),
        );
    }
};
