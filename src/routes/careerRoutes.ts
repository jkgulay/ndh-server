import {
  createCareer,
  deleteCareer,
  getAllCareersForAdmin,
  getCareerById,
  getCareers,
  updateCareer,
} from "../controllers/careerController";
import { buildCrudRoutes } from "../utils/crudRoutes";

export const careerRoutes = buildCrudRoutes({
  getActive: getCareers,
  getAllForAdmin: getAllCareersForAdmin,
  getById: getCareerById,
  create: createCareer,
  update: updateCareer,
  remove: deleteCareer,
});
