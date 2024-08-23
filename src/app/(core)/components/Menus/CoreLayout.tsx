"use client";

import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";
import React, { useEffect, type ReactNode } from "react";
import { sidebarAtom } from "~/store/sidebar";
import { sidebarWidth } from "./constants";
import Image from "next/image";
import { ArrowLeft, House, PanelLeft, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { appAtom } from "~/store/app";
import LoadingComponent from "~/app/loading";

interface Props {
  children: ReactNode;
  Sidebar: ReactNode;
}

function CoreLayout({ children, Sidebar }: Props) {
  const [{ isCollapse }, setSidebar] = useAtom(sidebarAtom);
  const [{ isLoading }, setApp] = useAtom(appAtom);

  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const setup = async () => {
      if (isMobile) {
        setSidebar((prev) => ({ ...prev, width: 0, isCollapse: true }));
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

  const toggleSidebar = () => {
    let width: string | number = sidebarWidth;
    if (isMobile) {
      width = "100%";
    } else {
      width = sidebarWidth;
    }

    setSidebar((prev) => ({
      ...prev,
      isCollapse: !prev.isCollapse,
      width: prev.isCollapse ? width : 0,
    }));
  };

  const router = useRouter();
  const pathname = usePathname();

  const canGoBack = pathname !== "/";

  return (
    <div className="h-screen bg-gray-2 flex flex-col">
      <div className="px-2 py-1 flex justify-between items-center">
        <div className="flex items-center">
          <Button
            onClick={() => router.push("/")}
            disabled={pathname === "/"}
            variant="ghost"
            className="w-10 h-10 p-0 text-gray-10"
          >
            <House />
          </Button>
          <Button
            onClick={() => router.back()}
            disabled={!canGoBack}
            variant="ghost"
            className="w-10 h-10 p-0 text-gray-10"
          >
            <ArrowLeft />
          </Button>
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
      </div>
      <div className="flex-1 flex min-h-0">
        {isLoading ? <LoadingComponent /> : Sidebar}
        {isMobile && !isCollapse ? null : (
          <div className="mb-2 mx-2 flex-1 transition-all rounded-lg bg-white shadow-lg overflow-auto">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default CoreLayout;
