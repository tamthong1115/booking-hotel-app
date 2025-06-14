import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import "dotenv/config";
import nodemailer from "nodemailer";
import jwt, { JwtPayload } from "jsonwebtoken";

const WEB_URL = process.env.WEB_URL || "http://localhost:5173";

// /api/users/register
export const postRegister = async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User(req.body);

        // verify email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.BOOKING_EMAIL,
                pass: process.env.BOOKING_EMAIL_PASSWORD,
            },
        });

        const emailToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || "", { expiresIn: "1d" });

        const url = `${WEB_URL}/verify-email/${emailToken}`;
        const mailOptions = {
            from: process.env.BOOKING_EMAIL,
            to: user.email,
            subject: "Verify your email",
            text: `Please click on this link to verify your email: ${url}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Sending email failed" });
            }

            console.log(`Email sent: ${info.response}`);
        });

        await user.save();

        return res.status(200).send({ message: "User registered OK" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
};

// /api/auth/verify-email/:token
export const getVerifyEmail = async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
        const user = await User.findById((decoded as JwtPayload).userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.emailVerified = true;

        await user.save();

        res.status(200).json({ message: "Email verified Success" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const postLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }
        if (!user.emailVerified) {
            // send email verification
            const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.BOOKING_EMAIL,
                    pass: process.env.BOOKING_EMAIL_PASSWORD,
                },
            });

            const emailToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || "", { expiresIn: "1d" });

            const url = `${WEB_URL}/verify-email/${emailToken}`;

            const mailOptions = {
                from: process.env.BOOKING_EMAIL,
                to: user.email,
                subject: "Verify your email",
                text: `Please click on this link to verify your email: ${url}`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Sending email failed" });
                }

                console.log(`Email sent: ${info.response}`);
            });

            return res.status(400).json({ message: "Email not verified. Check your email to verify" });
        }

        if (!user.password) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        generateToken(res, user.id);

        res.status(200).json({ userId: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// export const getHandleGoogleCallback = (req: Request, res: Response) => {
//     if (req.authInfo && req.authInfo.message) {
//         return res.status(400).json({ message: req.authInfo.message });
//     }
//     const user = req.user as typeof User.prototype;
//     if (!user) {
//         return;
//     }
//     // Generate JWT token and set it as a cookie
//     generateToken(res, user._id);

//     res.redirect(WEB_URL);
// };
export const postForgetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.BOOKING_EMAIL,
                pass: process.env.BOOKING_EMAIL_PASSWORD,
            },
        });

        const emailToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || "", { expiresIn: "1d" });

        const url = `${WEB_URL}/reset-password/${emailToken}`;

        const mailOptions = {
            from: process.env.BOOKING_EMAIL,
            to: user.email,
            subject: "Reset your password",
            text: `Please click on this link to reset your password: ${url}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Sending email failed" });
            }

            console.log(`Email sent: ${info.response}`);

            res.status(200).json({ message: "Check your email to reset password" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const postResetPassword = async (req: Request, res: Response) => {
    const { token, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
        const user = await User.findById((decoded as JwtPayload).userId);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.password = password;

        await user.save();

        res.status(200).json({ message: "Password reset OK" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getValidateToken = (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
};

export const getRoles = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.userId);

        // console.log(req.userId)
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const postLogout = (req: Request, res: Response) => {
    try {
        res.cookie("auth_token", "", { expires: new Date(0) });

        res.status(200).json({ message: "Logout OK" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
