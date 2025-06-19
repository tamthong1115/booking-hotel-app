import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "@shared/types";
import { Role } from "@modules/user/role";

export interface User extends Document {
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
    roles: Role[];
}

const userSchema = new mongoose.Schema<User>({
    googleId: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, required: false },
    address: { type: String, required: false },
    gender: { type: String, enum: ["male", "female"], required: false },
    birthday: { type: Date, required: false },
    nationality: { type: String, required: false },
    emailVerified: { type: Boolean, required: true, default: false },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role", required: true }],
});

userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

// Hash the password before saving the user model
userSchema.pre("save", async function (this: mongoose.Document & UserType, next) {
    if (this.isModified("password")) {
        const saltRounds = 10;
        if (this.password) {
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
    next();
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
