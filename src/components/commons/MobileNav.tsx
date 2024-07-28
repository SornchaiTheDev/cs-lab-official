import { AnimatePresence, motion } from "framer-motion";
import { Atom, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

const inCoursePage = (
  <>
    <h6 className="text-gray-11 text-sm font-light sticky top-0 bg-gray-2 py-2">
      My Courses
    </h6>
    <div className="flex flex-col gap-4 mt-2 pr-2">
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 bg-gray-4 rounded-lg content-center text-center text-xs">
          🖥️
        </div>
        <h3 className="truncate flex-1 text-sm">
          Fundamental Computing Concept
        </h3>
      </div>
      <h6 className="text-sm text-gray-11 font-light">Lessons</h6>
      <Link
        href="/course/1/lesson/1"
        className="text-gray-12 font-semibold text-sm hover:text-gray-11"
      >
        Lesson 1 For Loops
      </Link>
      <ul className="list-disc list-inside space-y-2 ml-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i}>
            <Link
              href="/course/1/lesson/1"
              className={cn(
                "text-gray-12 text-sm hover:text-gray-11",
                i == 0 && "text-grass-10 font-semibold",
              )}
            >
              Lesson 1.{i + 1} For loops
            </Link>
          </li>
        ))}
      </ul>

      {Array.from({ length: 5 }).map((_, i) => (
        <Link
          key={i}
          href="/course/1/lesson/1"
          className="text-gray-12 text-sm hover:text-gray-11"
        >
          Lesson {i + 2} For Loops
        </Link>
      ))}
    </div>
  </>
);

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gray-4 p-3 rounded-lg active:bg-gray-5 z-50"
      >
        <Menu className="text-gray-9" />
      </button>
    );

  return (
    <AnimatePresence>
      <motion.nav className="bg-gray-2 border-r border-gray-6 flex flex-col justify-between fixed top-0 bottom-0 z-50 w-full">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className={cn("px-4 mt-2 py-2 flex gap-2 items-center w-fit")}
          >
            <Atom size="2rem" data-navigation="true" />

            <motion.h4
              className="text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              CS Lab
            </motion.h4>
          </Link>
          <Button onClick={() => setIsOpen(false)} size="icon" variant="ghost">
            <X />
          </Button>
        </div>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="ml-4 mr-2 flex-1 overflow-y-auto"
        >
          {inCoursePage}
        </motion.section>
        <section className={cn("flex flex-col py-2")}>
          <div className={cn("px-4 py-2 flex items-center justify-between")}>
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-full overflow-hidden">
                <Image src="/profile.png" fill alt="user profile image" />
              </div>
              <motion.h5
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="font-anuphan text-sm"
              >
                ศรชัย สมสกุล
              </motion.h5>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <Button variant="ghost" className="p-2">
                <Settings size="1.25rem" />
              </Button>
            </motion.div>
          </div>
        </section>
      </motion.nav>
    </AnimatePresence>
  );
}

export default MobileNav;
