import type { Request, Response } from "express";
import type { ApiResponse } from "../types/apiResponse.types";

interface UploadImageResponseData {
  url: string;
}

/**
 * Every uploaded-image endpoint (staff photos, announcement images) does the same thing once
 * multer has attached `req.file`: build a public URL under /uploads/<subdir>/<filename> and
 * return it. This factory is that shape.
 */
export function createImageUploadHandler(subdir: string) {
  return function handleImageUpload(req: Request, res: Response<ApiResponse<UploadImageResponseData>>): void {
    if (!req.file) {
      res.status(400).json({ success: false, error: "No image file was uploaded" });
      return;
    }
    const url = `${req.protocol}://${req.get("host")}/uploads/${subdir}/${req.file.filename}`;
    res.status(201).json({ success: true, data: { url } });
  };
}
