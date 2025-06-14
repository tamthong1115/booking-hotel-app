import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../../shared/types";

const userSchema = new mongoose.Schema<UserType>({
    googleId: { type: String, required: false, unique: true },
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
    // isAdmin: { type: Boolean, required: true, default: false },
    roles: [{ type: String, required: true, default: "user" }],
});

// Unique index for phoneNumber only when it exists and is not null
userSchema.index(
    { phoneNumber: 1 },
    { unique: true, partialFilterExpression: { phoneNumber: { $type: "string", $ne: null } } },
);

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

const User = mongoose.model<UserType>("User", userSchema);

export default User;
