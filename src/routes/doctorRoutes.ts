import { Router } from "express";
import { getDoctorById, getDoctors } from "../controllers/doctorController";

export const doctorRoutes = Router();

doctorRoutes.get("/", getDoctors);
doctorRoutes.get("/:id", getDoctorById);
