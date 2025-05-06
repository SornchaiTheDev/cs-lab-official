import { type ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";
import SessionProvider from "~/providers/SessionProvider";
import { protectedMiddleware } from "~/middlewares/protected";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const user = await protectedMiddleware();

  return (
    <JotaiProvider>
      <SessionProvider {...{ user }}>{children}</SessionProvider>
    </JotaiProvider>
  );
}
