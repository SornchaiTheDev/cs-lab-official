import { type ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";
import SessionProvider from "~/providers/SessionProvider";
import { protectedMiddleware } from "~/middlewares/protected";
import { getUserSession } from "~/lib/getUserSession";
import QueryProvider from "~/providers/QueryProvider";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  await protectedMiddleware();

  const user = await getUserSession();

  return (
    <JotaiProvider>
      <QueryProvider>
        <SessionProvider {...{ user }}>{children}</SessionProvider>
      </QueryProvider>
    </JotaiProvider>
  );
}
