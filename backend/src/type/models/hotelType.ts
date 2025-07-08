import { Types } from "mongoose";
import { BookingType, RoomType } from "@shared/types/types";

export type RoomModelType = {
    _id: Types.ObjectId;
    name: string;
    roomType: string;
    description: string;
    pricePerNight: number;
    isBooked: boolean;
};
export type ReviewModelType = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    userName: string;
    hotelId: Types.ObjectId;
    rating: number;
    comment: string;
};

export type BookingModelType = {
    _id: Types.ObjectId;
    roomId: Types.ObjectId;
    userId: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
};

export type HotelModelType = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    city: string;
    country: string;
    location: {
        type: string;
        coordinates: number[];
    };
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    starRating: number;
    imagePublicIds: string[];
    imageUrls: string[];
    lastUpdated: Date;
    bookings: BookingModelType[];
    reviews: Types.ObjectId[];
    rooms?: RoomModelType[];
};
