import { Schema, model, type InferSchemaType } from "mongoose";

const announcementSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    publishedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Announcement = InferSchemaType<typeof announcementSchema>;

export const AnnouncementModel = model("Announcement", announcementSchema);
