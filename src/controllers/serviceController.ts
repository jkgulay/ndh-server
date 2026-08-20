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

export async function getAllServicesForAdmin(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const services = await ServiceModel.find().sort({ category: 1, name: 1 });
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

export async function createService(
  req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const service = await ServiceModel.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

export async function updateService(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const service = await ServiceModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
}

export async function deleteService(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): Promise<void> {
  try {
    const service = await ServiceModel.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}
