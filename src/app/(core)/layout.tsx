import React, { type ReactNode } from "react";
import CoreLayout from "./components/Menus/CoreLayout";
import Sidebar from "./components/Menus/Sidebar";
import { Provider as JotaiProvider } from "jotai";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SessionProvider from "~/providers/SessionProvider";
import { jwtDecode } from "jwt-decode";
import type { User } from "~/types/user";
import type { AccessTokenPayload } from "~/types/access-token";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  const cookieJar = await cookies();
  const accessToken = cookieJar.get("access_token");

  if (!accessToken) {
    return redirect("/auth/sign-in");
  }

  const decodedJWT = jwtDecode<AccessTokenPayload>(accessToken.value);

  const user: User = {
    id: decodedJWT.sub,
    username: decodedJWT.username,
    displayName: decodedJWT.displayName,
    profileImage: decodedJWT.profileImage,
    roles: decodedJWT.roles,
  };

  return (
    <JotaiProvider>
      <SessionProvider {...{ user }}>
        <CoreLayout Sidebar={<Sidebar />}>{children}</CoreLayout>
      </SessionProvider>
    </JotaiProvider>
  );
}

export default Layout;
