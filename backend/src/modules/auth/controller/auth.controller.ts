import { Request, Response } from "express";
import * as authService from "../service/auth.service";
import generateToken from "../../../utils/generateToken";

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
