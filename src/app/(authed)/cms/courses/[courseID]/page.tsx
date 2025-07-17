import React from "react";
import SectionCard from "~/components/commons/SectionCard";

function CourseMainPage() {
  return (
    <div>
      <h3 className="text-xl">Fundamental Computing</h3>
      <div className="mt-4">
        <div className="flex gap-4">
          <button className=" px-3 py-2 rounded-lg text-(--gray-12) text-xs font-semibold bg-(--gray-3)">
            Sections
          </button>
          <button className="px-3 py-2 rounded-lg text-(--gray-11) text-xs hover:text-(--gray-12) hover:font-semibold">
            Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center gap-4 mt-4">
        <SectionCard className="col-span-3" />
        <SectionCard className="col-span-3" />
        <SectionCard className="col-span-3" />
        <SectionCard className="col-span-3" />
      </div>
    </div>
  );
}

export default CourseMainPage;
