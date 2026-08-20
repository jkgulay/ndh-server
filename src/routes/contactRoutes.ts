import { Router } from "express";
import { submitContactMessage } from "../controllers/contactController";
import { contactRateLimiter } from "../middleware/contactRateLimiter";

export const contactRoutes = Router();

contactRoutes.post("/", contactRateLimiter, submitContactMessage);
