import type { NextFunction, Request, Response } from "express";
import { StaffModel } from "../models/Staff";
import type { ApiResponse } from "../types/apiResponse.types";

export async function getStaff(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const staff = await StaffModel.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
}

export async function getAllStaffForAdmin(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const staff = await StaffModel.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
}

export async function getStaffMemberById(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const staffMember = await StaffModel.findOne({ _id: req.params.id, isActive: true });
    if (!staffMember) {
      res.status(404).json({ success: false, error: "Staff member not found" });
      return;
    }
    res.status(200).json({ success: true, data: staffMember });
  } catch (error) {
    next(error);
  }
}

export async function createStaffMember(
  req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const staffMember = await StaffModel.create(req.body);
    res.status(201).json({ success: true, data: staffMember });
  } catch (error) {
    next(error);
  }
}

export async function updateStaffMember(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const staffMember = await StaffModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!staffMember) {
      res.status(404).json({ success: false, error: "Staff member not found" });
      return;
    }
    res.status(200).json({ success: true, data: staffMember });
  } catch (error) {
    next(error);
  }
}

export async function deleteStaffMember(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): Promise<void> {
  try {
    const staffMember = await StaffModel.findByIdAndDelete(req.params.id);
    if (!staffMember) {
      res.status(404).json({ success: false, error: "Staff member not found" });
      return;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}

interface UploadStaffImageResponseData {
  url: string;
}

export function uploadStaffImage(
  req: Request,
  res: Response<ApiResponse<UploadStaffImageResponseData>>
): void {
  if (!req.file) {
    res.status(400).json({ success: false, error: "No image file was uploaded" });
    return;
  }
  const url = `${req.protocol}://${req.get("host")}/uploads/staff/${req.file.filename}`;
  res.status(201).json({ success: true, data: { url } });
}
