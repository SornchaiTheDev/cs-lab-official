import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { verifyJWT } from "~/lib/verify-jwt";

export const protectedMiddleware = async (): Promise<void> => {
  const cookieJar = await cookies();
  const accessToken = cookieJar.get("access_token")?.value;

  try {
    verifyJWT(accessToken);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "UNAUTHORIZED") {
        notFound();
      }

      if (err.message === "NO_TOKEN" || err.message === "TOKEN_EXPIRED") {
        redirect("/auth/refresh-token");
      }
    }
    redirect("/auth/sign-out");
  }
};
