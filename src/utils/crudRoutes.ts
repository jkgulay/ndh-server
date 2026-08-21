import { Router } from "express";
import { requireAdminAuth } from "../middleware/requireAdminAuth";
import type { CrudController } from "./crudController";

/**
 * Every resource route file wires the same six endpoints onto its CRUD controller in the same
 * order. `configureExtra` lets a resource (e.g. staff) bolt on one-off routes like image upload.
 */
export function buildCrudRoutes(controller: CrudController, configureExtra?: (router: Router) => void): Router {
  const router = Router();
  router.get("/", controller.getActive);
  router.get("/admin", requireAdminAuth, controller.getAllForAdmin);
  router.get("/:id", controller.getById);
  router.post("/", requireAdminAuth, controller.create);
  router.put("/:id", requireAdminAuth, controller.update);
  router.delete("/:id", requireAdminAuth, controller.remove);
  configureExtra?.(router);
  return router;
}
