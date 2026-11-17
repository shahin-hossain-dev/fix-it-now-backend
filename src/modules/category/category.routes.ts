import { Router } from "express";
import { categoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categorySchema } from "./category.validation";

const categoryRouter = Router();

categoryRouter.post(
  "/create-category",
  validateRequest(categorySchema),
  categoryController.createCategory,
);

export default categoryRouter;
