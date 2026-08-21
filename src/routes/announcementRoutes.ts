import { uploadAnnouncementImageMiddleware } from "../config/uploadStorage";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncementsForAdmin,
  getAnnouncementById,
  getAnnouncements,
  updateAnnouncement,
  uploadAnnouncementImage,
} from "../controllers/announcementController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";
import { buildCrudRoutes } from "../utils/crudRoutes";
import { wrapUploadMiddleware } from "../utils/wrapUploadMiddleware";

export const announcementRoutes = buildCrudRoutes(
  {
    getActive: getAnnouncements,
    getAllForAdmin: getAllAnnouncementsForAdmin,
    getById: getAnnouncementById,
    create: createAnnouncement,
    update: updateAnnouncement,
    remove: deleteAnnouncement,
  },
  (router) => {
    router.post(
      "/upload-image",
      requireAdminAuth,
      wrapUploadMiddleware(uploadAnnouncementImageMiddleware),
      uploadAnnouncementImage
    );
  }
);
