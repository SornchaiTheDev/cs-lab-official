"use client";

import { useEffect, useRef, useState } from "react";
import CreateCourseButton from "./_components/CreateCourseButton";
import CourseCard from "~/app/(authed)/cms/courses/_components/CourseCard";
import Loading from "~/components/commons/Loading";
import { Skeleton } from "~/components/ui/skeleton";
import Error from "~/components/commons/Error";
import ErrorFallback from "~/components/commons/Error/ErrorFallback";
import { ServerCrash } from "lucide-react";
import useCoursePagination from "./_hooks/useCoursePagination";
import SearchInput from "~/components/commons/SearchInput";
import useInputDebounce from "~/hooks/useInputDebounce";
import NoDataAvailable from "~/components/commons/NoDataAvailable";
import CourseVisibility from "./_components/CourseVisibility";
import type { VisibilityKey } from "~/types/visibilities";

function CMSCoursePage() {
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<VisibilityKey>("all");

  const debouncedSearch = useInputDebounce(search, 1000);

  const {
    data: coursePagination,
    isFetching,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useCoursePagination({
    pageSize: 10,
    search: debouncedSearch,
    sortBy: "id",
    sortOrder: "asc",
    show: visibility,
  });

  const isNoData =
    coursePagination.pages.every((page) => page.data.length === 0) &&
    !isFetching;

  const isSearchNoData = search.length > 0 && isNoData;

  const bottomDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomDivRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isFetching) {
            fetchNextPage();
          }
        });
      },
      {
        threshold: 1,
      },
    );

    if (!hasNextPage) {
      observer.disconnect();
      return;
    }

    observer.observe(bottomDivRef.current);

    return () => observer.disconnect();
  }, [isFetching, fetchNextPage, hasNextPage]);

  return (
    <div className="@container w-full max-w-[1920px] mx-auto flex flex-col">
      <h3 className="text-3xl font-medium">Courses</h3>
      <div className="flex justify-end items-center gap-2">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search courses..."
          className=""
        />
        <CourseVisibility selected={visibility} onChange={setVisibility} />
        <CreateCourseButton />
      </div>
      <Error
        isError={isError}
        fallback={
          <ErrorFallback
            icon={<ServerCrash size="2rem" />}
            onRetry={refetch}
            title="Cannot get the courses"
            message="There was an error to get the courses. Please try again later or report issue"
          />
        }
      >
        {isNoData || isSearchNoData ? (
          <NoDataAvailable />
        ) : (
          <>
            <div className="mt-4 space-y-10 grid grid-cols-12 gap-4 @2xl:grid-cols-6 @5xl:grid-cols-4 @7xl:grid-cols-3">
              {coursePagination.pages.map((page) =>
                page.data.map((course) => (
                  <CourseCard key={course.name} {...course} />
                )),
              )}
              <Loading
                isLoading={isFetching}
                fallback={Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="col-span-12 @2xl:col-span-6 @5xl:col-span-4 @7xl:col-span-3 h-40"
                  />
                ))}
              />
            </div>
            <div ref={bottomDivRef} className="h-20" />
          </>
        )}
      </Error>
    </div>
  );
}

export default CMSCoursePage;
