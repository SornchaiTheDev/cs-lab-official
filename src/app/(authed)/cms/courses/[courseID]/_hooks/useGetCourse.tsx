import { useQuery } from "@tanstack/react-query";
import { courseKeys } from "~/queryKeys/course";
import { cmsCourseService } from "~/services/cms-course.service";

interface Args {
  courseID: string;
}

function useGetCourse({ courseID }: Args) {
  return useQuery({
    queryKey: courseKeys.getById(courseID),
    queryFn: () => cmsCourseService.getCourseById(courseID),
  });
}

export default useGetCourse;
