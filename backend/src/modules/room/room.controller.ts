import { RequestHandler } from "express";
import Room from "./room";
import Hotel from "../hotel/hotel";
import { RoomType } from "../../../shared/types";

export const addNewRoom: RequestHandler = async (req, res, next) => {
    try {
        const { hotelId } = req.body;
        // console.log(hotelId);

        const hotel = await Hotel.findById(hotelId).populate<{ rooms: RoomType[] }>("rooms");

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const newRoom = new Room(req.body);
        hotel.rooms.push(newRoom);

        await newRoom.save();
        await hotel.save();

        res.status(201).json(newRoom);
    } catch (err) {
        console.log(err);
        next(new Error(`Error creating room: ${err}`));
    }
};

export const getRooms: RequestHandler = async (req, res, next) => {
    try {
        const { hotelId } = req.params;

        const hotel = await Hotel.findById(hotelId).populate<{ rooms: RoomType[] }>("rooms");

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found (getRooms)" });
        }

        res.status(200).json(hotel.rooms);
    } catch (err) {
        next(new Error(`Error creating room: ${err}`));
    }
};
