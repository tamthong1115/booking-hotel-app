import express from "express";
import verifyTokenUser from "../../middlewares/verifyTokenUser";
import { getBookings } from "./booking.controller";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyTokenUser, getBookings);

export default router;
