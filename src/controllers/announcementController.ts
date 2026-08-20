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

export async function getAllAnnouncementsForAdmin(
  _req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const announcements = await AnnouncementModel.find().sort({ publishedAt: -1 });
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

export async function createAnnouncement(
  req: Request,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const announcement = await AnnouncementModel.create(req.body);
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
}

export async function updateAnnouncement(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<unknown>>,
  next: NextFunction
): Promise<void> {
  try {
    const announcement = await AnnouncementModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
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

export async function deleteAnnouncement(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<never>>,
  next: NextFunction
): Promise<void> {
  try {
    const announcement = await AnnouncementModel.findByIdAndDelete(req.params.id);
    if (!announcement) {
      res.status(404).json({ success: false, error: "Announcement not found" });
      return;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
}
