import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { AdminCredentialsModel } from "../models/AdminCredentials";
import type { ApiResponse } from "../types/apiResponse.types";

const TOKEN_EXPIRY = "12h";
const PASSWORD_SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;

interface ActiveCredentials {
  username: string;
  passwordHash: string;
}

async function getActiveCredentials(): Promise<ActiveCredentials> {
  const stored = await AdminCredentialsModel.findOne();
  if (stored) {
    return { username: stored.username, passwordHash: stored.passwordHash };
  }

  const envUsername = process.env.ADMIN_USERNAME;
  const envPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!envUsername || !envPasswordHash) {
    throw new Error("Admin auth environment variables are not configured");
  }
  return { username: envUsername, passwordHash: envPasswordHash };
}

interface LoginRequestBody {
  username: string;
  password: string;
}

interface LoginResponseData {
  token: string;
}

export async function login(
  req: Request<Record<string, never>, ApiResponse<LoginResponseData>, Partial<LoginRequestBody>>,
  res: Response<ApiResponse<LoginResponseData>>,
  next: NextFunction
): Promise<void> {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET is not set");

    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ success: false, error: "Username and password are required" });
      return;
    }

    const active = await getActiveCredentials();
    const isUsernameValid = username === active.username;
    const isPasswordValid = await bcrypt.compare(password, active.passwordHash);
    if (!isUsernameValid || !isPasswordValid) {
      res.status(401).json({ success: false, error: "Invalid username or password" });
      return;
    }

    const token = jwt.sign({ sub: active.username }, jwtSecret, { expiresIn: TOKEN_EXPIRY });
    res.status(200).json({ success: true, data: { token } });
  } catch (error) {
    next(error);
  }
}

interface ProfileResponseData {
  username: string;
}

export async function getAdminProfile(
  _req: Request,
  res: Response<ApiResponse<ProfileResponseData>>,
  next: NextFunction
): Promise<void> {
  try {
    const active = await getActiveCredentials();
    res.status(200).json({ success: true, data: { username: active.username } });
  } catch (error) {
    next(error);
  }
}

interface ChangeCredentialsRequestBody {
  currentPassword: string;
  newUsername: string;
  newPassword?: string;
}

export async function changeCredentials(
  req: Request<Record<string, never>, ApiResponse<never>, Partial<ChangeCredentialsRequestBody>>,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): Promise<void> {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;
    if (!currentPassword || !newUsername?.trim()) {
      res.status(400).json({ success: false, error: "Current password and username are required" });
      return;
    }
    if (newPassword && newPassword.length < MIN_PASSWORD_LENGTH) {
      res.status(400).json({
        success: false,
        error: `New password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
      });
      return;
    }

    const active = await getActiveCredentials();
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, active.passwordHash);
    if (!isCurrentPasswordValid) {
      res.status(401).json({ success: false, error: "Current password is incorrect" });
      return;
    }

    const passwordHash = newPassword
      ? await bcrypt.hash(newPassword, PASSWORD_SALT_ROUNDS)
      : active.passwordHash;

    await AdminCredentialsModel.findOneAndUpdate(
      {},
      { username: newUsername.trim(), passwordHash },
      { upsert: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}
