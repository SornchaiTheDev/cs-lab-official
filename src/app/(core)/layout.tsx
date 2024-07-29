import React, { ReactNode } from "react";
import CoreLayout from "./components/Menus/CoreLayout";
import MobileNav from "./components/Menus/MobileNav";
import Sidebar from "./components/Menus/Sidebar";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  return (
    <div className="h-screen relative">
      <CoreLayout Sidebar={<Sidebar />} MobileNav={<MobileNav />}>
        {children}
      </CoreLayout>
    </div>
  );
}

export default Layout;
