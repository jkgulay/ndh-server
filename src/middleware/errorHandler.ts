import type { NextFunction, Request, Response } from "express";
import type { ApiResponse } from "../types/apiResponse.types";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response<ApiResponse<never>>,
  _next: NextFunction
): void {
  console.error(error);
  res.status(500).json({ success: false, error: "Internal server error" });
}
