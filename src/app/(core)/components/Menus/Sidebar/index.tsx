"use client";
import Course from "./Course";
import SidebarWrapper from "./Wrapper";
import { myCourses } from "~/__mocks__/myCourses";

function Sidebar() {
  return (
    <SidebarWrapper>
      <h5 className="text-gray-12 font-medium">CS Lab</h5>
      <h6 className="text-gray-11 text-sm font-light py-2">My Courses</h6>
      <div className="flex flex-col gap-4 mt-2">
        {myCourses.map((course) => (
          <Course key={course.name} {...course} />
        ))}
      </div>
    </SidebarWrapper>
  );
}

export default Sidebar;
