import { Router } from "express";
import { changeCredentials, getAdminProfile, login } from "../controllers/authController";
import { loginRateLimiter } from "../middleware/loginRateLimiter";
import { requireAdminAuth } from "../middleware/requireAdminAuth";

export const authRoutes = Router();

authRoutes.post("/login", loginRateLimiter, login);
authRoutes.get("/me", requireAdminAuth, getAdminProfile);
authRoutes.put("/credentials", requireAdminAuth, changeCredentials);
