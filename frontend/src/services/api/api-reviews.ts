import { ReviewType } from "../../../backend/shared/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const postNewReview = async (formData: ReviewType) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
};
export const getReviews = async (hotelId: string): Promise<ReviewType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/reviews`);

    if (!response.ok) {
        throw new Error("Error fetching reviews");
    }

    return response.json();
};
export const deleteReview = async (hotelId: string, reviewId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const errorData = (await response.json()) || "Error deleting review";
        throw new Error(errorData.message);
    }
};
