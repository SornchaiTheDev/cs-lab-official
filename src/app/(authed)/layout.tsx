import { type ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";
import SessionProvider from "~/providers/SessionProvider";
import { protectedMiddleware } from "~/middlewares/protected";
import QueryProvider from "~/providers/QueryProvider";
import { getUser } from "~/lib/get-user";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  await protectedMiddleware();

  const user = await getUser();

  return (
    <JotaiProvider>
      <QueryProvider>
        <SessionProvider {...{ user }}>{children}</SessionProvider>
      </QueryProvider>
    </JotaiProvider>
  );
}
