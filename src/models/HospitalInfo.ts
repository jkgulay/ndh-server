import { Schema, model, type InferSchemaType } from "mongoose";

const hospitalInfoSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    emergencyHotline: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    hours: { type: String, required: true },
    foundedYear: { type: Number, required: true },
    bedCount: { type: Number, required: true },
    departmentCount: { type: Number, required: true },
    accreditations: { type: [String], required: true, default: [] },
    facebookUrl: { type: String },
    googleMapsEmbedUrl: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export type HospitalInfo = InferSchemaType<typeof hospitalInfoSchema>;

export const HospitalInfoModel = model("HospitalInfo", hospitalInfoSchema);
