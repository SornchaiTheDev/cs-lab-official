import React from "react";
import CoreLayout from "~/layouts/CoreLayout";
import { protectedMiddleware } from "~/middlewares/protected";
import type { ChildrenProps } from "~/types/children-props";

async function Layout({ children }: ChildrenProps) {
  await protectedMiddleware((user) =>
    user.roles.some((role) => ["teacher", "admin"].includes(role)),
  );

  return <CoreLayout>{children}</CoreLayout>;
}

export default Layout;
