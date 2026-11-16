import type { RequestHandler } from "express";
import type { z } from "zod";

const SECTIONS = ["body", "params", "query"];

const validateRequest = (schema: z.ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => {
          const path = issue.path.filter(
            (p, i) => !(i === 0 && SECTIONS.includes(String(p))),
          );
          return {
            field: path.length ? path.join(".") : "(root)",
            message: issue.message,
          };
        }),
      });
      return;
    }

    const parsed = result.data as {
      body?: unknown;
      params?: unknown;
      query?: unknown;
    };

    if (parsed.body !== undefined) req.body = parsed.body;
    if (parsed.params !== undefined) res.locals.params = parsed.params;
    if (parsed.query !== undefined) res.locals.query = parsed.query;

    next();
  };
};

export default validateRequest;
