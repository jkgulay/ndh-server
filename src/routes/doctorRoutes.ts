import { Router } from "express";
import { uploadDoctorImageMiddleware } from "../config/uploadStorage";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctorsForAdmin,
  getDoctorById,
  getDoctors,
  updateDoctor,
  uploadDoctorImage,
} from "../controllers/doctorController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";

export const doctorRoutes = Router();

doctorRoutes.get("/", getDoctors);
doctorRoutes.get("/admin", requireAdminAuth, getAllDoctorsForAdmin);
doctorRoutes.get("/:id", getDoctorById);
doctorRoutes.post("/", requireAdminAuth, createDoctor);
doctorRoutes.post(
  "/upload-image",
  requireAdminAuth,
  (req, res, next) => {
    uploadDoctorImageMiddleware(req, res, (error: unknown) => {
      if (error) {
        const message = error instanceof Error ? error.message : "Unable to upload image";
        res.status(400).json({ success: false, error: message });
        return;
      }
      next();
    });
  },
  uploadDoctorImage
);
doctorRoutes.put("/:id", requireAdminAuth, updateDoctor);
doctorRoutes.delete("/:id", requireAdminAuth, deleteDoctor);
