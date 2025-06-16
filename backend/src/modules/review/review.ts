import mongoose from "mongoose";
import { ReviewType } from "../../../shared/types";

const reviewSchema = new mongoose.Schema<ReviewType>({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    hotelId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
});

const Review = mongoose.model<ReviewType>("Review", reviewSchema);

export default Review;
