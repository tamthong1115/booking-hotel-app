export const ERROR_CODES = {
    USER_NOT_FOUND: {
        code: "USER_NOT_FOUND",
        message: "User not found",
        statusCode: 404,
    },
    REGISTER_FAILED: {
        code: "REGISTER_FAILED",
        message: "Registration failed",
        statusCode: 400,
    },
    INVALID_TOKEN: {
        code: "INVALID_TOKEN",
        message: "Invalid or expired token",
        statusCode: 401,
    },
    EMAIL_ALREADY_EXISTS: {
        code: "EMAIL_ALREADY_EXISTS",
        message: "Email already exists",
        statusCode: 409,
    },
    UNAUTHORIZED_ACCESS: {
        code: "UNAUTHORIZED_ACCESS",
        message: "Unauthorized access",
        statusCode: 401,
    },
    INVALID_CREDENTIALS: {
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
        statusCode: 401,
    },
    USER_ALREADY_VERIFIED: {
        code: "USER_ALREADY_VERIFIED",
        message: "User already verified",
        statusCode: 400,
    },
    USER_NOT_VERIFIED: {
        code: "USER_NOT_VERIFIED",
        message: "User not verified",
        statusCode: 403,
    },
    PASSWORD_RESET_FAILED: {
        code: "PASSWORD_RESET_FAILED",
        message: "Password reset failed",
        statusCode: 400,
    },

    // Hotel
    HOTEL_NOT_FOUND: {
        code: "HOTEL_NOT_FOUND",
        message: "Hotel not found",
        statusCode: 404,
    },

    // Review
    REVIEW_NOT_FOUND: {
        code: "REVIEW_NOT_FOUND",
        message: "Review not found",
        statusCode: 404,
    },
    BOOKED_HOTEL_BEFORE_REVIEW: {
        code: "BOOKED_HOTEL_BEFORE_REVIEW",
        message: "You must book the hotel before posting a review",
        statusCode: 403,
    },

    BOOKING_FAILED: {
        code: "BOOKING_FAILED",
        message: "Booking failed",
        statusCode: 400,
    },
    BOOKING_NOT_FOUND: {
        code: "BOOKING_NOT_FOUND",
        message: "Booking not found",
        statusCode: 404,
    },
    BOOKING_ALREADY_CANCELLED: {
        code: "BOOKING_ALREADY_CANCELLED",
        message: "Booking already cancelled",
        statusCode: 400,
    },
    BOOKING_CONFLICT: {
        code: "BOOKING_CONFLICT",
        message: "Booking conflict",
        statusCode: 409,
    },
    INVALID_BOOKING_DATES: {
        code: "INVALID_BOOKING_DATES",
        message: "Invalid booking dates",
        statusCode: 400,
    },
    EXCEEDED_GUEST_LIMIT: {
        code: "EXCEEDED_GUEST_LIMIT",
        message: "Exceeded guest limit",
        statusCode: 400,
    },
    INVALID_BOOKING_ID: {
        code: "INVALID_BOOKING_ID",
        message: "Invalid booking ID",
        statusCode: 400,
    },
    BOOKING_PAYMENT_PENDING: {
        code: "BOOKING_PAYMENT_PENDING",
        message: "Booking payment pending",
        statusCode: 402,
    },

    ROOM_NOT_FOUND: {
        code: "ROOM_NOT_FOUND",
        message: "Room not found",
        statusCode: 404,
    },
    ROOM_UNAVAILABLE: {
        code: "ROOM_UNAVAILABLE",
        message: "Room unavailable",
        statusCode: 400,
    },
    ROOM_ALREADY_BOOKED: {
        code: "ROOM_ALREADY_BOOKED",
        message: "Room already booked",
        statusCode: 409,
    },
    ROOM_TYPE_INVALID: {
        code: "ROOM_TYPE_INVALID",
        message: "Room type invalid",
        statusCode: 400,
    },
    ROOM_CAPACITY_EXCEEDED: {
        code: "ROOM_CAPACITY_EXCEEDED",
        message: "Room capacity exceeded",
        statusCode: 400,
    },

    PAYMENT_FAILED: {
        code: "PAYMENT_FAILED",
        message: "Payment failed",
        statusCode: 400,
    },
    INVALID_PAYMENT_METHOD: {
        code: "INVALID_PAYMENT_METHOD",
        message: "Invalid payment method",
        statusCode: 400,
    },
    CARD_DECLINED: {
        code: "CARD_DECLINED",
        message: "Card declined",
        statusCode: 402,
    },
    PAYMENT_TIMEOUT: {
        code: "PAYMENT_TIMEOUT",
        message: "Payment timeout",
        statusCode: 408,
    },
    REFUND_FAILED: {
        code: "REFUND_FAILED",
        message: "Refund failed",
        statusCode: 400,
    },
    INSUFFICIENT_FUNDS: {
        code: "INSUFFICIENT_FUNDS",
        message: "Insufficient funds",
        statusCode: 402,
    },

    LOCATION_NOT_FOUND: {
        code: "LOCATION_NOT_FOUND",
        message: "Location not found",
        statusCode: 404,
    },
    INVALID_DATE_RANGE: {
        code: "INVALID_DATE_RANGE",
        message: "Invalid date range",
        statusCode: 400,
    },
    NO_ROOMS_AVAILABLE: {
        code: "NO_ROOMS_AVAILABLE",
        message: "No rooms available",
        statusCode: 404,
    },

    INTERNAL_SERVER_ERROR: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
        statusCode: 500,
    },
    SERVICE_UNAVAILABLE: {
        code: "SERVICE_UNAVAILABLE",
        message: "Service unavailable",
        statusCode: 503,
    },
    REQUEST_TIMEOUT: {
        code: "REQUEST_TIMEOUT",
        message: "Request timeout",
        statusCode: 408,
    },
    RATE_LIMIT_EXCEEDED: {
        code: "RATE_LIMIT_EXCEEDED",
        message: "Rate limit exceeded",
        statusCode: 429,
    },
    UNKNOWN_ERROR: {
        code: "UNKNOWN_ERROR",
        message: "Unknown error",
        statusCode: 500,
    },
};