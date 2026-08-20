import { Router } from "express";
import { announcementRoutes } from "./announcementRoutes";
import { careerRoutes } from "./careerRoutes";
import { contactRoutes } from "./contactRoutes";
import { doctorRoutes } from "./doctorRoutes";
import { serviceRoutes } from "./serviceRoutes";
import { settingsRoutes } from "./settingsRoutes";

export const apiRouter = Router();

apiRouter.use("/announcements", announcementRoutes);
apiRouter.use("/doctors", doctorRoutes);
apiRouter.use("/services", serviceRoutes);
apiRouter.use("/careers", careerRoutes);
apiRouter.use("/contact", contactRoutes);
apiRouter.use("/settings", settingsRoutes);
