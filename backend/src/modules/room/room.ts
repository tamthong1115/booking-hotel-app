import mongoose from "mongoose";
import { RoomType } from "@shared/types/types";
import { RoomModelType } from "../../type/model/hotelType";

const roomSchema = new mongoose.Schema<RoomModelType>({
    name: { type: String, required: true },
    roomType: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    isBooked: { type: Boolean, default: false, required: true },
});

const Room = mongoose.model<RoomModelType>("Room", roomSchema);

export default Room;
