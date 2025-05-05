import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const GET = async () => {
  const cookieJar = await cookies();
  cookieJar.delete("access_token");
  cookieJar.delete("refresh_token");

  return redirect("/auth/sign-in");
};
