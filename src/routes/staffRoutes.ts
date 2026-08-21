import { Router } from "express";
import { uploadStaffImageMiddleware } from "../config/uploadStorage";
import {
  createStaffMember,
  deleteStaffMember,
  getAllStaffForAdmin,
  getStaff,
  getStaffMemberById,
  updateStaffMember,
  uploadStaffImage,
} from "../controllers/staffController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";

export const staffRoutes = Router();

staffRoutes.get("/", getStaff);
staffRoutes.get("/admin", requireAdminAuth, getAllStaffForAdmin);
staffRoutes.get("/:id", getStaffMemberById);
staffRoutes.post("/", requireAdminAuth, createStaffMember);
staffRoutes.post(
  "/upload-image",
  requireAdminAuth,
  (req, res, next) => {
    uploadStaffImageMiddleware(req, res, (error: unknown) => {
      if (error) {
        const message = error instanceof Error ? error.message : "Unable to upload image";
        res.status(400).json({ success: false, error: message });
        return;
      }
      next();
    });
  },
  uploadStaffImage
);
staffRoutes.put("/:id", requireAdminAuth, updateStaffMember);
staffRoutes.delete("/:id", requireAdminAuth, deleteStaffMember);
