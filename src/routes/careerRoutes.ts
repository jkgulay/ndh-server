import { Router } from "express";
import { getCareerById, getCareers } from "../controllers/careerController";

export const careerRoutes = Router();

careerRoutes.get("/", getCareers);
careerRoutes.get("/:id", getCareerById);
