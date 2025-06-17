import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "get authorized failed" });
    }
};

export default verifyTokenUser;
