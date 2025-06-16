import mongoose from "mongoose";
import { HotelType } from "../../../types/typesBackend";
import Review from "../review/review";
import Room from "../room/room";

const hotelSchema = new mongoose.Schema<HotelType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imagePublicIds: [{ type: String, required: true }],
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

// delete all reviews associated with a hotel
hotelSchema.post("findOneAndDelete", async (doc) => {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
        await Room.deleteMany({ _id: { $in: doc.rooms } });
    }
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;
