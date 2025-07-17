import React from "react";
import SectionCard from "~/components/commons/SectionCard";

function CourseMainPage() {
  return (
    <div className="@container">
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

      <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 @6xl:grid-cols-5 gap-4 auto-rows-max mt-4">
        <SectionCard />
        <SectionCard />
        <SectionCard />
        <SectionCard />
        <SectionCard />
      </div>
    </div>
  );
}

export default CourseMainPage;
