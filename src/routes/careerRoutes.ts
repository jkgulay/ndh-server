import { Router } from "express";
import {
  createCareer,
  deleteCareer,
  getAllCareersForAdmin,
  getCareerById,
  getCareers,
  updateCareer,
} from "../controllers/careerController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";

export const careerRoutes = Router();

careerRoutes.get("/", getCareers);
careerRoutes.get("/admin", requireAdminAuth, getAllCareersForAdmin);
careerRoutes.get("/:id", getCareerById);
careerRoutes.post("/", requireAdminAuth, createCareer);
careerRoutes.put("/:id", requireAdminAuth, updateCareer);
careerRoutes.delete("/:id", requireAdminAuth, deleteCareer);
