import { RegisterInputDTO, LoginInputDTO, UserType } from "@shared/types/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error fetching user");
    }
    return response.json();
};
export const updateUser = async (formData: UserType) => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error("Error updating user");
    }

    return response.json();
};
export const register = async (formData: RegisterInputDTO) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
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
};
export const signIn = async (formData: LoginInputDTO) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include", // send any cookies along with req
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
};

export const validateTokenUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include", // send any cookies along with req
    });

    if (!response.ok) {
        throw new Error("Token Invalid");
    }
    return response.json();
};

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Error during sign out!");
    }
};

// getUserRoles
export const getUserRoles = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/roles`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching user roles");
    }
    return response.json();
};
