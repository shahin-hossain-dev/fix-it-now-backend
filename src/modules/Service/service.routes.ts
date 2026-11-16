import { Router } from "express";
import { servicesController } from "./service.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createServiceSchema } from "./service.validation";

const serviceRouter = Router();

serviceRouter.post(
  "/create-service",
  validateRequest(createServiceSchema),
  servicesController.createService,
);

// serviceRouter.get("/all-services");

export default serviceRouter;
