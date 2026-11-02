import status from "http-status";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.services";
import type { Request, Response } from "express";

const getProfile = async (req: Request, res: Response) => {
  const { email } = req.user;
  const user = await userServices.getProfile(email as string);

  sendResponse(res, status.OK, {
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

export const userController = { getProfile };
