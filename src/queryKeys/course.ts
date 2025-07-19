export const courseKeys: Record<string, any> = {
  all: ["courses"],
  getById: (courseId: string) => [...courseKeys.all, courseId],
};
