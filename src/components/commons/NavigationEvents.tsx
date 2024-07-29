"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

function NavigationEvents() {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(nprogress.complete, 500);
  }, [pathname]);

  return <NavigationProgress />;
}

export default NavigationEvents;
