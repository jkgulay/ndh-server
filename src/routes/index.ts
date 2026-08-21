import { Router } from "express";
import { announcementRoutes } from "./announcementRoutes";
import { authRoutes } from "./authRoutes";
import { careerRoutes } from "./careerRoutes";
import { contactRoutes } from "./contactRoutes";
import { feedbackRoutes } from "./feedbackRoutes";
import { serviceRoutes } from "./serviceRoutes";
import { settingsRoutes } from "./settingsRoutes";
import { staffRoutes } from "./staffRoutes";

export const apiRouter = Router();

apiRouter.use("/announcements", announcementRoutes);
apiRouter.use("/staff", staffRoutes);
apiRouter.use("/services", serviceRoutes);
apiRouter.use("/careers", careerRoutes);
apiRouter.use("/contact", contactRoutes);
apiRouter.use("/feedback", feedbackRoutes);
apiRouter.use("/settings", settingsRoutes);
apiRouter.use("/admin", authRoutes);
