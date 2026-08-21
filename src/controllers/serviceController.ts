import { ServiceModel } from "../models/Service";
import { createCrudController } from "../utils/crudController";
import { createImageUploadHandler } from "../utils/imageUploadHandler";

const serviceCrud = createCrudController(ServiceModel, {
  sort: { category: 1, name: 1 },
  notFoundMessage: "Service not found",
});

export const getServices = serviceCrud.getActive;
export const getAllServicesForAdmin = serviceCrud.getAllForAdmin;
export const getServiceById = serviceCrud.getById;
export const createService = serviceCrud.create;
export const updateService = serviceCrud.update;
export const deleteService = serviceCrud.remove;

export const uploadServiceImage = createImageUploadHandler("services");
