import { Router } from "express";
import MicroserviceController from "../controllers/microservice.controller";
import validateResource from "../middleware/validateResource";
import { createMicroserviceSchema, updateMicroserviceSchema } from "../schema/microservice.schema";
import requireAdmin from "../middleware/requireAdmin";

const microserviceRouter = Router();
const microserviceController = new MicroserviceController();

microserviceRouter.post(
  "/create",
  requireAdmin,
  validateResource(createMicroserviceSchema),
  microserviceController.createMicroservice
);

microserviceRouter.get("/", microserviceController.get);

microserviceRouter.get("/:id", microserviceController.getById);

microserviceRouter.post("/", requireAdmin, microserviceController.getMicroserviceByName);

microserviceRouter.patch("/:id", validateResource(updateMicroserviceSchema), microserviceController.updateMicroservice);

microserviceRouter.delete("/:id", microserviceController.delete);

export default microserviceRouter;
