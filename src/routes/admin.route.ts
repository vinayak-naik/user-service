import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import validateResource from "../middleware/validateResource";
import { createAdminSchema, getAdminByEmailSchema, updateAdminEmailSchema } from "../schema/admin.schema";

const adminRouter = Router();
const adminController = new AdminController();

adminRouter.post("/", validateResource(getAdminByEmailSchema), adminController.getAdminByEmail);

adminRouter.post("/create", validateResource(createAdminSchema), adminController.createAdmin);

adminRouter.patch("/update", validateResource(updateAdminEmailSchema), adminController.updateAdminByEmail);

export default adminRouter;
