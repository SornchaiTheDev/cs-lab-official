import React, { type ReactNode } from "react";
import CoreLayout from "./components/Menus/CoreLayout";
import Sidebar from "./components/Menus/Sidebar";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  return <CoreLayout Sidebar={<Sidebar />}>{children}</CoreLayout>;
}

export default Layout;
