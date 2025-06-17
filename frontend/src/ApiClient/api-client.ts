// if the backend and frontend bundles just use the same server to fetch
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type ContactUsFormData = {
    name: string;
    phone: string;
    email: string;
    message: string;
};

export const postNewContactUs = async (formData: ContactUsFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/email/contact-us`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error("Error sending notification");
    }

    return response.json();
};

// verify-notification/:token
export const verifyEmail = async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/verify-email/${token}`);

    if (!response.ok) {
        throw new Error("Error verifying notification");
    }

    return response.json();
};

// resend notification verification
export const resendEmailVerification = async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/resend-email-verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error("Error resending notification verification");
    }

    return response.json();
};

// forget-password
type ForgetPasswordFormData = {
    email: string;
};

export const sendPasswordMail = async (data: ForgetPasswordFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/forget-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error sending notification");
    }

    return response.json();
};

// reset-password
type ResetPasswordFormData = {
    password: string;
    confirmPassword: string;
    token: string;
};

export const resetPassword = async (data: ResetPasswordFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Error resetting password");
    }

    return response.json();
};
