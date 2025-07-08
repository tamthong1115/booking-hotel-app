import { RequestHandler } from "express";
import UserModel from "@modules/user/user";

const checkPermission = (requiredPermission: string): RequestHandler => {
    return async (req, res, next) => {
        if (!req.user_backend?._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await UserModel.findById(req.user_backend?._id).populate("roles");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        // Flatten permissions from all roles
        const permissions = user.roles
            .flatMap((role: any) => role.permissions)
            .map((perm: any) => (typeof perm === "string" ? perm : perm.name));
        if (!permissions.includes(requiredPermission)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};

export default checkPermission;
