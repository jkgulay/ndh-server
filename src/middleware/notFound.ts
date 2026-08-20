import type { Request, Response } from "express";
import type { ApiResponse } from "../types/apiResponse.types";

export function notFound(_req: Request, res: Response<ApiResponse<never>>): void {
  res.status(404).json({ success: false, error: "Route not found" });
}
