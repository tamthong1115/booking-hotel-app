import express from "express";
import { postNewContactUs } from "./email.controller";

const router = express.Router();

// /api/notification/contact-us
router.post("/contact-us", postNewContactUs);

export default router;
