import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import ExpressHandler from "./src/middlewares/ExpressHandler";
import userRoutes from "./src/modules/user/user.routes";
import authRoutes from "./src/modules/auth/auth.routes";
import myHotelRoutes from "./src/modules/hotel/hotel.admin.routes";
import hotelRoutes from "./src/modules/hotel/hotels.routes";
import bookingRoutes from "./src/modules/booking/booking.routes";
import reviewRoutes from "./src/modules/review/review.routes";
import roomRoutes from "./src/modules/room/room.routes";
import emailRoutes from "./src/modules/notification/email.routes";
import cookieParser from "cookie-parser";
import connectToDatabase from "./src/utils/connectToDatabase";
import { v2 as cloudinary } from "cloudinary";

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

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);
app.use("/api/hotels/:hotelId/reviews", reviewRoutes);
app.use("/api/hotels/:hotelId/rooms", roomRoutes);
app.use("/api/notification", emailRoutes);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
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
