"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

function NavigationEvents() {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(nprogress.complete, 500);
  }, [pathname]);

  return <NavigationProgress color="green" size={3} />;
}

export default NavigationEvents;
