import mongoose from "mongoose";
import { ReviewModelType } from "../../type/models/hotelType";

const reviewSchema = new mongoose.Schema<ReviewModelType>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String, required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
});

const Review = mongoose.model<ReviewModelType>("Review", reviewSchema);

export default Review;
