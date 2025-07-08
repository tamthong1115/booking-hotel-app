import { RoomType } from "@shared/types/types.ts";
import { RoomFormData } from "../../forms/RoomForm/RoomForm.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const getRooms = async (hotelId: string): Promise<RoomType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/rooms/${hotelId}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching rooms");
    }

    return response.json();
};
export const addNewRoom = async (roomData: RoomFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${roomData.hotelId}/rooms`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
    });

    if (!response.ok) {
        throw new Error("Error creating room");
    }

    return response.json();
};
