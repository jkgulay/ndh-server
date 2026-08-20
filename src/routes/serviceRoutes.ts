import { Router } from "express";
import {
  createService,
  deleteService,
  getAllServicesForAdmin,
  getServiceById,
  getServices,
  updateService,
} from "../controllers/serviceController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";

export const serviceRoutes = Router();

serviceRoutes.get("/", getServices);
serviceRoutes.get("/admin", requireAdminAuth, getAllServicesForAdmin);
serviceRoutes.get("/:id", getServiceById);
serviceRoutes.post("/", requireAdminAuth, createService);
serviceRoutes.put("/:id", requireAdminAuth, updateService);
serviceRoutes.delete("/:id", requireAdminAuth, deleteService);
