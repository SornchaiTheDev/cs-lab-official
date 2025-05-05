"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
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

  return (
    <sessionContext.Provider value={{ user, signOut }}>
      {children}
    </sessionContext.Provider>
  );
}

export default SessionProvider;
