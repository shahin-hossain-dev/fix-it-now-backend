import { Router } from "express";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", authController.createUser);

export default authRouter;
