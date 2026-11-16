// src/modules/services/service.schema.ts
import { z } from "zod";
import { optStr, str } from "../../utils/zod";

// ── create ──────────────────────────────────────────────

export const createServiceSchema = z.object({
  body: z
    .object({
      categoryId: z.number().int().positive(),
      title: str(z.string().min(3).max(120)),
      description: optStr(z.string().min(10).max(2000)),
      price: z.number().positive().max(1_000_000).multipleOf(0.01),
      coverage: optStr(z.string().min(2).max(200)),
      warranty: optStr(z.string().max(200)),
      durationMinutes: z
        .number()
        .int()
        .min(15)
        .max(1440)
        .multipleOf(15)
        .optional(),
    })
    .strict(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

// ── update ──────────────────────────────────────────────
export const updateServiceSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
  body: z.object({/* ... */}).partial().strict(),
});
