"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const ExpressHandler_1 = __importDefault(require("./src/middlewares/ExpressHandler"));
const user_routes_1 = __importDefault(require("./src/modules/user/user.routes"));
const auth_routes_1 = __importDefault(require("./src/modules/auth/routes/auth.routes"));
const hotel_admin_routes_1 = __importDefault(require("./src/modules/hotel/hotel.admin.routes"));
const hotels_routes_1 = __importDefault(require("./src/modules/hotel/hotels.routes"));
const booking_routes_1 = __importDefault(require("./src/modules/booking/routes/booking.routes"));
const review_routes_1 = __importDefault(require("./src/modules/review/review.routes"));
const room_routes_1 = __importDefault(require("./src/modules/room/room.routes"));
const email_routes_1 = __importDefault(require("./src/modules/notification/email.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectToDatabase_1 = __importDefault(require("./src/utils/connectToDatabase"));
const cloudinary_1 = require("cloudinary");
const swagger_1 = require("./src/swagger");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
(0, connectToDatabase_1.default)();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
// parse incoming JSON req
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const allowCors = [
    process.env.FRONTEND_URL,
    process.env.DOMAIN_DEPLOYMENT_URL,
    `http://localhost:${process.env.API_PORT}`,
];
// allow req from another port
app.use(
    (0, cors_1.default)({
        origin: allowCors,
        credentials: true,
    }),
);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/my-hotels", hotel_admin_routes_1.default);
app.use("/api/hotels", hotels_routes_1.default);
app.use("/api/my-bookings", booking_routes_1.default);
app.use("/api/hotels/:hotelId/reviews", review_routes_1.default);
app.use("/api/hotels/:hotelId/rooms", room_routes_1.default);
app.use("/api/notification", email_routes_1.default);
app.use("/api/docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
});
// Error handling middleware
app.use(ExpressHandler_1.default);
app.listen(process.env.API_PORT, () => {
    try {
        console.log(`Server is running on port ${process.env.API_PORT}`);
    } catch (err) {
        console.log(err);
    }
});
