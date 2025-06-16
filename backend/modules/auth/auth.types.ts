export type RegisterPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type ResetPasswordPayload = {
    token: string;
    password: string;
    confirmPassword: string;
};

export type ForgetPasswordPayload = {
    email: string;
};
