import mongoose from "mongoose";
import { BookingModelType } from "../../../type/model/hotelType";

const bookingSchema = new mongoose.Schema<BookingModelType>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalCost: { type: Number, required: true },
});

const Booking = mongoose.model<BookingModelType>("Booking", bookingSchema);

export default Booking;
