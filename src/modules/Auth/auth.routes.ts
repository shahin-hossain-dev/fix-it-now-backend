import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { registerSchema } from "./auth.validation";
import multer from "multer";

const authRouter = Router();
const upload = multer();

authRouter.post(
  "/register",
  upload.none(),
  (req, res, next) => {
    console.log("After multer:", req.body);
    next();
  },
  validateRequest(registerSchema),
  authController.createUser,
);

export default authRouter;
