import { Router } from "express";
import { submitFeedback } from "../controllers/feedbackController";
import { feedbackRateLimiter } from "../middleware/feedbackRateLimiter";

export const feedbackRoutes = Router();

feedbackRoutes.post("/", feedbackRateLimiter, submitFeedback);
