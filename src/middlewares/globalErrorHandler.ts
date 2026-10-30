import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";
import AppError from "../errors/AppError";

interface TErrorSource {
  path: string;
  message: string;
}

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.log(err);

  let statusCode = 500; // internal server error
  let message = "Something went wrong";
  let errorSources: TErrorSource[] = [];

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Zod validation error
  if (err instanceof ZodError) {
    statusCode = 400; // bad request
    message = "Validation error";
    errorSources = err.issues.map((issue) => ({
      path: issue.path.map(String).join("."),
      message: issue.message,
    }));
  }

  // Prisma: ভুল বা missing data (যেমন undefined দেওয়া)
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400; // bad request
    message = "Invalid or missing data in request";
  }

  // Prisma: পরিচিত database error
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409; //conflict
      const fields = (err.meta?.target as string[])?.join(", ");
      message = `${fields} already exists`;
    } else if (err.code === "P2025") {
      statusCode = 404; //not found
      message = "Record not found";
    } else if (err.code === "P2003") {
      statusCode = 400; // bad request
      message = "Related record does not exist";
    }
  }

  // Database connection error
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    message = "Database connection failed";
  }

  // নিজের  error (throw new Error("..."))
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: errorSources,

    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default globalErrorHandler;
