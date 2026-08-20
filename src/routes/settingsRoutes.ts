import { Router } from "express";
import { getHospitalInfo } from "../controllers/settingsController";

export const settingsRoutes = Router();

settingsRoutes.get("/", getHospitalInfo);
