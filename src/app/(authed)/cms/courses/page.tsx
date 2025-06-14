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

function CMSCoursePage() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useInputDebounce(search, 1000);

  const {
    data: coursePagination,
    isFetching,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useCoursePagination({
    pageSize: 20,
    search: debouncedSearch,
    sortBy: "id",
    sortOrder: "asc",
  });

  const isNoData =
    search.length > 0 &&
    coursePagination.pages.every((page) => page.data.length === 0) &&
    !isFetching;

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
    <div className="@container w-full max-w-[1920px] mx-auto h-screen flex flex-col mb-20">
      <div className="flex justify-between w-full">
        <h3 className="text-3xl font-medium">Courses</h3>
        <div className="flex items-center gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search courses..."
            className="h-9"
          />
          <CreateCourseButton />
        </div>
      </div>
      <Error
        {...{ isError }}
        fallback={
          <ErrorFallback
            icon={<ServerCrash size="2rem" />}
            onRetry={refetch}
            title="Cannot get the courses"
            message="There was an error to get the courses. Please try again later or report issue"
          />
        }
      >
        {isNoData ? (
          <NoDataAvailable />
        ) : (
          <>
            <div className="grid grid-cols-12 mt-10 gap-x-4 gap-y-10">
              <Loading
                isLoading={isFetching}
                fallback={Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="col-span-12 @2xl:col-span-6 @5xl:col-span-4 @7xl:col-span-3 h-40"
                  />
                ))}
              >
                {coursePagination.pages.map((page) =>
                  page.data.map((course) => (
                    <CourseCard key={course.name} {...course} />
                  )),
                )}
              </Loading>
            </div>
            <div ref={bottomDivRef} className="h-20" />
          </>
        )}
      </Error>
    </div>
  );
}

export default CMSCoursePage;
