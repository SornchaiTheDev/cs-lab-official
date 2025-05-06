"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { api } from "~/lib/api";
import type { ChildrenProps } from "~/types/children-props";
import type { User } from "~/types/user";

interface SessionContext {
  user: User;
  signOut: () => void;
}
const sessionContext = createContext<SessionContext | null>(null);

export const useSession = () => {
  const context = useContext(sessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};

interface Props extends ChildrenProps {
  user: User;
}

function SessionProvider({ user, children }: Props) {
  const router = useRouter();

  const signOut = () => {
    router.push("/auth/sign-out");
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      api.post("/auth/refresh-token");
    } catch {
      router.push("/auth/sign-out");
    }
  }, [pathname, searchParams, router]);

  return (
    <sessionContext.Provider value={{ user, signOut }}>
      {children}
    </sessionContext.Provider>
  );
}

export default SessionProvider;
