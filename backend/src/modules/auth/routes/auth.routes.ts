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
    googleCallback,
} from "../controller/auth.controller";
import verifyTokenUser from "@middlewares/verifyTokenUser";
import checkRole from "@middlewares/checkRole";
import {
    forgetPasswordValidator,
    loginValidator,
    registerValidator,
    resetPasswordValidator,
} from "../validation/auth.routes.validation";
import passport from "@modules/auth/utils/passport";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginValidator, postLogin);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post("/register", registerValidator, postRegister);

/**
 * @swagger
 * /auth/verify-email/{token}:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Verification token
 *     responses:
 *       200:
 *         description: Email verified
 *       400:
 *         description: Invalid or expired token
 */
router.get("/verify-email/:token", getVerifyEmail);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Start Google OAuth 2.0 login
 *     tags: [Auth]
 *     description: Redirects the user to Google for authentication.
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    }),
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth 2.0 callback
 *     tags: [Auth]
 *     description: Handles the callback from Google after authentication. On success, issues a JWT and sets a cookie, then redirects to the frontend.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: false
 *         description: Google OAuth code (provided by Google)
 *     responses:
 *       302:
 *         description: Redirect to frontend with authentication result
 */
router.get("/google/callback", googleCallback);

/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Validation error
 */
router.post("/forget-password", forgetPasswordValidator, postForgetPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Validation error
 */
router.post("/reset-password", resetPasswordValidator, postResetPassword);

/**
 * @swagger
 * /auth/validate-token:
 *   get:
 *     summary: Validate user token
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Unauthorized
 */
router.get("/validate-token", verifyTokenUser, getValidateToken);

/**
 * @swagger
 * /auth/roles:
 *   get:
 *     summary: Get user roles
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user roles
 *       401:
 *         description: Unauthorized
 */
router.get("/roles", verifyTokenUser, getRoles);

router.get(
    "/validate-token-role/:role",
    verifyTokenUser,
    (req, res, next) => checkRole([req.params.role])(req, res, next),
    getValidateToken,
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", postLogout);

export default router;
