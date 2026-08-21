import { Schema, model, type InferSchemaType } from "mongoose";

const staffSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    schedule: { type: String, required: true },
    imageUrl: { type: String },
    bio: { type: String },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Staff = InferSchemaType<typeof staffSchema>;

export const StaffModel = model("Staff", staffSchema, "staff");
