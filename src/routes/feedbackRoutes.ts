import { Router } from "express";
import { deleteFeedback, getAllFeedbackForAdmin, submitFeedback } from "../controllers/feedbackController";
import { feedbackRateLimiter } from "../middleware/feedbackRateLimiter";
import { requireAdminAuth } from "../middleware/requireAdminAuth";

export const feedbackRoutes = Router();

feedbackRoutes.post("/", feedbackRateLimiter, submitFeedback);
feedbackRoutes.get("/admin", requireAdminAuth, getAllFeedbackForAdmin);
feedbackRoutes.delete("/:id", requireAdminAuth, deleteFeedback);
