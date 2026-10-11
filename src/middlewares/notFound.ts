import type { NextFunction, Request, Response } from "express";
import status from "http-status";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: `Routes Not Found: ${req.originalUrl}`,
  });
};

export default notFoundRoute;
