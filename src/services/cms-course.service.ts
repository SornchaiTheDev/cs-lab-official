import { api } from "~/lib/api";
import type { Course, CreateCourse } from "~/types/cms-course";
import type {
  PaginationRequestParams,
  PaginationResponse,
} from "~/types/pagination";
import type { VisibilityKey } from "~/types/visibilities";

export type GetCoursePaginationParams = Partial<
  PaginationRequestParams<Course>
> & { show: VisibilityKey };

class CMSCourseService {
  #baseURL = "/admin/courses";

  async createCourse({ name, creators }: CreateCourse): Promise<void> {
    const creatorIds = creators.map((creator) => creator.id);
    return api.post(this.#baseURL, {
      name,
      creators: creatorIds,
    });
  }

  async getCoursePagination({
    page,
    pageSize,
    search,
    sortBy,
    sortOrder,
    show,
  }: GetCoursePaginationParams): Promise<PaginationResponse<Course>> {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page?.toString() ?? "1");
    searchParams.append("page_size", pageSize?.toString() ?? "10");
    searchParams.append("search", search ?? "");
    searchParams.append("sort_by", sortBy ?? "created_at");
    searchParams.append("sort_order", sortOrder ?? "desc");
    searchParams.append("show", show ?? "all");

    const res = await api.get<PaginationResponse<Course>>(
      this.#baseURL + "?" + searchParams.toString(),
    );

    return res.data;
  }

  async getCourseById(courseId: string): Promise<Course> {
    const res = await api.get<Course>(`${this.#baseURL}/${courseId}`);
    return res.data;
  }
}

export const cmsCourseService = new CMSCourseService();
