import type { Request, Response } from "express";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import { cookieOptions } from "../../utils/cookieOptions";
import config from "../../config";

const createUser = async (req: Request, res: Response) => {
  const user = await authServices.createUser(req.body);

  sendResponse(res, status.CREATED, {
    success: true,
    message: "User Created Successfully",
    data: user,
  });
};

const userLogin = async (req: Request, res: Response) => {
  const user = await authServices.userLogin(req.body);

  res.cookie("accessToken", user.token, {
    ...cookieOptions,
    maxAge: config.jwtExpiresInMs,
  });

  return sendResponse(res, status.CREATED, {
    success: true,
    message: "User successfully logged in",
    data: user,
  });
};

export const authController = {
  createUser,
  userLogin,
};
