import rateLimit from "express-rate-limit";

const FEEDBACK_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const FEEDBACK_RATE_LIMIT_MAX_REQUESTS = 10;

export const feedbackRateLimiter = rateLimit({
  windowMs: FEEDBACK_RATE_LIMIT_WINDOW_MS,
  max: FEEDBACK_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too much feedback submitted. Please try again later.",
  },
});
