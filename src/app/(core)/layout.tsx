"use client";
import { useAtom } from "jotai";
import React, { ReactNode } from "react";
import Sidebar from "~/components/commons/Sidebar";
import { sidebarAtom } from "~/store/sidebar";

interface Props {
  children: ReactNode;
}
function CoreLayout({ children }: Props) {
  const [{ width }] = useAtom(sidebarAtom);
  return (
    <div className="h-screen relative">
      <Sidebar />
      <div style={{ marginLeft: width }} className="transition-all pl-20">
        {children}
      </div>
    </div>
  );
}

export default CoreLayout;
