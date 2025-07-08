import express from "express";
import { deleteHotel, editHotel, getHotels, getOneHotel, postNewHotel } from "./hotel.admin.controller";
import multer from "multer";
import checkRole from "@middlewares/checkRole";
import { body } from "express-validator";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

// api/my-hotels
const MAX_IMG = 6;
router.post(
    "/",
    checkRole(["admin"]),
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", MAX_IMG),
    postNewHotel,
);

router.get("/", checkRole(["admin"]), getHotels);

router.get("/:hotelId", checkRole(["admin"]), getOneHotel);

// api/my-hotels/:hotelId
router.put(
    "/:hotelId", // params hotelId
    checkRole(["admin"]),
    upload.array("imageFiles"),
    editHotel,
);

//delete
router.delete("/:hotelId", checkRole(["admin"]), deleteHotel);

export default router;
