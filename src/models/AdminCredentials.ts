import { Schema, model, type InferSchemaType } from "mongoose";

const adminCredentialsSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export type AdminCredentials = InferSchemaType<typeof adminCredentialsSchema>;

export const AdminCredentialsModel = model("AdminCredentials", adminCredentialsSchema);
