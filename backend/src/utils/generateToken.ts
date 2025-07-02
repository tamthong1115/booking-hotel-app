import { Response } from "express";
import jwt from "jsonwebtoken";

/**
 * This function generates a JSON Web Token (JWT) for a user and sets it as a cookie in the response object.
 *
 * @param {Response} res - The Express response object where the JWT will be set as a cookie.
 * @param {string} userId - The ID of the user for whom the token is being generated.
 *
 * @returns {string} - The generated JWT.
 *
 * @throws {Error} - Throws an error if the JWT generation fails.
 */
const generateToken = async (res: Response, userId: string): Promise<string> => {
    console.log("generateToken called with:", userId); // 👈 add this

    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // cookie will only be set in https in production
        maxAge: 86400000,
    });

    return token;
};

export default generateToken;
