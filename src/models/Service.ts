import { Schema, model, type InferSchemaType } from "mongoose";

export const SERVICE_CATEGORIES = [
  "Emergency & Trauma",
  "Outpatient/OPD",
  "Inpatient/Wards",
  "Diagnostic & Laboratory",
  "Radiology & Imaging",
  "Pharmacy",
  "Maternal & Child Health",
  "Surgical Services",
  "Specialty Clinics",
  "Rehabilitation",
] as const;

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: SERVICE_CATEGORIES },
    operatingHours: { type: String },
    imageUrl: { type: String },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export type Service = InferSchemaType<typeof serviceSchema>;

export const ServiceModel = model("Service", serviceSchema);
