import type { Request, Response } from "express";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const createUser = async (req: Request, res: Response) => {
  const user = await authServices.createUser(req.body);

  sendResponse(res, status.CREATED, {
    success: true,
    message: "User Created Successfully",
    data: user,
  });
};

export const authController = {
  createUser,
};
