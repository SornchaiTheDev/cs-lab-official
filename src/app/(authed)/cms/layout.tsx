import React from "react";
import CoreLayout from "~/layouts/CoreLayout";
import type { ChildrenProps } from "~/types/children-props";

function Layout({ children }: ChildrenProps) {
  return <CoreLayout>{children}</CoreLayout>;
}

export default Layout;
