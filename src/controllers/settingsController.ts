import type { NextFunction, Request, Response } from "express";
import { HospitalInfoModel } from "../models/HospitalInfo";
import type { ApiResponse } from "../types/apiResponse.types";

export async function getHospitalInfo(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const hospitalInfo = await HospitalInfoModel.findOne();
    if (!hospitalInfo) {
      res.status(404).json({ success: false, error: "Hospital information not configured" });
      return;
    }
    res.status(200).json({ success: true, data: hospitalInfo });
  } catch (error) {
    next(error);
  }
}
