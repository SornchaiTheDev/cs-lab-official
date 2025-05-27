"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { sidebarAtom } from "~/globalStore/sidebar";
import type { ReactNode } from "react";
import UserSection from "./UserSection";

interface Props {
  children: ReactNode;
}
function SidebarWrapper({ children }: Props) {
  const [{ isCollapse, width }] = useAtom(sidebarAtom);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ width }}
        animate={{ width }}
        className="flex flex-col justify-between border-r border-(--gray-4) bg-(--gray-2)"
      >
        {!isCollapse && (
          <>
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="px-4 flex-1 overflow-y-auto pt-6 pb-10"
            >
              {children}
            </motion.section>
            <UserSection />
          </>
        )}
      </motion.nav>
    </AnimatePresence>
  );
}

export default SidebarWrapper;
