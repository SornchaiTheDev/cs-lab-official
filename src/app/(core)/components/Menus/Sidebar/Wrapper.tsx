"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { sidebarAtom } from "~/store/sidebar";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
function SidebarWrapper({ children }: Props) {
  const [{ isCollapse, width }] = useAtom(sidebarAtom);

  return (
    <AnimatePresence>
      <motion.nav animate={{ width }} className="flex flex-col justify-between">
        {!isCollapse && (
          <>
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="pl-4 flex-1 overflow-y-auto pb-10"
            >
              {children}
            </motion.section>
          </>
        )}
      </motion.nav>
    </AnimatePresence>
  );
}

export default SidebarWrapper;
