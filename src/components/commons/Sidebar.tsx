"use client";

import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Atom,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import { sidebarAtom, toggleSidebarAtom } from "~/store/sidebar";
import { cn } from "~/lib/utils";

function Sidebar() {
  const [{ isCollapse, width, isFirstMount }] = useAtom(sidebarAtom);
  const toggleSidebar = useSetAtom(toggleSidebarAtom);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ width }}
        animate={{ width }}
        className="bg-gray-2 flex flex-col justify-between fixed top-0 bottom-0"
      >
        <div
          className={cn(
            "px-4 mt-4 py-2 flex gap-2 items-center",
            isCollapse && "justify-center",
          )}
        >
          <Atom />

          {!isCollapse && (
            <motion.h6
              initial={{ opacity: isFirstMount ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              CS Lab
            </motion.h6>
          )}
        </div>
        {!isCollapse && (
          <motion.section
            initial={{ opacity: isFirstMount ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="ml-4 mr-2 flex-1 overflow-y-auto"
          >
            <h6 className="text-gray-11 text-sm font-light sticky top-0 bg-gray-2 py-2">
              My Courses
            </h6>
            <div className="flex flex-col gap-4 mt-2 pr-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="w-10 h-10 bg-gray-4 rounded-lg content-center text-center text-xs">
                    🖥️
                  </div>
                  <h3 className="truncate flex-1 text-sm">
                    Fundamental Computing Concept
                  </h3>
                </div>
              ))}
            </div>
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
              <Image
                src="/profile.png"
                width={40}
                height={40}
                className="rounded-full"
                alt="user profile image"
              />
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

export default Sidebar;
