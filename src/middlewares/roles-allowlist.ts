import { notFound } from "next/navigation";
import { getUser } from "~/lib/get-user";
import type { UserRole } from "~/types/user";

export const rolesAllowlistMiddleware = async (roles: UserRole[]) => {
  try {
    const user = await getUser();
    const hasPermission = user.roles.some((role) => roles.includes(role));

    if (!hasPermission) {
      throw new Error("NO_PERMISSION");
    }
  } catch (err) {
    return notFound();
  }
};
