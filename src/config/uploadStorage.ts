import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";
import type { RequestHandler } from "express";

export const UPLOADS_ROOT_DIR = path.join(__dirname, "..", "..", "uploads");

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function createImageUploadMiddleware(subdir: string): RequestHandler {
  const uploadsDir = path.join(UPLOADS_ROOT_DIR, subdir);
  fs.mkdirSync(uploadsDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, uploadsDir),
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${crypto.randomUUID()}${extension}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
    fileFilter: (_req, file, callback) => {
      if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
        callback(new Error("Only JPEG, PNG, WEBP, or GIF images are allowed"));
        return;
      }
      callback(null, true);
    },
  }).single("image");
}

export const uploadStaffImageMiddleware = createImageUploadMiddleware("staff");
export const uploadAnnouncementImageMiddleware = createImageUploadMiddleware("announcements");
export const uploadServiceImageMiddleware = createImageUploadMiddleware("services");
