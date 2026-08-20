import { Router } from "express";
import { getServiceById, getServices } from "../controllers/serviceController";

export const serviceRoutes = Router();

serviceRoutes.get("/", getServices);
serviceRoutes.get("/:id", getServiceById);
