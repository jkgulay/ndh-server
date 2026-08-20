import type { NextFunction, Request, Response } from "express";
import { CareerModel } from "../models/Career";
import type { ApiResponse } from "../types/apiResponse.types";

export async function getCareers(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const careers = await CareerModel.find({ isActive: true }).sort({ postedAt: -1 });
    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    next(error);
  }
}

export async function getAllCareersForAdmin(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const careers = await CareerModel.find().sort({ postedAt: -1 });
    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    next(error);
  }
}

export async function getCareerById(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const career = await CareerModel.findOne({ _id: req.params.id, isActive: true });
    if (!career) {
      res.status(404).json({ success: false, error: "Job posting not found" });
      return;
    }
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
}

export async function createCareer(
  req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const career = await CareerModel.create(req.body);
    res.status(201).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
}

export async function updateCareer(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const career = await CareerModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!career) {
      res.status(404).json({ success: false, error: "Job posting not found" });
      return;
    }
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
}

export async function deleteCareer(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): Promise<void> {
  try {
    const career = await CareerModel.findByIdAndDelete(req.params.id);
    if (!career) {
      res.status(404).json({ success: false, error: "Job posting not found" });
      return;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}
