export type RegisterInputDTO = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export interface LoginInputDTO {
    email: string;
    password: string;
}

export interface ResetPasswordInputDTO {
    token: string;
    password: string;
    confirmPassword: string;
}
