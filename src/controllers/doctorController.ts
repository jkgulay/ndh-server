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

export async function getAllDoctorsForAdmin(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const doctors = await DoctorModel.find().sort({ name: 1 });
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

export async function createDoctor(
  req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const doctor = await DoctorModel.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
}

export async function updateDoctor(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) {
      res.status(404).json({ success: false, error: "Doctor not found" });
      return;
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
}

export async function deleteDoctor(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): Promise<void> {
  try {
    const doctor = await DoctorModel.findByIdAndDelete(req.params.id);
    if (!doctor) {
      res.status(404).json({ success: false, error: "Doctor not found" });
      return;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}

interface UploadDoctorImageResponseData {
  url: string;
}

export function uploadDoctorImage(
  req: Request,
  res: Response<ApiResponse<UploadDoctorImageResponseData>>
): void {
  if (!req.file) {
    res.status(400).json({ success: false, error: "No image file was uploaded" });
    return;
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/doctors/${req.file.filename}`;
  res.status(201).json({ success: true, data: { url } });
}
