import { uploadServiceImageMiddleware } from "../config/uploadStorage";
import {
  createService,
  deleteService,
  getAllServicesForAdmin,
  getServiceById,
  getServices,
  updateService,
  uploadServiceImage,
} from "../controllers/serviceController";
import { requireAdminAuth } from "../middleware/requireAdminAuth";
import { buildCrudRoutes } from "../utils/crudRoutes";
import { wrapUploadMiddleware } from "../utils/wrapUploadMiddleware";

export const serviceRoutes = buildCrudRoutes(
  {
    getActive: getServices,
    getAllForAdmin: getAllServicesForAdmin,
    getById: getServiceById,
    create: createService,
    update: updateService,
    remove: deleteService,
  },
  (router) => {
    router.post("/upload-image", requireAdminAuth, wrapUploadMiddleware(uploadServiceImageMiddleware), uploadServiceImage);
  }
);
