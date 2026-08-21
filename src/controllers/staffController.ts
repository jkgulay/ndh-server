import { StaffModel } from "../models/Staff";
import { createCrudController } from "../utils/crudController";
import { createImageUploadHandler } from "../utils/imageUploadHandler";

const staffCrud = createCrudController(StaffModel, {
  sort: { name: 1 },
  notFoundMessage: "Staff member not found",
});

export const getStaff = staffCrud.getActive;
export const getAllStaffForAdmin = staffCrud.getAllForAdmin;
export const getStaffMemberById = staffCrud.getById;
export const createStaffMember = staffCrud.create;
export const updateStaffMember = staffCrud.update;
export const deleteStaffMember = staffCrud.remove;

export const uploadStaffImage = createImageUploadHandler("staff");
