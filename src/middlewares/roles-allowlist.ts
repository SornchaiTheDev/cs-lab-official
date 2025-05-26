import { NextResponse, type NextRequest } from "next/server";
import { getUser } from "~/lib/get-user";
import type { UserRole } from "~/types/user";

export const rolesAllowlistMiddleware = async (
  req: NextRequest,
  roles: UserRole[],
) => {
  const user = await getUser();
  const hasPermission = user.roles.some((role) => roles.includes(role));

  if (!hasPermission) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }
};
