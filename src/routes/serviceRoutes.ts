import {
  createService,
  deleteService,
  getAllServicesForAdmin,
  getServiceById,
  getServices,
  updateService,
} from "../controllers/serviceController";
import { buildCrudRoutes } from "../utils/crudRoutes";

export const serviceRoutes = buildCrudRoutes({
  getActive: getServices,
  getAllForAdmin: getAllServicesForAdmin,
  getById: getServiceById,
  create: createService,
  update: updateService,
  remove: deleteService,
});
