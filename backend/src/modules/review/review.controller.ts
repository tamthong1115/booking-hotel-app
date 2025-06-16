import { RequestHandler } from "express";
import Review from "./review";
import Hotel from "../hotel/hotel";
import CustomError from "../../utils/ExpressError";
import { BookingType } from "../../../shared/types";

export const postNewReview: RequestHandler = async (req, res, next) => {
    try {
        const { hotelId } = req.params;

        const hotel = await Hotel.findById(hotelId).populate<{ bookings: BookingType[] }>("bookings");
        if (!hotel) {
            return next(new CustomError("Hotel not found", 404));
        }

        // check if user having booked the hotel
        const isBooked = hotel.bookings.some((booking) => {
            return booking.userId.toString() === req.userId;
        });

        if (!isBooked) {
            return res.status(403).json({ message: "You must book the hotel to post a review" });
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
        next(new CustomError("Failed to post review", 500));
    }
};

export const getReviews: RequestHandler = async (req, res, next) => {
    try {
        const { hotelId } = req.params;

        const hotel = await Hotel.findById(hotelId).populate("reviews");

        if (!hotel) {
            return next(new CustomError("Hotel not found", 404));
        }

        res.json(hotel.reviews);
    } catch (err) {
        console.log(err);
        next(new CustomError("Failed to get reviews", 500));
    }
};

export const deleteReview: RequestHandler = async (req, res, next) => {
    try {
        const { hotelId, reviewId } = req.params;

        const hotel = await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { reviews: reviewId },
        });

        if (!hotel) {
            return next(new CustomError("Hotel not found", 404));
        }

        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            return next(new CustomError("Review not found", 404));
        }

        res.json({ message: "Review deleted" });
    } catch (err) {
        next(new CustomError("Failed to delete review", 500));
    }
};
