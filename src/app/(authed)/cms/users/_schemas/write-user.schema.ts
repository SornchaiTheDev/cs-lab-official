import { z } from "zod";

export const writeUserSchema = z
  .object({
    username: z.string().min(1, { message: "username cannot be empty" }),
    password: z.string(),
    display_name: z
      .string()
      .min(1, { message: "display name cannot be empty" }),
    email: z.string().email().optional(),
    type: z.enum(["credential", "oauth"], {
      message: "user must has a type",
    }),
    roles: z
      .array(z.enum(["admin", "teacher", "student"]))
      .min(1, { message: "user must has at least one role" }),
  })
  .refine(
    (data) => (data.type === "credential" ? data.email === undefined : true),
    {
      path: ["email"],
    },
  )
  .refine(
    (data) => (data.type === "credential" ? data.password.length >= 8 : true),
    {
      path: ["password"],
      message: "password must has at least 8 characters",
    },
  );

export type WriteUserSchema = z.infer<typeof writeUserSchema>;
