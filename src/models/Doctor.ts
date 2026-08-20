import { Schema, model, type InferSchemaType } from "mongoose";

const doctorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    schedule: { type: String, required: true },
    imageUrl: { type: String },
    bio: { type: String },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Doctor = InferSchemaType<typeof doctorSchema>;

export const DoctorModel = model("Doctor", doctorSchema);
