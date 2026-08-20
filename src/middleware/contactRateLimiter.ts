import rateLimit from "express-rate-limit";

const CONTACT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_RATE_LIMIT_MAX_REQUESTS = 5;

export const contactRateLimiter = rateLimit({
  windowMs: CONTACT_RATE_LIMIT_WINDOW_MS,
  max: CONTACT_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many messages sent. Please try again later.",
  },
});
