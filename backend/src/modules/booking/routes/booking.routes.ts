import express from "express";
import verifyTokenUser from "@middlewares/verifyTokenUser";
import { getBookings } from "../controller/booking.controller";

const router = express.Router();

/**
 * @swagger
 * /my-bookings:
 *   get:
 *     summary: Get all bookings for the authenticated user
 *     tags: [Booking]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyTokenUser, getBookings);

export default router;
