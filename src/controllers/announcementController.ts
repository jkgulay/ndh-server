import type { NextFunction, Request, Response } from "express";
import { AnnouncementModel } from "../models/Announcement";
import type { ApiResponse } from "../types/apiResponse.types";

export async function getAnnouncements(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const announcements = await AnnouncementModel.find({ isActive: true }).sort({
      publishedAt: -1,
    });
    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    next(error);
  }
}

export async function getAnnouncementById(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const announcement = await AnnouncementModel.findOne({
      _id: req.params.id,
      isActive: true,
    });
    if (!announcement) {
      res.status(404).json({ success: false, error: "Announcement not found" });
      return;
    }
    res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
}
