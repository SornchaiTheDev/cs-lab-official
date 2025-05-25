import type { AxiosHeaderValue } from "axios";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "~/lib/api";
import { verifyJWT } from "~/lib/verify-jwt";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const cookieJar = await cookies();
  const headerList = await headers();

  const redirectTo = headerList.get("referer") || "/";

  const accessToken = cookieJar.get("access_token")?.value ?? "";
  const refreshToken = cookieJar.get("refresh_token")?.value;

  try {
    // verify if refresh token is valid throw error if not
    verifyJWT(refreshToken);
  } catch (err) {
    redirect("/auth/sign-in");
  }

  let resCookies: AxiosHeaderValue = [];

  try {
    const res = await api.post("/auth/refresh-token", null, {
      headers: {
        Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
      },
    });

    resCookies = res.headers["set-cookie"] || [];
  } catch (err) {
    redirect("/auth/sign-in");
  }

  // Get Set-Cookie header from response then convert into nextjs cookies then set them
  resCookies.map((cookie) => {
    const name = cookie.split(";")[0].split("=")[0];
    const value = cookie.split(";")[0].split("=")[1];
    const properties = cookie
      .split(";")
      .map((el) => el.trim())
      .slice(0, 1)
      .map((el) => el.split("="));

    const props = properties.reduce(
      (acc, [key, value]) => {
        if (key !== "HttpOnly" && key !== "Secure") {
          acc[key] = value;
        } else {
          acc[key] = true;
        }
        return acc;
      },
      {} as Record<string, string | boolean>,
    );

    cookieJar.set(name, value, props);
  });

  return redirect(redirectTo);
};
