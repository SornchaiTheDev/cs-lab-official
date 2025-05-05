import React, { type ReactNode } from "react";
import CoreLayout from "./components/Menus/CoreLayout";
import Sidebar from "./components/Menus/Sidebar";
import { Provider as JotaiProvider } from "jotai";

interface Props {
  children: ReactNode;
}

async function Layout({ children }: Props) {
  return (
    <JotaiProvider>
      <CoreLayout Sidebar={<Sidebar />}>{children}</CoreLayout>
    </JotaiProvider>
  );
}

export default Layout;
