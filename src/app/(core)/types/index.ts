export type LearnStatus = "PASSED" | "FAILED" | "IN_PROGRESS" | "NONE";

export interface CourseItem {
  name: string;
  status: LearnStatus;
  subItems: SubCourseItem[];
}
export interface SubCourseItem {
  slug: string;
  name: string;
  status: LearnStatus;
}

export interface SidebarCourse {
  courseId: string;
  name: string;
  icon: string;
  lessons: CourseItem[];
  labs: CourseItem[];
}
