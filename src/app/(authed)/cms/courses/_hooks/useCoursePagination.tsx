import useInfinitePagination from "~/hooks/useInfinitePagination";
import { queryKeys } from "~/queryKeys";
import {
  cmsCourseService,
  type GetCoursePaginationParams,
} from "~/services/cms-course.service";
import type { Course } from "~/types/cms-course";

export default function useCoursePagination(args: GetCoursePaginationParams) {
  return useInfinitePagination<Course>({
    queryKey: queryKeys.course.allWithParams(args),
    queryFn: ({ pageParam }) =>
      cmsCourseService.getPagination({
        ...args,
        page: pageParam,
      }),
  });
}
