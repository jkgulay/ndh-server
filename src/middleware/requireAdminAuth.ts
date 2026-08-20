import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { ApiResponse } from "../types/apiResponse.types";

const BEARER_PREFIX = "Bearer ";

export function requireAdminAuth(
  req: Request,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): void {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("JWT_SECRET is not set");

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith(BEARER_PREFIX)) {
    res.status(401).json({ success: false, error: "Authentication required" });
    return;
  }

  const token = authHeader.slice(BEARER_PREFIX.length);
  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ success: false, error: "Invalid or expired session. Please log in again." });
  }
}
