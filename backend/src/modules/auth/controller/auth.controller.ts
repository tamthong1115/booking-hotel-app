import { NextFunction, Request, Response } from "express";
import generateToken from "@utils/generateToken";
import { RegisterInputDTO, UserType } from "@shared/types/types";
import passport from "passport";
import * as authService from "../service/auth.service";
import { sendError, sendSuccess } from "@utils/response";
import { ERROR_CODES } from "../../../../../shared/constants/errorCodes";
import CustomError from "@utils/ExpressError";

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}

export const postRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: RegisterInputDTO = req.body;
        await authService.register(dto);
        return sendSuccess(res, "User registered OK", 201);
    } catch (error) {
        next(
            new CustomError(
                getErrorMessage(error),
                ERROR_CODES.REGISTER_FAILED.code,
                ERROR_CODES.REGISTER_FAILED.statusCode,
            ),
        );
    }
};

export const getVerifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authService.verifyEmail(req.params.token);
        res.status(200).json({ message: "Email verified Success" });
    } catch (error) {
        next(error);
    }
};

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authService.login({ email: req.body.email, password: req.body.password });
        await generateToken(res, user.id);
        return sendSuccess(res, "Login OK", 200, { userId: user.id, email: user.email });
    } catch (error) {
        next(error);
    }
};

export const postForgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authService.sendResetPasswordEmail(req.body.email);
        res.status(200).json({ message: "Check your notification to reset password" });
    } catch (error) {
        next(error);
    }
};

export const postResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token, password, confirmPassword } = req.body;
    try {
        await authService.resetPassword({ token, password, confirmPassword });
        res.status(200).json({ message: "Password reset OK" });
    } catch (error) {
        next(error);
    }
};

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        "google",
        { session: false },
        async (err: Error | null, user: UserType | false, info: { message?: string } | undefined) => {
            console.log("Google callback triggered");

            if (err) {
                console.error("Passport error:", err);
                const url = `${process.env.WEB_URL || "http://localhost:5173"}/sign-in?error=${encodeURIComponent("Internal server error.")}`;
                return res.redirect(url);
            }

            if (!user) {
                const message = info?.message || "Authentication failed.";
                const url = `${process.env.WEB_URL || "http://localhost:5173"}/sign-in?error=${encodeURIComponent(message)}`;
                return res.redirect(url);
            }

            try {
                await generateToken(res, user._id);
                return res.redirect(process.env.WEB_URL || "/");
            } catch (tokenErr) {
                console.error("Token error:", tokenErr);
                const url = `${process.env.WEB_URL || "http://localhost:5173"}/sign-in?error=${encodeURIComponent("Failed to generate token.")}`;
                return res.redirect(url);
            }
        },
    )(req, res, next);
};

export const getValidateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user_backend?._id) {
            return sendError(
                res,
                "Unauthorized",
                ERROR_CODES.UNAUTHORIZED_ACCESS.message,
                ERROR_CODES.UNAUTHORIZED_ACCESS.statusCode,
            );
        }
        res.status(200).send({ userId: req.user_backend?._id });
    } catch (error) {
        next(error);
    }
};

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await authService.getRoles(req.user_backend?._id.toString() || "");
        res.json(roles);
    } catch (error) {
        next(error);
    }
};

export const postLogout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("auth_token", "", { expires: new Date(0) });
        res.status(200).json({ message: "Logout OK" });
    } catch (error) {
        next(error);
    }
};
