"use client";
import CourseCard from "~/app/(authed)/cms/courses/_components/CourseCard";
import useCoursePagination from "./_hooks/useCoursePagination";
import Loading from "~/components/commons/Loading";
import { Skeleton } from "~/components/ui/skeleton";
import Error from "~/components/commons/Error";
import ErrorFallback from "~/components/commons/Error/ErrorFallback";
import { ServerCrash } from "lucide-react";

function CourseSection() {
  const {
    data: coursePagination,
    isFetching,
    isError,
    refetch,
  } = useCoursePagination({
    page: 1,
    pageSize: 12,
    search: "",
    sortBy: "id",
    sortOrder: "asc",
  });

  return (
    <>
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
            {coursePagination.data.map((course) => (
              <CourseCard key={course.name} {...course} />
            ))}
          </Loading>
        </div>
      </Error>
    </>
  );
}

export default CourseSection;
