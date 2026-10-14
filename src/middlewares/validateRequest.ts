import type { RequestHandler } from "express";
import type { z } from "zod";

const validateRequest = (schema: z.ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.length ? issue.path.slice(1).join(".") : "(root)",
          message: issue.message,
        })),
      });
    }

    next();
  };
};

export default validateRequest;
