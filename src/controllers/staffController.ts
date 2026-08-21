import type { Request, Response } from "express";
import { StaffModel } from "../models/Staff";
import { createCrudController } from "../utils/crudController";
import type { ApiResponse } from "../types/apiResponse.types";

const staffCrud = createCrudController(StaffModel, {
  sort: { name: 1 },
  notFoundMessage: "Staff member not found",
});

export const getStaff = staffCrud.getActive;
export const getAllStaffForAdmin = staffCrud.getAllForAdmin;
export const getStaffMemberById = staffCrud.getById;
export const createStaffMember = staffCrud.create;
export const updateStaffMember = staffCrud.update;
export const deleteStaffMember = staffCrud.remove;

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
