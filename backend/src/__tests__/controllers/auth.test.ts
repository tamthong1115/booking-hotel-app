import { describe, it, expect, vi } from "vitest";
import { postLogin, postRegister } from "../../controllers/auth";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { randomUUID } from "node:crypto";
import User from "../../models/user";
import connectToDatabase from "../../utils/connectToDatabase";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { UserType } from "../../../shared/types";

let initialUserState: UserType[] = [];

vi.mock("User", () => ({
    __esModule: true,
    default: {
        findOne: vi.fn(),
        save: vi.fn(),
    },
}));

vi.mock("nodemailer", () => {
    const sendMailMock = vi.fn();
    return {
        __esModule: true, // Ensures the mock is treated as an ES module
        default: {
            createTransport: vi.fn(() => ({
                sendMail: sendMailMock,
            })),
        },
    };
});

let session: mongoose.mongo.ClientSession;
beforeAll(async () => {
    await connectToDatabase();
    initialUserState = await User.find({});
});

beforeEach(async () => {
    session = await mongoose.startSession();
    session.startTransaction();
});

afterEach(async () => {
    vi.clearAllMocks();
    await session.abortTransaction();
    await session.endSession();
});

afterAll(async () => {
    await User.deleteMany({});
    await User.insertMany(initialUserState);
    await mongoose.connection.close();
});

describe("Auth Controller", () => {
    it("should return 400 if email or password is incorrect", async () => {
        const req = {
            body: { email: "wrong@test.com", password: "wrongpassword" },
        } as Request;
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;

        await postLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Email or password is incorrect",
        });
    });

    it("register user and send email verification", async () => {
        const req = {
            body: {
                email: `test-${randomUUID()}@test.com`,
                password: "password",
                lastName: "Doe",
                firstName: "John",
            },
        } as Request;
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
            send: vi.fn(),
        } as unknown as Response;

        await postRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(nodemailer.createTransport).toHaveBeenCalled();

        expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();

        expect(res.send).toHaveBeenCalledWith({ message: "User registered OK" });
    }, 100000);

    it("should return credentials if email and password are correct", async () => {
        const user = {
            _id: new ObjectId("6758568606af36ec0859304e"),
            email: "test@test.com",
            password: "Password!1",
        };
        const req = {
            body: { email: user.email, password: user.password },
        } as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
            cookie: vi.fn(),
        } as unknown as Response;

        await postLogin(req, res);

        expect(res.cookie).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ userId: user._id });
    });
});
