import type { NextFunction, Request, Response } from "express";
import { ContactMessageModel } from "../models/ContactMessage";
import type { ApiResponse } from "../types/apiResponse.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function getValidationError(body: Partial<ContactRequestBody>): string | null {
  if (!body.name?.trim()) return "Name is required";
  if (!body.email?.trim() || !EMAIL_PATTERN.test(body.email)) return "A valid email is required";
  if (!body.subject?.trim()) return "Subject is required";
  if (!body.message?.trim()) return "Message is required";
  return null;
}

export async function submitContactMessage(
  req: Request<Record<string, never>, ApiResponse<unknown>, Partial<ContactRequestBody>>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const validationError = getValidationError(req.body);
    if (validationError) {
      res.status(400).json({ success: false, error: validationError });
      return;
    }

    const { name, email, subject, message } = req.body as ContactRequestBody;
    const contactMessage = await ContactMessageModel.create({ name, email, subject, message });
    res.status(201).json({ success: true, data: contactMessage });
  } catch (error) {
    next(error);
  }
}
