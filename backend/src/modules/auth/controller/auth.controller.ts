import { Request, Response } from "express";
import * as authService from "../service/auth.service";
import generateToken from "@utils/generateToken";
import { UserType } from "@shared/types";

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}

export const postRegister = async (req: Request, res: Response) => {
    try {
        await authService.registerUser(req.body);
        res.status(200).send({ message: "User registered OK" });
    } catch (error) {
        res.status(400).send({ message: getErrorMessage(error) || "Something went wrong" });
    }
};

export const getVerifyEmail = async (req: Request, res: Response) => {
    try {
        await authService.verifyEmail(req.params.token);
        res.status(200).json({ message: "Email verified Success" });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) || "Something went wrong" });
    }
};

export const postLogin = async (req: Request, res: Response) => {
    try {
        const user = await authService.loginUser(req.body.email, req.body.password);
        generateToken(res, user.id);
        res.status(200).json({ userId: user._id });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) || "Something went wrong" });
    }
};

export const postForgetPassword = async (req: Request, res: Response) => {
    try {
        await authService.sendResetPasswordEmail(req.body.email);
        res.status(200).json({ message: "Check your notification to reset password" });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) || "Something went wrong" });
    }
};

export const postResetPassword = async (req: Request, res: Response) => {
    const { token, password, confirmPassword } = req.body;
    try {
        await authService.resetPassword(token, password, confirmPassword);
        res.status(200).json({ message: "Password reset OK" });
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(error) || "Something went wrong" });
    }
};

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        "google",
        { session: false },
        async (err: Error | null, user: UserType | false, info: { message?: string } | undefined) => {
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

export const getValidateToken = (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
};

export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await authService.getUserRoles(req.userId as string);
        res.json(roles);
    } catch (error) {
        res.status(404).json({ message: getErrorMessage(error) || "User not found" });
    }
};

export const postLogout = (req: Request, res: Response) => {
    try {
        res.cookie("auth_token", "", { expires: new Date(0) });
        res.status(200).json({ message: "Logout OK" });
    } catch (error) {
        res.status(500).json({ message: getErrorMessage(error) || "Something went wrong" });
    }
};
