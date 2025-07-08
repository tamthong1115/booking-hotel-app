import { HotelType } from "@shared/types/types.ts";
import { BookingFormData } from "../../forms/BookingForm/BookingForm.tsx";
import { PaymentIntentResponse } from "@shared/types/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const createPaymentIntent = async (
    hotelId: string,
    roomId: string,
    numberOfNights: string,
): Promise<PaymentIntentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/${roomId}/bookings/payment-intent`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error creating payment intent");
    }

    return response.json();
};
export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/${formData.roomId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error("Error creating booking");
    }
};
export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
        credentials: "include",
    });

    if (!response) {
        throw new Error("Unable to fetch bookings");
    }

    return response.json();
};
