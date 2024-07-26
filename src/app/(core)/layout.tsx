"use client";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom } from "jotai";
import React, { ReactNode, useEffect } from "react";
import Sidebar from "~/components/commons/Sidebar";
import { appAtom } from "~/store/app";
import { sidebarAtom } from "~/store/sidebar";
import Loading from "../loading";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

interface Props {
  children: ReactNode;
}
function CoreLayout({ children }: Props) {
  const [{ width }, setSidebar] = useAtom(sidebarAtom);
  const [app, setApp] = useAtom(appAtom);

  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const setup = async () => {
      if (isMobile) {
        setSidebar((prev) => ({ ...prev, width: 0 }));
      } else {
        setSidebar((prev) => ({ ...prev, width: 300, isCollapse: false }));
      }

      setApp({
        isLoading: false,
      });
    };
    setup();
  }, [setApp, isMobile, setSidebar]);

  if (app.isLoading) return <Loading />;

  return (
    <MantineProvider>
      <div className="h-screen relative">
        {!isMobile && <Sidebar />}
        <div style={{ marginLeft: width }} className="transition-all h-full">
          {children}
        </div>
      </div>
    </MantineProvider>
  );
}

export default CoreLayout;
