import { useQuery } from "@tanstack/react-query";
import { courseKeys } from "~/queryKeys/course";
import {
  cmsCourseService,
  type GetCoursePaginationParams,
} from "~/services/cms-course.service";

function useCoursePagination(args: GetCoursePaginationParams) {
  return useQuery({
    queryKey: courseKeys.all.concat(args),
    queryFn: () => cmsCourseService.getCoursePagination(args),
    initialData: {
      data: [],
      pagination: {
        page: 0,
        total_page: 0,
        total_rows: 0,
      },
    },
  });
}

export default useCoursePagination;
