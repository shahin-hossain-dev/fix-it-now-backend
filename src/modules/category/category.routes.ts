import { Router } from "express";
import { categoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categorySchema } from "./category.validation";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware";

const categoryRouter = Router();

categoryRouter.post(
  "/create-category",
  validateRequest(categorySchema),
  requireAuth,
  requireRole("ADMIN"),
  categoryController.createCategory,
);
categoryRouter.get("/all-category", categoryController.getCategories);
categoryRouter.get("/:id", categoryController.getCategoryById);

export default categoryRouter;
