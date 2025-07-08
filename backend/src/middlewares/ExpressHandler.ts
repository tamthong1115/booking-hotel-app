import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/ExpressError";
import { sendError } from "../utils/response";

const ExpressHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        console.error("Error stack:", err.stack);
    } else {
        console.error(err);
    }
    if (err instanceof CustomError) {
        return sendError(res, err.message, err.code, err.statusCode);
    }
    return sendError(res, "Something went wrong", "UNHANDLED_ERROR", 500, {
        message: (err as Error).message,
    });
};

export default ExpressHandler;
