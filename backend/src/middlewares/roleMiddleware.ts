import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../modules/user/user";

const roleMiddleware = (requiredRoles: string[]): RequestHandler => {
    return async (req, res, next) => {
        const token = req.cookies["auth_token"];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            req.userId = (decoded as JwtPayload).userId;
            const user = await User.findById(req.userId);
            req.roles = user?.roles;

            const hasRequiredRoles = requiredRoles.every((role) => req.roles?.includes(role));

            if (!hasRequiredRoles) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: "Token verification failed" });
        }
    };
};

export default roleMiddleware;
