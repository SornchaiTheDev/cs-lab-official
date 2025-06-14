import { useInfiniteQuery } from "@tanstack/react-query";
import { courseKeys } from "~/queryKeys/course";
import {
  cmsCourseService,
  type GetCoursePaginationParams,
} from "~/services/cms-course.service";
import type { Course } from "~/types/cms-course";
import type { PaginationResponse } from "~/types/pagination";

function useCoursePagination(args: GetCoursePaginationParams) {
  return useInfiniteQuery<
    PaginationResponse<Course>,
    PaginationResponse<Course>["pagination"]
  >({
    queryKey: courseKeys.all.concat(args),
    queryFn: ({ pageParam }) =>
      cmsCourseService.getCoursePagination({
        ...args,
        page: pageParam as number,
      }),
    initialPageParam: 1,
    getPreviousPageParam: (lastPage) => lastPage.pagination.page - 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.total_page) {
        return lastPage.pagination.page + 1;
      }
      return null;
    },
    initialData: {
      pages: [],
      pageParams: [],
    },
  });
}

export default useCoursePagination;
