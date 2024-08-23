export type LearnStatus = "SUCCESS" | "FAILED" | "IN_PROGRESS" | "NONE";

export interface CourseItem {
  name: string;
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
