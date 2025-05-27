import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "~/components/commons/Link";
import type { SidebarCourse } from "../../../types";
import CourseItem from "./CourseItem";

const Course = ({ name, icon, lessons, labs, courseId }: SidebarCourse) => {
  const [isOpen, setIsOpen] = useState(false);
  const _icon = icon ? icon : name[0];

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const courseRegex = new RegExp(`/course/${courseId}(/lesson|lab/[\\w])*`);
    setIsOpen(courseRegex.test(pathname));
  }, [pathname, searchParams, courseId]);

  return (
    <>
      <Link href={`/course/${courseId}`}>
        <div className="flex gap-2 items-center">
          <div className="w-7 h-7 bg-(--gray-4) rounded-lg content-center text-center text-xs">
            {_icon}
          </div>
          <h3 className="flex-1 truncate text-start text-xs">{name}</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-(--gray-10) w-6 h-6 rounded-md hover:bg-(--gray-3) hover:text-(--gray-10) flex justify-center items-center"
          >
            {isOpen ? <ChevronUp size="1rem" /> : <ChevronDown size="1rem" />}
          </button>
        </div>
      </Link>
      {isOpen && (
        <div className="pl-2 space-y-3">
          <p className="text-xs text-(--gray-10)">Lessons</p>
          <div className="space-y-4">
            {lessons.map(({ name, subItems, status }) => (
              <CourseItem
                key={name}
                {...{ name, subItems, courseId, status }}
                type="lesson"
              />
            ))}
          </div>
          <p className="text-xs text-(--gray-10)">Labs</p>
          <div className="space-y-4">
            {labs.map(({ name, subItems, status }) => (
              <CourseItem
                key={name}
                {...{ name, subItems, courseId, status }}
                type="lab"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Course;
