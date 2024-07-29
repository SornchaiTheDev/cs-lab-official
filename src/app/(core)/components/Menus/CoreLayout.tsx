"use client";

import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";
import React, { type ReactNode, useEffect } from "react";
import LoadingComponent from "~/app/loading";
import { appAtom } from "~/store/app";
import { sidebarAtom } from "~/store/sidebar";

interface Props {
  children: ReactNode;
  Sidebar: ReactNode;
  MobileNav: ReactNode;
}

function CoreLayout({ children, Sidebar, MobileNav }: Props) {
  const [{ width }, setSidebar] = useAtom(sidebarAtom);
  const [{ isLoading }, setApp] = useAtom(appAtom);

  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const setup = async () => {
      if (isMobile) {
        setSidebar((prev) => ({ ...prev, width: 0 }));
      } else {
        setSidebar((prev) => ({ ...prev, width: 300, isCollapse: false }));
      }
      await new Promise((res) => setTimeout(() => res("finish loading"), 500));
      setApp({
        isLoading: false,
      });
    };
    setup();
  }, [isMobile, setSidebar, setApp]);

  return (
    <>
      {isLoading ? <LoadingComponent /> : isMobile ? MobileNav : Sidebar}
      <div style={{ marginLeft: width }} className="transition-all h-full">
        {children}
      </div>
    </>
  );
}

export default CoreLayout;
