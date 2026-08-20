import type { NextFunction, Request, Response } from "express";
import { DoctorModel } from "../models/Doctor";
import type { ApiResponse } from "../types/apiResponse.types";

export async function getDoctors(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const doctors = await DoctorModel.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    next(error);
  }
}

export async function getDoctorById(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const doctor = await DoctorModel.findOne({ _id: req.params.id, isActive: true });
    if (!doctor) {
      res.status(404).json({ success: false, error: "Doctor not found" });
      return;
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
}
