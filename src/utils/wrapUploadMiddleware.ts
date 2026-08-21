import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Multer reports validation failures (bad mime type, file too large) via an error callback
 * rather than throwing, so every upload route needs this same translation into a JSON 400.
 */
export function wrapUploadMiddleware(multerMiddleware: RequestHandler): RequestHandler {
  return function handleUpload(req: Request, res: Response, next: NextFunction): void {
    multerMiddleware(req, res, (error: unknown) => {
      if (error) {
        const message = error instanceof Error ? error.message : "Unable to upload image";
        res.status(400).json({ success: false, error: message });
        return;
      }
      next();
    });
  };
}
