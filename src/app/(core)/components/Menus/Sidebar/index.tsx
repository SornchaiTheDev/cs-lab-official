"use client";
import { Atom } from "lucide-react";
import Course from "./Course";
import SidebarWrapper from "./Wrapper";
import { myCourses } from "~/__mocks__/myCourses";

function Sidebar() {
  return (
    <SidebarWrapper>
      <div className="flex items-center gap-2 mt-2 mb-4">
        <Atom size="2rem" className="text-gray-12" />
        <h5 className="text-gray-12">CS Lab</h5>
      </div>
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
