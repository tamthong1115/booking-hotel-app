import { RequestHandler } from "express";

const checkRole = (requiredRoles: string[]): RequestHandler => {
    return async (req, res, next) => {
        const token = req.cookies["auth_token"];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const roles = req.user_backend?.roles.map((role) => role.name) || [];

            const hasRequiredRoles = requiredRoles.some((role) => roles?.includes(role));

            if (!hasRequiredRoles) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        } catch (error) {
            console.error("Token verification error:", error);
            return res.status(401).json({ message: "Token verification failed" });
        }
    };
};

export default checkRole;
