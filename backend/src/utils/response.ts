import { Response } from "express";
import { ApiResponse } from "../types/types";

export function sendSuccess<T>(
  res: Response<ApiResponse<T>>,
  message = "OK",
  statusCode = 200,
  data?: T
) {
  const response: ApiResponse<T> = {
    success: true,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  res.status(statusCode).json(response);
}

export function sendError(
    res: Response<ApiResponse<never>>,
    message: string,
    code = "INTERNAL_ERROR",
    status = 500,
    details?: unknown,
) {
    return res.status(status).json({
        success: false,
        message,
        error: { code, ...(details ? { details } : {}) },
    });
}
