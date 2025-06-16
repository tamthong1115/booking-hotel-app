import express from "express";
import verifyTokenUser from "../../middlewares/verifyTokenUser";
import { deleteReview, getReviews, postNewReview } from "./review.controller";

const router = express.Router({ mergeParams: true });

// /api/hotels/:hotelId/reviews
router.post("/", verifyTokenUser, postNewReview);

router.get("/", getReviews);

router.delete("/:reviewId", deleteReview);

export default router;
