import { BookingModelType, HotelModelType, RoomModelType } from "@type/model/hotelType";
import { HotelType, BookingType, RoomType } from "@shared/types/types";

/**
 * Maps a BookingModelType (with ObjectIds) to BookingType (with string ids)
 */
export function mapBookingToDTO(booking: BookingModelType): BookingType {
    return {
        _id: booking._id.toString(),
        roomId: booking.roomId.toString(),
        userId: booking.userId.toString(),
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        adultCount: booking.adultCount,
        childCount: booking.childCount,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        totalCost: booking.totalCost,
    };
}

/**
 * Maps a RoomModelType (with ObjectIds) to RoomType (with string ids)
 */
export function mapRoomToDTO(room: RoomModelType): RoomType {
    return {
        _id: room._id.toString(),
        name: room.name,
        roomType: room.roomType,
        description: room.description,
        pricePerNight: room.pricePerNight,
        isBooked: room.isBooked,
    };
}

/**
 * Maps a HotelModelType (with ObjectIds) to HotelType (with string ids)
 */
export function mapHotelToDTO(hotel: HotelModelType): HotelType {
    return {
        _id: hotel._id.toString(),
        userId: hotel.userId.toString(),
        name: hotel.name,
        city: hotel.city,
        country: hotel.country,
        location: {
            type: hotel.location.type,
            coordinates: hotel.location.coordinates,
        },
        description: hotel.description,
        type: hotel.type,
        adultCount: hotel.adultCount,
        childCount: hotel.childCount,
        facilities: hotel.facilities,
        starRating: hotel.starRating,
        imagePublicIds: hotel.imagePublicIds,
        imageUrls: hotel.imageUrls,
        lastUpdated: hotel.lastUpdated,
        bookings: (hotel.bookings || []).map(mapBookingToDTO),
        reviews: (hotel.reviews || []).map((reviewId) =>
            typeof reviewId === "string" ? reviewId : reviewId.toString(),
        ),
        rooms: hotel.rooms ? hotel.rooms.map(mapRoomToDTO) : undefined,
    };
}
