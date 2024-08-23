"use client";

import { useMediaQuery } from "@mantine/hooks";
import { useAtom, useSetAtom } from "jotai";
import React, { type ReactNode, useEffect } from "react";
import LoadingComponent from "~/app/loading";
import { appAtom } from "~/store/app";
import { sidebarAtom, toggleSidebarAtom } from "~/store/sidebar";
import { sidebarWidth } from "./constants";
import Image from "next/image";
import { PanelLeft, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";

interface Props {
  children: ReactNode;
  Sidebar: ReactNode;
  MobileNav: ReactNode;
}

function CoreLayout({ children, Sidebar, MobileNav }: Props) {
  const setSidebar = useSetAtom(sidebarAtom);
  const [{ isLoading }, setApp] = useAtom(appAtom);
  const toggleSidebar = useSetAtom(toggleSidebarAtom);

  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const setup = async () => {
      if (isMobile) {
        setSidebar((prev) => ({ ...prev, width: 0 }));
      } else {
        setSidebar((prev) => ({
          ...prev,
          width: sidebarWidth,
          isCollapse: false,
        }));
      }
      await new Promise((res) => setTimeout(() => res("finish loading"), 500));
      setApp((prev) => ({ ...prev, isLoading: false }));
    };
    setup();
  }, [isMobile, setSidebar, setApp]);

  return (
    <div className="h-screen bg-olive-1 flex flex-col">
      <div className="px-2 py-1 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            className="w-10 h-10 p-0 text-gray-10"
          >
            <PanelLeft />
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <div className="relative w-8 h-8 rounded-md overflow-hidden">
            <Image src="/profile.png" fill alt="user profile image" />
          </div>
          <Button variant="ghost" className="p-2 text-gray-10">
            <Settings size="1.25rem" />
          </Button>
        </div>

        {/* <Atom size="2rem" /> */}
      </div>
      <div className="flex-1 flex min-h-0">
        {isLoading ? <LoadingComponent /> : isMobile ? MobileNav : Sidebar}
        <div className="mb-2 mx-2 flex-1 transition-all rounded-lg bg-white shadow-lg overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default CoreLayout;
