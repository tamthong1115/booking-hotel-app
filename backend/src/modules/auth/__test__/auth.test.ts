import { describe, it, expect, vi } from "vitest";
import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import UserModel from "../../user/user";
import connectToDatabase from "../../../utils/connectToDatabase";
import mongoose from "mongoose";
import { UserType } from "@shared/types/types";
import { ERROR_CODES } from "../../../../../shared/constants/errorCodes";
import nodemailer from "nodemailer";
import CustomError from "@utils/ExpressError";
import { postLogin, postRegister } from "../controller/auth.controller";

let initialUserState: UserType[] = [];

vi.mock("User", () => ({
    __esModule: true,
    default: {
        findOne: vi.fn(),
        save: vi.fn(),
    },
}));

vi.mock("./service/auth.service", () => ({
    __esModule: true,
    register: vi.fn(),
    login: vi.fn(),
    verifyEmail: vi.fn(),
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
    initialUserState = await UserModel.find({});
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
    await UserModel.deleteMany({});
    await UserModel.insertMany(initialUserState);
    await mongoose.connection.close();
});

it("register user and send notification verification", async () => {
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
    const next = vi.fn();

    await postRegister(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(nodemailer.createTransport).toHaveBeenCalled();

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();

    expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User registered OK",
    });
}, 100000);

describe("Auth Controller", () => {
    it("should return 404 if notification or password is incorrect", async () => {
        const req = {
            body: { email: `test-${randomUUID()}@test.com`, password: "wrongpassword" },
        } as Request;
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;
        const next = vi.fn();

        await postLogin(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(CustomError));
        const error = next.mock.calls[0][0] as CustomError;
        expect(error.statusCode).toBe(ERROR_CODES.USER_NOT_FOUND.statusCode);
        expect(error.code).toBe(ERROR_CODES.USER_NOT_FOUND.code);
        expect(error.message).toBe(ERROR_CODES.USER_NOT_FOUND.message);
    });

    it("should return credentials if notification and password are correct", async () => {
        const user = {
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
        const next = vi.fn();

        await postLogin(req, res, next);

        // expect(res.cookie).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
