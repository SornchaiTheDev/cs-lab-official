import type { NextRequest } from "next/server";
import { verifyJWT } from "~/lib/verify-jwt";

export const protectedMiddleware = async (req: NextRequest): Promise<void> => {
  const cookieJar = req.cookies;
  const accessToken = cookieJar.get("access_token")?.value;

  verifyJWT(accessToken);
};
