import { Schema, model, type InferSchemaType } from "mongoose";

const MIN_RATING = 1;
const MAX_RATING = 5;

const feedbackSchema = new Schema(
  {
    rating: { type: Number, required: true, min: MIN_RATING, max: MAX_RATING },
    comment: { type: String, trim: true, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Feedback = InferSchemaType<typeof feedbackSchema>;

export const FeedbackModel = model("Feedback", feedbackSchema);
