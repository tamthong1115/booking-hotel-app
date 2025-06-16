import { Request, Response } from "express";
import User from "./user";

export const getCurrentUser = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId).select("-password"); // exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        const user = await User.findByIdAndUpdate(userId, req.body, {
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
