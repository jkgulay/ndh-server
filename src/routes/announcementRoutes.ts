import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncementsForAdmin,
  getAnnouncementById,
  getAnnouncements,
  updateAnnouncement,
} from "../controllers/announcementController";
import { buildCrudRoutes } from "../utils/crudRoutes";

export const announcementRoutes = buildCrudRoutes({
  getActive: getAnnouncements,
  getAllForAdmin: getAllAnnouncementsForAdmin,
  getById: getAnnouncementById,
  create: createAnnouncement,
  update: updateAnnouncement,
  remove: deleteAnnouncement,
});
