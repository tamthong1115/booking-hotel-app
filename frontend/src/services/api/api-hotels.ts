import { HotelSearchResponseFrontEnd, HotelTypeFrontend } from "../shared/types/types.ts";
import { BookingType, RoomType } from "../../../backend/shared/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error("Error during add hotel!");
    }

    return response.json();
};
// admin
export const fetchMyHotels = async (): Promise<HotelTypeFrontend[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
};
// public
export const fetchHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
};
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    return response.json();
};
export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body: hotelFormData,
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Update hotel failed");
    }

    return response.json();
};
export const deleteHotelById = async (hotelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error deleting hotel");
    }
};
export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
};
export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponseFrontEnd> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility));

    searchParams.types?.forEach((type) => queryParams.append("types", type));

    searchParams.stars?.forEach((star) => queryParams.append("stars", star));

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

    if (!response.ok) {
        throw new Error("Error fetching hotels!");
    }

    return response.json();
};
export const fetchHotelById = async (hotelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if (!response.ok) {
        throw new Error("Error fetching hotel");
    }

    return response.json();
};

interface HotelType {
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
