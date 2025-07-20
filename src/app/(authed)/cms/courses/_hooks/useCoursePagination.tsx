import usePagination from "~/hooks/usePagination";
import { courseKeys } from "~/queryKeys/course";
import {
  cmsCourseService,
  type GetCoursePaginationParams,
} from "~/services/cms-course.service";
import type { Course } from "~/types/cms-course";

export default function useCoursePagination(args: GetCoursePaginationParams) {
  return usePagination<Course>({
    queryKey: courseKeys.all.concat(args),
    queryFn: ({ pageParam }) =>
      cmsCourseService.getPagination({
        ...args,
        page: pageParam as number,
      }),
  });
}
