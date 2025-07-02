import { Request, Response } from "express";
import UserModel from "./user";
import { toUserDTO } from "./user.mapper";

export const getCurrentUser = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const user = await UserModel.findById(userId).select("-password").populate("roles"); // exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(toUserDTO(user));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const user = await UserModel.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Updated User Failed" });
    }
};
