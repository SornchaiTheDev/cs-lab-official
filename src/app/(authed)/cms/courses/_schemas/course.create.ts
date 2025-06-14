import { z } from "zod";

export const createCourseSchame = z.object({
  name: z.string().min(1, "Course name is required"),
  creators: z
    .array(
      z.object({
        id: z.string(),
        username: z.string(),
        displayName: z.string(),
        profileImage: z.string().or(z.null()),
      }),
    )
    .min(1, "Creator is required"),
});

export type CreateCourseSchema = z.infer<typeof createCourseSchame>;
