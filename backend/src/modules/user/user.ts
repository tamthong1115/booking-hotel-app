import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { UserModelType } from "../../type/models/userType";

const userSchema = new mongoose.Schema<UserModelType>({
    _id: { type: Schema.Types.ObjectId, auto: true, required: true },
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

// Hash the password before saving the user models
userSchema.pre("save", async function (this: mongoose.Document & UserModelType, next) {
    if (this.isModified("password")) {
        const saltRounds = 10;
        if (this.password) {
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
    next();
});

const UserModel = mongoose.model<UserModelType>("User", userSchema);

export default UserModel;
