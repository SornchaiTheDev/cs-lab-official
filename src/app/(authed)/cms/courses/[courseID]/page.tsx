"use client";
import React from "react";
import SearchInput from "~/components/commons/SearchInput";
import SectionCard from "~/components/commons/SectionCard";
import useGetCourse from "./_hooks/useGetCourse";
import { useParams } from "next/navigation";
import Loading from "~/components/commons/Loading";
import { Skeleton } from "~/components/ui/skeleton";

function CourseMainPage() {
  const [search, setSearch] = React.useState("");
  const { courseID } = useParams<{ courseID: string }>();
  const { data: course, isFetching } = useGetCourse({ courseID });

  return (
    <div className="@container">
      <Loading
        isLoading={isFetching}
        fallback={<Skeleton className="w-64 h-8" />}
      >
        <h3 className="text-xl font-medium">{course?.name}</h3>
      </Loading>
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

      <div className="flex justify-end items-center gap-2">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search sections..."
        />
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
