import { CareerModel } from "../models/Career";
import { createCrudController } from "../utils/crudController";

const careerCrud = createCrudController(CareerModel, {
  sort: { postedAt: -1 },
  notFoundMessage: "Job posting not found",
});

export const getCareers = careerCrud.getActive;
export const getAllCareersForAdmin = careerCrud.getAllForAdmin;
export const getCareerById = careerCrud.getById;
export const createCareer = careerCrud.create;
export const updateCareer = careerCrud.update;
export const deleteCareer = careerCrud.remove;
