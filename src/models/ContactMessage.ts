import { Schema, model, type InferSchemaType } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type ContactMessage = InferSchemaType<typeof contactMessageSchema>;

export const ContactMessageModel = model("ContactMessage", contactMessageSchema);
