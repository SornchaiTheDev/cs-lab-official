export const queryKeys = {
  course: {
    all: ["courses"],
    allWithParams: (params: Record<string, any>) => [
      ...queryKeys.course.all,
      params,
    ],
    getById: (courseId: string) => [...queryKeys.course.all, courseId],
  },
  user_group: {
    all: ["user_groups"],
    allWithParams: (params: Record<string, any>) => [
      ...queryKeys.user_group.all,
      params,
    ],
  },
} as const;
