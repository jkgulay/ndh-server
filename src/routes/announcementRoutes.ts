import { Router } from "express";
import { getAnnouncementById, getAnnouncements } from "../controllers/announcementController";

export const announcementRoutes = Router();

announcementRoutes.get("/", getAnnouncements);
announcementRoutes.get("/:id", getAnnouncementById);
