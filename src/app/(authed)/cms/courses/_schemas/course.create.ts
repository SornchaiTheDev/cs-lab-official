import { z } from "zod";

export const createCourseSchame = z
  .object({
    name: z.string().min(1, "Course name is required"),
    creators: z
      .array(
        z.object({
          id: z.string(),
          username: z.string(),
          display_name: z.string(),
          profile_image: z.string().or(z.null()),
        }),
      )
      .min(1, "Creator is required"),
    type: z.enum(["public", "internal", "private"]).default("public"),
    user_groups: z.array(z.object({ name: z.string(), id: z.string() })),
  })
  .refine(
    ({ type, user_groups }) => {
      if (type === "internal" && (!user_groups || user_groups.length === 0)) {
        return false;
      }
      return true;
    },
    {
      path: ["user_groups"],
      message: "User groups are required for internal courses",
    },
  );

export type CreateCourseSchema = z.infer<typeof createCourseSchame>;
