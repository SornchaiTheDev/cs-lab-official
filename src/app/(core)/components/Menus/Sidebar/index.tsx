"use client";
import SidebarWrapper from "./Wrapper";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { SidebarCourse } from "~/app/(core)/types";
import CourseItem from "./CourseItem";
import { myCourses } from "~/__mocks__/myCourses";

const Course = ({ name, icon, lessons, labs, courseId }: SidebarCourse) => {
  const [isOpen, setIsOpen] = useState(false);
  const _icon = icon ? icon : name[0];

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-2 items-center">
          <div className="w-7 h-7 bg-gray-4 rounded-lg content-center text-center text-xs">
            {_icon}
          </div>
          <h3 className="truncate flex-1 text-xs">{name}</h3>
          <div className="p-0 text-gray-10 w-4 h-4">
            {isOpen ? <ChevronUp size="1rem" /> : <ChevronDown size="1rem" />}
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="pl-2 space-y-3">
          <p className="text-xs text-gray-10">Lessons</p>
          <div className="space-y-4">
            {lessons.map(({ name, subItems }) => (
              <CourseItem
                key={name}
                {...{ name, subItems, courseId }}
                type="lesson"
              />
            ))}
          </div>
          <p className="text-xs text-gray-10">Labs</p>
          <div className="space-y-4">
            {labs.map(({ name, subItems }) => (
              <CourseItem
                key={name}
                {...{ name, subItems, courseId }}
                type="lab"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const MyCourse = () => {
  return (
    <>
      <h6 className="text-gray-11 text-sm font-light py-2">My Courses</h6>
      <div className="flex flex-col gap-4 mt-2 pr-2">
        {myCourses.map((course) => (
          <Course key={course.name} {...course} />
        ))}
      </div>
    </>
  );
};

function Sidebar() {
  return (
    <SidebarWrapper>
      <MyCourse />
    </SidebarWrapper>
  );
}

export default Sidebar;
