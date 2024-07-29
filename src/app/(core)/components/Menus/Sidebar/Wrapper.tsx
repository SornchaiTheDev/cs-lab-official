"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Atom,
  Settings,
} from "lucide-react";
import Link from "~/components/commons/Link";
import { cn } from "~/lib/utils";
import { sidebarAtom, toggleSidebarAtom } from "~/store/sidebar";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
function SidebarWrapper({ children }: Props) {
  const [{ isCollapse, width, isFirstMount }] = useAtom(sidebarAtom);
  const toggleSidebar = useSetAtom(toggleSidebarAtom);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ width }}
        animate={{ width }}
        className="bg-gray-2 border-r border-gray-6 flex flex-col justify-between fixed top-0 bottom-0 z-50"
      >
        <Link
          href="/"
          className={cn(
            "px-4 mt-2 py-2 flex gap-2 items-center w-fit",
            isCollapse && "justify-center w-full",
          )}
        >
          <Atom size="2rem" />

          {!isCollapse && (
            <motion.h4
              className="text-xl"
              initial={{ opacity: isFirstMount ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              CS Lab
            </motion.h4>
          )}
        </Link>
        {!isCollapse && (
          <motion.section
            initial={{ opacity: isFirstMount ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="ml-4 mr-2 flex-1 overflow-y-auto"
          >
            {children}
          </motion.section>
        )}
        <section
          className={cn("flex flex-col py-2", isCollapse && "items-center")}
        >
          <div
            className={cn(
              "px-4 py-2 flex items-center justify-between",
              isCollapse && "justify-center",
            )}
          >
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Image src="/profile.png" fill alt="user profile image" />
              </div>
              {!isCollapse && (
                <motion.h5
                  initial={{ opacity: isFirstMount ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="font-anuphan text-sm"
                >
                  ศรชัย สมสกุล
                </motion.h5>
              )}
            </div>
            {!isCollapse && (
              <motion.div
                initial={{ opacity: isFirstMount ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Button variant="ghost" className="p-2">
                  <Settings size="1.25rem" />
                </Button>
              </motion.div>
            )}
          </div>
          <div
            className={cn(
              "px-4 py-1 border-t",
              !isCollapse && "flex justify-end",
            )}
          >
            <Button onClick={toggleSidebar} variant="ghost" className="p-2">
              {isCollapse ? <ArrowRightToLine /> : <ArrowLeftToLine />}
            </Button>
          </div>
        </section>
      </motion.nav>
    </AnimatePresence>
  );
}

export default SidebarWrapper;
