import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@modules/user/user";
import { sendError } from "@utils/response";
import { ERROR_CODES } from "@shared/constants/errorCodes";

const verifyTokenUser: RequestHandler = async (req, res, next) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        // console.log("Decoded token:", decoded);
        const user = await UserModel.findById((decoded as JwtPayload).userId)
            .select("-password")
            .populate("roles");
        if (!user) {
            return sendError(res, ERROR_CODES.USER_NOT_FOUND.message, ERROR_CODES.USER_NOT_FOUND.code);
        }
        req.user_backend = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "get authorized failed" });
    }
};

export default verifyTokenUser;
