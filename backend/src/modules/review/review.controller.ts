import { RequestHandler } from "express";
import Review from "./review";
import Hotel from "@modules/hotel/hotel";
import CustomError from "@utils/ExpressError";
import { BookingType } from "@shared/types";
import { ERROR_CODES } from "@shared/constants/errorCodes";

export const postNewReview: RequestHandler = async (req, res, next) => {
    try {
        const { hotelId } = req.params;

        const hotel = await Hotel.findById(hotelId).populate<{ bookings: BookingType[] }>("bookings");
        if (!hotel) {
            throw new CustomError(
                ERROR_CODES.HOTEL_NOT_FOUND.message,
                ERROR_CODES.HOTEL_NOT_FOUND.code,
                ERROR_CODES.HOTEL_NOT_FOUND.statusCode,
            )
        }

        // check if user having booked the hotel
        const isBooked = hotel.bookings.some((booking) => {
            return booking.userId.toString() === req.userId;
        });

        if (!isBooked) {
            throw new CustomError(
                ERROR_CODES.BOOKED_HOTEL_BEFORE_REVIEW.message,
                ERROR_CODES.BOOKED_HOTEL_BEFORE_REVIEW.code,
                ERROR_CODES.BOOKED_HOTEL_BEFORE_REVIEW.statusCode,
            );
        }

        const { comment, rating, userName } = req.body;

        const newReview = new Review({
            userId: req.userId,
            hotelId,
            rating,
            comment,
            userName,
        });

        await newReview.save();
        hotel.reviews.push(newReview._id);
        await hotel.save();

        res.status(201).json(newReview);
    } catch (err) {
        console.log(err);
        next(new CustomError("Failed to post review"));
    }
};

export const getReviews: RequestHandler = async (req, res, next) => {
    try {
        const { hotelId } = req.params;

        const hotel = await Hotel.findById(hotelId).populate("reviews");

        if (!hotel) {
            throw new CustomError(
                ERROR_CODES.HOTEL_NOT_FOUND.message,
                ERROR_CODES.HOTEL_NOT_FOUND.code,
                ERROR_CODES.HOTEL_NOT_FOUND.statusCode,
            );
        }

        res.json(hotel.reviews);
    } catch (err) {
        console.log(err);
        next(new CustomError("Failed to get reviews"));
    }
};

export const deleteReview: RequestHandler = async (req, res, next) => {
    try {
        const { hotelId, reviewId } = req.params;

        const hotel = await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { reviews: reviewId },
        });

        if (!hotel) {
            throw new CustomError(
                ERROR_CODES.HOTEL_NOT_FOUND.message,
                ERROR_CODES.HOTEL_NOT_FOUND.code,
                ERROR_CODES.HOTEL_NOT_FOUND.statusCode,
            );
        }

        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            throw new CustomError(
                ERROR_CODES.REVIEW_NOT_FOUND.message,
                ERROR_CODES.REVIEW_NOT_FOUND.code,
                ERROR_CODES.REVIEW_NOT_FOUND.statusCode,
            );
        }

        res.json({ message: "Review deleted" });
    } catch (err) {
        next(new CustomError("Failed to delete review"));
    }
};

