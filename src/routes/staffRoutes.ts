import { uploadStaffImageMiddleware } from "../config/uploadStorage";
import {
  createStaffMember,
  deleteStaffMember,
  getAllStaffForAdmin,
  getStaff,
  getStaffMemberById,
  updateStaffMember,
  uploadStaffImage,
} from "../controllers/staffController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";
import { buildCrudRoutes } from "../utils/crudRoutes";

export const staffRoutes = buildCrudRoutes(
  {
    getActive: getStaff,
    getAllForAdmin: getAllStaffForAdmin,
    getById: getStaffMemberById,
    create: createStaffMember,
    update: updateStaffMember,
    remove: deleteStaffMember,
  },
  (router) => {
    router.post(
      "/upload-image",
      requireAdminAuth,
      (req, res, next) => {
        uploadStaffImageMiddleware(req, res, (error: unknown) => {
          if (error) {
            const message = error instanceof Error ? error.message : "Unable to upload image";
            res.status(400).json({ success: false, error: message });
            return;
          }
          next();
        });
      },
      uploadStaffImage
    );
  }
);
