import express from "express";
import {
    getRoles,
    getValidateToken,
    getVerifyEmail,
    postForgetPassword,
    postLogin,
    postLogout,
    postRegister,
    postResetPassword,
} from "../controller/auth.controller";
import verifyTokenUser from "../../../middlewares/verifyTokenUser";
import roleMiddleware from "../../../middlewares/roleMiddleware";
import {
    forgetPasswordValidator,
    loginValidator,
    registerValidator,
    resetPasswordValidator,
} from "../validation/auth.routes.validation";
import passport from "../../../utils/passport";
import generateToken from "../../../utils/generateToken";
import { UserType } from "../../../../shared/types";

const router = express.Router();

// /api/auth/login
router.post("/login", loginValidator, postLogin);
router.post("/register", registerValidator, postRegister);
router.get("/verify-email/:token", getVerifyEmail);

/**
 * Starts the Google OAuth 2.0 flow.
 */
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    }),
);

/**
 * Handles callback from Google.
 * Uses custom callback to manage errors and token flow.
 */
router.get("/google/callback", (req, res, next) => {
    passport.authenticate(
        "google",
        { session: false },
        async (err: Error | null, user: UserType | false, info: { message?: string } | undefined) => {
            // System-level error during authentication
            if (err) {
                console.error("Passport error:", err);
                const url = `${process.env.WEB_URL || "http://localhost:5173"}/sign-in?error=${encodeURIComponent("Internal server error.")}`;
                return res.redirect(url);
            }

            // Auth flow error (e.g. custom info.message)
            if (!user) {
                const message = info?.message || "Authentication failed.";
                const url = `${process.env.WEB_URL || "http://localhost:5173"}/sign-in?error=${encodeURIComponent(message)}`;
                return res.redirect(url);
            }

            // Success: issue JWT and set cookie
            try {
                await generateToken(res, user._id);
                return res.redirect(process.env.WEB_URL || "/");
            } catch (tokenErr) {
                console.error("Token error:", tokenErr);
                const url = `${process.env.WEB_URL || "http://localhost:5173"}/sign-in?error=${encodeURIComponent("Failed to generate token.")}`;
                return res.redirect(url);
            }
        },
    )(req, res, next);
});
router.post("/forget-password", forgetPasswordValidator, postForgetPassword);
router.post("/reset-password", resetPasswordValidator, postResetPassword);

router.get("/validate-token", verifyTokenUser, getValidateToken);

router.get("/roles", verifyTokenUser, getRoles);

router.get(
    "/validate-token-role/:role",
    verifyTokenUser,
    (req, res, next) => roleMiddleware([req.params.role])(req, res, next),
    getValidateToken,
);

router.post("/logout", postLogout);

export default router;
