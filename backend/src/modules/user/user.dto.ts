export interface UserDTO {
    id: string;
    googleId?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    gender?: string;
    birthday?: Date;
    nationality?: string;
    emailVerified: boolean;
    roles: string[]; // Array of role IDs or names
}
