import { z } from "zod";

export const addGroupSchema = z.object({
  name: z.string(),
});
