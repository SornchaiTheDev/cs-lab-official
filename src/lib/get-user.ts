import { jwtDecode } from "jwt-decode";
import type { JWTUser } from "~/types/user";
import { verifyJWT } from "./verify-jwt";
import { cookies } from "next/headers";

export const getUser = async (): Promise<JWTUser> => {
  const cookieJar = await cookies();
  const accessToken = cookieJar.get("access_token")?.value;

  const token = verifyJWT(accessToken);
  return jwtDecode<JWTUser>(token);
};
