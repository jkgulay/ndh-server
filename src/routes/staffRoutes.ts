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
import { wrapUploadMiddleware } from "../utils/wrapUploadMiddleware";

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
      wrapUploadMiddleware(uploadStaffImageMiddleware),
      uploadStaffImage
    );
  }
);
