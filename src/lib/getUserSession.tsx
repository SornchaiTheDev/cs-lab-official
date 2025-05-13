import { cookies } from "next/headers";
import { getUser } from "./user";
import type { User } from "~/types/user";

export const getUserSession = async (): Promise<User> => {
  const cookieJar = await cookies();
  const accessToken = cookieJar.get("access_token")?.value;

  if (accessToken === undefined) {
    throw new Error("ACCESS_TOKEN_NOT_FOUND");
  }

  const user = getUser(accessToken);

  return user;
};
