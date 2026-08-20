import { Router } from "express";
import { getHospitalInfo, updateHospitalInfo } from "../controllers/settingsController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";

export const settingsRoutes = Router();

settingsRoutes.get("/", getHospitalInfo);
settingsRoutes.put("/", requireAdminAuth, updateHospitalInfo);
