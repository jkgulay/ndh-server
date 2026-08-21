import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";

export const UPLOADS_ROOT_DIR = path.join(__dirname, "..", "..", "uploads");
export const STAFF_UPLOADS_DIR = path.join(UPLOADS_ROOT_DIR, "staff");

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

fs.mkdirSync(STAFF_UPLOADS_DIR, { recursive: true });

const staffImageStorage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, STAFF_UPLOADS_DIR),
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

export const uploadStaffImageMiddleware = multer({
  storage: staffImageStorage,
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.mimetype)) {
      callback(new Error("Only JPEG, PNG, WEBP, or GIF images are allowed"));
      return;
    }
    callback(null, true);
  },
}).single("image");
