import { api } from "~/lib/api";
import type { Course, CreateCourse } from "~/types/cms-course";
import type { PaginationRequestParams } from "~/types/pagination";
import type { VisibilityKey } from "~/types/visibilities";
import { PaginationMixin } from "./pagination.mixin";

export type GetCoursePaginationParams = Partial<
  PaginationRequestParams<Course>
> & { show: VisibilityKey };

class CMSCourseService {
  _baseURL = "/admin/courses";

  async create({ name, creators }: CreateCourse): Promise<void> {
    const creatorIds = creators.map((creator) => creator.id);
    return api.post(this._baseURL, {
      name,
      creators: creatorIds,
    });
  }

  async getById(courseId: string): Promise<Course> {
    const res = await api.get<Course>(`${this._baseURL}/${courseId}`);
    return res.data;
  }
}

export const cmsCourseService = new (PaginationMixin<
  Course,
  typeof CMSCourseService
>(CMSCourseService))();
