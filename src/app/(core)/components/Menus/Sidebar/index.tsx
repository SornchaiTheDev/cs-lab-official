import React from "react";
import SidebarWrapper from "./Wrapper";
import Link from "next/link";
import { cn } from "~/lib/utils";

const homePage = (
  <>
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
  </>
);

const coursePage = (
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
      {Array.from({ length: 8 }).map((_, i) => (
        <Link
          key={i}
          href="/course/1/lesson/1"
          className="text-gray-12 text-sm hover:text-gray-11"
        >
          Lesson 1.{i + 1} For Loops
        </Link>
      ))}
    </div>
  </>
);

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

function Sidebar() {
  return <SidebarWrapper>{inCoursePage}</SidebarWrapper>;
}

export default Sidebar;
