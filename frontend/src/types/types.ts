export type Permission = {
    _id: string;
    name: string;
};

export const ROLES = {
    SUPER_ADMIN: "super-admin",
    HOTEL_OWNER: "hotel-owner",
    HOTEL_MANAGER: "hotel-manager",
    RECEPTIONIST: "receptionist",
    USER: "user",
} as const;

export type RoleType = {
    _id: string;
    name: string;
    description: string;
    permissions: Permission[];
};

export interface BookingType {
    _id: string;
    roomId: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
}

export interface RoomType {
    _id: string;
    name: string;
    roomType: string;
    description: string;
    pricePerNight: number;
    isBooked: boolean;
}

export interface HotelType {
    _id: string;
    userId: string;
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
    bookings: BookingType[];
    reviews: string[];
    rooms?: RoomType[];
}

export type HotelSearchResponseFrontEnd = {
    data: HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
};
