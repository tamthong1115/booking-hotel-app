import UserModel from "@modules/user/user";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RegisterPayload } from "../types/auth.types";

const WEB_URL = process.env.WEB_URL || "http://localhost:5173";

export async function registerUser(userData: RegisterPayload) {
    let user = await UserModel.findOne({ email: userData.email });
    if (user) throw new Error("User already exists");

    user = new UserModel(userData);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.BOOKING_EMAIL,
            pass: process.env.BOOKING_EMAIL_PASSWORD,
        },
    });

    const emailToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || "", { expiresIn: "1d" });
    const url = `${WEB_URL}/verify-email/${emailToken}`;
    const mailOptions = {
        from: process.env.BOOKING_EMAIL,
        to: user.email,
        subject: "Verify your notification",
        text: `Please click on this link to verify your email: ${url}`,
    };

    await transporter.sendMail(mailOptions);
    await user.save();
}

export async function verifyEmail(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
    const user = await UserModel.findById((decoded as JwtPayload).userId);
    if (!user) throw new Error("User not found");
    user.emailVerified = true;
    await user.save();
}

export async function loginUser(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Email or password is incorrect");
    if (!user.emailVerified) throw new Error("Email not verified");

    if (!user.password) throw new Error("Email or password is incorrect");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Email or password is incorrect");

    return user;
}

export async function sendResetPasswordEmail(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.BOOKING_EMAIL,
            pass: process.env.BOOKING_EMAIL_PASSWORD,
        },
    });

    const emailToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || "", { expiresIn: "1d" });
    const url = `${WEB_URL}/reset-password/${emailToken}`;
    const mailOptions = {
        from: process.env.BOOKING_EMAIL,
        to: user.email,
        subject: "Reset your password",
        text: `Please click on this link to reset your password: ${url}`,
    };

    await transporter.sendMail(mailOptions);
}

export async function resetPassword(token: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
    const user = await UserModel.findById((decoded as JwtPayload).userId);
    if (!user) throw new Error("User not found");

    user.password = password;
    await user.save();
}

export async function getUserRoles(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    return user.roles;
}
