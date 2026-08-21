import { AnnouncementModel } from "../models/Announcement";
import { createCrudController } from "../utils/crudController";

const announcementCrud = createCrudController(AnnouncementModel, {
  sort: { publishedAt: -1 },
  notFoundMessage: "Announcement not found",
});

export const getAnnouncements = announcementCrud.getActive;
export const getAllAnnouncementsForAdmin = announcementCrud.getAllForAdmin;
export const getAnnouncementById = announcementCrud.getById;
export const createAnnouncement = announcementCrud.create;
export const updateAnnouncement = announcementCrud.update;
export const deleteAnnouncement = announcementCrud.remove;
