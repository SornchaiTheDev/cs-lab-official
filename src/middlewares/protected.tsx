import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getUser } from "~/lib/user";
import type { User } from "~/types/user";

export const protectedMiddleware = async (
  cond?: (user: User) => boolean,
): Promise<User> => {
  const cookieJar = await cookies();
  const accessToken = cookieJar.get("access_token");

  if (!accessToken) {
    redirect("/auth/sign-in");
  }

  try {
    const user = getUser(accessToken.value);
    if (cond !== undefined && !cond(user)) {
      throw new Error("UNAUTHORIZED");
    }

    return user;
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "UNAUTHORIZED") {
        notFound();
      }
    }
    redirect("/auth/sign-out");
  }
};
