import "module-alias/register";
import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import ExpressHandler from "@middlewares/ExpressHandler";
import userRoutes from "@modules/user/user.routes";
import authRoutes from "@modules/auth/routes/auth.routes";
import myHotelRoutes from "@modules/hotel/hotel.admin.routes";
import hotelRoutes from "@modules/hotel/hotels.routes";
import bookingRoutes from "@modules/booking/routes/booking.routes";
import reviewRoutes from "@modules/review/review.routes";
import roomRoutes from "@modules/room/room.routes";
import emailRoutes from "@modules/notification/email.routes";
import cookieParser from "cookie-parser";
import connectToDatabase from "@utils/connectToDatabase";
import { v2 as cloudinary } from "cloudinary";
import { swaggerSpec, swaggerUi } from "./src/swagger";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectToDatabase();

const app = express();
app.use(cookieParser());

// parse incoming JSON req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowCors = [
    process.env.FRONTEND_URL as string,
    process.env.DOMAIN_DEPLOYMENT_URL as string,
    `http://localhost:${process.env.API_PORT}`,
];
// allow req from another port
app.use(
    cors({
        origin: allowCors,
        credentials: true,
    }),
);

app.use(express.static(path.join(__dirname, "../../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);
app.use("/api/hotels/:hotelId/reviews", reviewRoutes);
app.use("/api/hotels/:hotelId/rooms", roomRoutes);
app.use("/api/notification", emailRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../frontend/dist/index.html"));
});

// Error handling middleware
app.use(ExpressHandler);

app.listen(process.env.API_PORT, () => {
    try {
        console.log(`Server is running on port ${process.env.API_PORT}`);
    } catch (err) {
        console.log(err);
    }
});
