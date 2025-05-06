import React from "react";
import CoreLayout from "~/layouts/CoreLayout";
import type { ChildrenProps } from "~/types/children-props";
import Sidebar from "./components/Menus/Sidebar";

function Layout({ children }: ChildrenProps) {
  return <CoreLayout Sidebar={<Sidebar />}>{children}</CoreLayout>;
}

export default Layout;
