import z from "zod";
import { str } from "../../utils/zod";

export const categorySchema = z.object({
  body: z.object({
    name: str(z.string().min(3).max(50)),
    description: z.string().min(20).max(200).optional(),
    image: z.string().optional(),
  }),
});
