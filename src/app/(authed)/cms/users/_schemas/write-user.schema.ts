import { z } from "zod";

export const addUserSchema = z
  .object({
    username: z.string().min(1, { message: "username cannot be empty" }),
    password: z.string(),
    display_name: z
      .string()
      .min(1, { message: "display name cannot be empty" }),
    email: z.string().optional(),
    type: z.enum(["credential", "oauth"], {
      message: "user must has a type",
    }),
    roles: z
      .array(z.enum(["admin", "instructor", "student"]))
      .min(1, { message: "user must has at least one role" }),
  })
  .refine(
    (data) => {
      if (data.type === "credential") {
        return true;
      }

      return isEmail.safeParse(data.email).success;
    },
    {
      path: ["email"],
      message: "email cannot be empty",
    },
  )
  .refine(
    (data) => (data.type === "credential" ? data.password.length >= 8 : true),
    {
      path: ["password"],
      message: "password must has at least 8 characters",
    },
  );

export type AddUserSchema = z.infer<typeof addUserSchema>;

const isEmail = z.string().email();

export const editUserSchema = z
  .object({
    username: z.string().min(1, { message: "username cannot be empty" }),
    password: z.string().optional(),
    display_name: z
      .string()
      .min(1, { message: "display name cannot be empty" }),
    email: z.string().optional(),
    type: z.enum(["credential", "oauth"], {
      message: "user must has a type",
    }),
    roles: z
      .array(z.enum(["admin", "instructor", "student"]))
      .min(1, { message: "user must has at least one role" }),
  })
  .refine(
    (data) => {
      if (data.type === "credential") {
        return true;
      }

      return isEmail.safeParse(data.email).success;
    },
    {
      path: ["email"],
      message: "email cannot be empty",
    },
  );

export type EditUserSchema = z.infer<typeof editUserSchema>;
