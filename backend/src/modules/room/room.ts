import mongoose from "mongoose";
import { RoomType } from "@shared/types";

const roomSchema = new mongoose.Schema<RoomType>({
    name: { type: String, required: true },
    roomType: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    isBooked: { type: Boolean, default: false, required: true },
});

const Room = mongoose.model<RoomType>("Room", roomSchema);

export default Room;
