import type { RequestHandler } from "express";

import status from "http-status";
import sendResponse from "../utils/sendResponse";
import jwt from "jsonwebtoken";
import config from "../config";
import type { JwtPayload } from "../modules/Auth/auth.interface";
import type { UserRole } from "../generated/prisma/enums";

export const authMiddleware: RequestHandler = (req, res, next) => {
  next();
};

export const requireAuth: RequestHandler = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    sendResponse(res, status.UNAUTHORIZED, {
      success: false,
      message: "UNAUTHENTICATED! Authentication required",
      data: null,
    });
  }

  try {
    const user = jwt.verify(token, config.jwtSecret as string);

    req.user = user as JwtPayload;

    next();
  } catch (err) {
    const expired = err instanceof jwt.TokenExpiredError;
    return sendResponse(res, status.UNAUTHORIZED, {
      message: expired ? "TOKEN EXPIRED" : "INVALID TOKEN",
      success: false,
      data: null,
    });
  }
};

export const requireRole =
  (...roles: UserRole[]): RequestHandler =>
  (req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        error: "UNAUTHENTICATED",
        message: "Authentication required",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        error: "FORBIDDEN",
        message: "You do not have permission to perform this action",
      });
      return;
    }

    next();
  };
