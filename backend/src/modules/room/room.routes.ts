import express from "express";
import { addNewRoom, getRooms } from "./room.controller";
import checkRole from "@middlewares/checkRole";

const router = express.Router();

router.get("/:hotelId", getRooms);

// /api/hotels/:hotelId/rooms
router.post("/", checkRole(["admin"]), addNewRoom);

export default router;
