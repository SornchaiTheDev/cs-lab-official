import React, { type ReactNode } from "react";
import CoreLayout from "./components/Menus/CoreLayout";
import MobileNav from "./components/Menus/MobileNav";
import Sidebar from "./components/Menus/Sidebar";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  return (
    <CoreLayout Sidebar={<Sidebar />} MobileNav={<MobileNav />}>
      {children}
    </CoreLayout>
  );
}

export default Layout;
