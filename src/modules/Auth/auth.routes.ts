import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginSchema, registerSchema } from "./auth.validation";
import multer from "multer";
import { userController } from "../User/user.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const authRouter = Router();
const upload = multer();

authRouter.post(
  "/register",
  upload.none(),
  validateRequest(registerSchema),
  authController.createUser,
);

authRouter.post(
  "/login",
  upload.none(),
  validateRequest(loginSchema),
  authController.userLogin,
);

authRouter.get("/me", requireAuth, userController.getProfile);

export default authRouter;
