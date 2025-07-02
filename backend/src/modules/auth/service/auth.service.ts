import UserModel from "@modules/user/user";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt, { JwtPayload } from "jsonwebtoken";

import { RegisterInputDTO, LoginInputDTO, ResetPasswordInputDTO } from "@modules/auth/dto/auth.dto";

import CustomError from "@utils/ExpressError";
import { ERROR_CODES } from "@shared/constants/errorCodes";

const webUrl = process.env.WEB_URL || "http://localhost:5173";
const email = process.env.BOOKING_EMAIL!;
const emailPass = process.env.BOOKING_EMAIL_PASSWORD!;
const jwtSecret = process.env.JWT_SECRET_KEY!;

function getTransporter() {
    return nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: email,
            pass: emailPass,
        },
    });
}

export async function register(userData: RegisterInputDTO): Promise<string> {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
        throw new CustomError(
            ERROR_CODES.EMAIL_ALREADY_EXISTS.message,
            ERROR_CODES.EMAIL_ALREADY_EXISTS.code,
            ERROR_CODES.EMAIL_ALREADY_EXISTS.statusCode,
        );
    }

    const user = new UserModel(userData);
    const emailToken = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1d",
    });

    const url = `${webUrl}/verify-email/${emailToken}`;
    const transporter = getTransporter();

    await transporter.sendMail({
        from: email,
        to: user.email,
        subject: "Verify your email",
        text: `Please verify your email by clicking: ${url}`,
    });

    await user.save();
    return user._id.toString();
}

export async function verifyEmail(token: string): Promise<void> {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
        throw new CustomError(
            ERROR_CODES.INVALID_TOKEN.message,
            ERROR_CODES.INVALID_TOKEN.code,
            ERROR_CODES.INVALID_TOKEN.statusCode,
        );
    }
    user.emailVerified = true;
    await user.save();
}

export async function login(data: LoginInputDTO) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user || !user.password) {
        throw new CustomError(
            ERROR_CODES.USER_NOT_FOUND.message,
            ERROR_CODES.USER_NOT_FOUND.code,
            ERROR_CODES.USER_NOT_FOUND.statusCode,
        );
    }

    if (!user.emailVerified) {
        throw new CustomError(
            ERROR_CODES.USER_NOT_VERIFIED.message,
            ERROR_CODES.USER_NOT_VERIFIED.code,
            ERROR_CODES.USER_NOT_VERIFIED.statusCode,
        );
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new CustomError(
            ERROR_CODES.INVALID_CREDENTIALS.message,
            ERROR_CODES.INVALID_CREDENTIALS.code,
            ERROR_CODES.INVALID_CREDENTIALS.statusCode,
        );
    }

    return user;
}

export async function sendResetPasswordEmail(emailAddr: string): Promise<void> {
    const user = await UserModel.findOne({ email: emailAddr });
    if (!user) {
        throw new CustomError(
            ERROR_CODES.USER_NOT_FOUND.message,
            ERROR_CODES.USER_NOT_FOUND.code,
            ERROR_CODES.USER_NOT_FOUND.statusCode,
        );
    }

    const emailToken = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1d",
    });

    const url = `${webUrl}/reset-password/${emailToken}`;
    const transporter = getTransporter();

    await transporter.sendMail({
        from: email,
        to: user.email,
        subject: "Reset your password",
        text: `Reset link: ${url}`,
    });
}

export async function resetPassword(data: ResetPasswordInputDTO): Promise<void> {
    if (data.password !== data.confirmPassword) {
        throw new CustomError(
            ERROR_CODES.PASSWORD_RESET_FAILED.message,
            ERROR_CODES.PASSWORD_RESET_FAILED.code,
            ERROR_CODES.PASSWORD_RESET_FAILED.statusCode,
        );
    }

    const decoded = jwt.verify(data.token, jwtSecret) as JwtPayload;
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
        throw new CustomError(
            ERROR_CODES.USER_NOT_FOUND.message,
            ERROR_CODES.USER_NOT_FOUND.code,
            ERROR_CODES.USER_NOT_FOUND.statusCode,
        );
    }

    user.password = data.password;
    await user.save();
}

export async function getRoles(userId: string) {
    const user = await UserModel.findById(userId).populate("roles");
    if (!user) throw new Error("User not found");
    return user.roles.map((role: any) => role.name);
}
