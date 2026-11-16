import { z } from "zod";

const clean = (v: unknown) =>
  typeof v === "string" ? v.trim().replace(/\s+/g, " ") || undefined : v;

/** trim + collapse spaces + "" → undefined */
export const str = (schema: z.ZodString) => z.preprocess(clean, schema);

/** উপরেরটাই, কিন্তু optional */
export const optStr = (schema: z.ZodString) =>
  z.preprocess(clean, schema.optional());
