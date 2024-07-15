import React, { ReactNode } from "react";
import Sidebar from "~/components/commons/Sidebar";

interface Props {
  children: ReactNode;
}
function CoreLayout({ children }: Props) {
  return (
    <div className="h-screen relative">
      <Sidebar />
      <div className="ml-[300px]">{children}</div>
    </div>
  );
}

export default CoreLayout;
