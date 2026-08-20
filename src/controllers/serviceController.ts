import type { NextFunction, Request, Response } from "express";
import { ServiceModel } from "../models/Service";
import type { ApiResponse } from "../types/apiResponse.types";

export async function getServices(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const services = await ServiceModel.find({ isActive: true }).sort({ category: 1, name: 1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
}

export async function getServiceById(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const service = await ServiceModel.findOne({ _id: req.params.id, isActive: true });
    if (!service) {
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}
