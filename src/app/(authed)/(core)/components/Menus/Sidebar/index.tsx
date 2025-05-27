"use client";
import Course from "./Course";
import { myCourses } from "~/__mocks__/myCourses";

function Sidebar() {
  return (
    <>
      <h6 className="text-(--gray-11) text-sm font-light py-2">My Courses</h6>
      <div className="flex flex-col gap-4 mt-2">
        {myCourses.map((course) => (
          <Course key={course.name} {...course} />
        ))}
      </div>
    </>
  );
}

export default Sidebar;
