import { Router } from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncementsForAdmin,
  getAnnouncementById,
  getAnnouncements,
  updateAnnouncement,
} from "../controllers/announcementController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";

export const announcementRoutes = Router();

announcementRoutes.get("/", getAnnouncements);
announcementRoutes.get("/admin", requireAdminAuth, getAllAnnouncementsForAdmin);
announcementRoutes.get("/:id", getAnnouncementById);
announcementRoutes.post("/", requireAdminAuth, createAnnouncement);
announcementRoutes.put("/:id", requireAdminAuth, updateAnnouncement);
announcementRoutes.delete("/:id", requireAdminAuth, deleteAnnouncement);
