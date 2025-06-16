import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../modules/user/user";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            roles?: string[];
        }
    }
}

const verifyTokenUser: RequestHandler = async (req, res, next) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        console.log;
        return res.status(401).json({ message: "get authorized failed" });
    }
};

export default verifyTokenUser;
