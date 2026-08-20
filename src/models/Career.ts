import { Schema, model, type InferSchemaType } from "mongoose";

export const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract"] as const;

const careerSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: EMPLOYMENT_TYPES },
    description: { type: String, required: true },
    requirements: { type: String },
    howToApply: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    postedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Career = InferSchemaType<typeof careerSchema>;

export const CareerModel = model("Career", careerSchema);
