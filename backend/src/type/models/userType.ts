import { Document, Types } from "mongoose";

export interface PermissionModelType extends Document {
    _id: Types.ObjectId;
    name: string;
}

export interface RoleModelType extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    permissions: PermissionModelType[];
}

export interface UserModelType extends Document {
    _id: Types.ObjectId;
    googleId?: string;
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    gender?: string;
    birthday?: Date;
    nationality?: string;
    emailVerified: boolean;
    roles: RoleModelType[];
}
