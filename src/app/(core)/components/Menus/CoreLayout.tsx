"use client";

import { useAtom } from "jotai";
import React, { useEffect, type ReactNode } from "react";
import { sidebarAtom } from "~/globalStore/sidebar";
import { sidebarWidth } from "./constants";
import { ArrowLeft, House, PanelLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { appAtom } from "~/globalStore/app";
import LoadingComponent from "~/app/loading";

interface Props {
  children: ReactNode;
  Sidebar: ReactNode;
}

function CoreLayout({ children, Sidebar }: Props) {
  const [{ isCollapse }, setSidebar] = useAtom(sidebarAtom);
  const [{ isLoading }, setApp] = useAtom(appAtom);

  // TODO: Implement mobile detection
  const isMobile = false;

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
    <div className="h-screen flex flex-col">
      <div className="px-2 py-1 flex justify-between items-center border-b border-gray-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={toggleSidebar}
            className="w-10 h-8 p-0 text-gray-10"
          >
            <PanelLeft size="1.25rem" />
          </Button>
          <Button
            onClick={() => router.push("/")}
            disabled={pathname === "/"}
            variant="ghost"
            className="w-10 h-8 p-0 text-gray-10"
          >
            <House size="1.25rem" />
          </Button>
          <Button
            onClick={() => router.back()}
            disabled={!canGoBack}
            variant="ghost"
            className="w-10 h-8 p-0 text-gray-10"
          >
            <ArrowLeft size="1.25rem" />
          </Button>
        </div>
      </div>
      <div className="flex min-h-0 h-full">
        {Sidebar}
        {/* {isLoading ? <LoadingComponent /> : Sidebar} */}
        {isMobile && !isCollapse ? null : (
          <div className="flex-1 transition-all overflow-auto">{children}</div>
        )}
      </div>
    </div>
  );
}

export default CoreLayout;
