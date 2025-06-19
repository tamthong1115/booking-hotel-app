import { describe, it, expect, vi } from "vitest";
import Hotel from "../../modules/hotel/hotel";
import UserModel from "@modules/user/user";
import connectToDatabase from "../../utils/connectToDatabase";
import mongoose from "mongoose";
import { createTestUser, deleteTestUser, userTemplates } from "./testUserData";

vi.mock("User", () => ({
    __esModule: true,
    default: {
        findOne: vi.fn(),
        save: vi.fn(),
    },
}));

vi.mock("Hotel", () => ({
    __esModule: true,
    default: {
        findOne: vi.fn(),
        save: vi.fn(),
    },
}));

beforeAll(async () => {
    await connectToDatabase();
    await createTestUser("admin");
});

afterEach(async () => {});

afterAll(async () => {
    await deleteTestUser("admin");
    await Hotel.deleteMany({ name: "Test Hotel" });
    await mongoose.connection.close();
});

describe("Hotel Controller", () => {
    it("should create and save a hotel", async () => {
        const user = await UserModel.findOne({ email: userTemplates.admin.email });
        if (!user) {
            throw new Error("Test user not found");
        }

        const hotelData = {
            userId: user._id,
            name: "Test Hotel",
            city: "Test City",
            country: "Test Country",
            location: {
                type: "Point",
                coordinates: [105.85, 21.03],
            },
            description: "A test hotel description",
            type: "Budget",
            adultCount: 2,
            childCount: 1,
            facilities: ["Free WiFi", "Parking"],
            starRating: 3,
            imagePublicIds: ["img1", "img2"],
            imageUrls: ["http://example.com/img1.jpg", "http://example.com/img2.jpg"],
            lastUpdated: new Date(),
            bookings: [],
            reviews: [],
            rooms: [],
        };

        const hotel = new Hotel(hotelData);
        const savedHotel = await hotel.save();

        expect(savedHotel._id).toBeDefined();
        expect(savedHotel.name).toBe(hotelData.name);
        expect(savedHotel.city).toBe(hotelData.city);
        expect(savedHotel.country).toBe(hotelData.country);
    }, 30000); // 30 seconds timeout for this test

    it("should throw validation error if required fields are missing", async () => {
        const hotel = new Hotel({}); // missing required fields
        let error;
        try {
            await hotel.save();
        } catch (err: any) {
            error = err;
        }
        expect(error).toBeDefined();
        expect(error.name).toBe("ValidationError");
    });
});
