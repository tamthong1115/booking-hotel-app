import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

export const postNewContactUs: RequestHandler = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        if (!name || !phone || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
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

        const mailOptions = {
            from: email,
            to: process.env.BOOKING_EMAIL,
            subject: `New contact us message from ${name}`,
            text: `Phone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Internal server error" });
            }

            console.log(`Email sent: ${info.response}`);
            res.json({ message: "Email sent" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
