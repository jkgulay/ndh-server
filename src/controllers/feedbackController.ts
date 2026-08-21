import type { NextFunction, Request, Response } from "express";
import { FeedbackModel } from "../models/Feedback";
import type { ApiResponse } from "../types/apiResponse.types";

const MIN_RATING = 1;
const MAX_RATING = 5;
const MAX_COMMENT_LENGTH = 1000;

interface FeedbackRequestBody {
  rating: number;
  comment?: string;
}

function getValidationError(body: Partial<FeedbackRequestBody>): string | null {
  if (
    typeof body.rating !== "number" ||
    !Number.isInteger(body.rating) ||
    body.rating < MIN_RATING ||
    body.rating > MAX_RATING
  ) {
    return `Rating must be a whole number between ${MIN_RATING} and ${MAX_RATING}`;
  }
  if (body.comment && body.comment.length > MAX_COMMENT_LENGTH) {
    return `Comment must be ${MAX_COMMENT_LENGTH} characters or fewer`;
  }
  return null;
}

export async function submitFeedback(
  req: Request<Record<string, never>, ApiResponse<unknown>, Partial<FeedbackRequestBody>>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const validationError = getValidationError(req.body);
    if (validationError) {
      res.status(400).json({ success: false, error: validationError });
      return;
    }

    const { rating, comment } = req.body as FeedbackRequestBody;
    const feedback = await FeedbackModel.create({ rating, comment: comment?.trim() ?? "" });
    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    next(error);
  }
}
