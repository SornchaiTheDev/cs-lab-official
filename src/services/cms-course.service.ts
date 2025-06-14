import { api } from "~/lib/api";
import type { Course } from "~/types/cms-course";
import type {
  PaginationRequestParams,
  PaginationResponse,
} from "~/types/pagination";

export type GetCoursePaginationParams = Partial<
  PaginationRequestParams<Course>
>;

class CMSCourseService {
  #baseURL = "/admin/courses";

  async createCourse({ name, creators }: Course): Promise<void> {
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
  }: GetCoursePaginationParams): Promise<PaginationResponse<Course>> {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page?.toString() ?? "1");
    searchParams.append("page_size", pageSize?.toString() ?? "10");
    searchParams.append("search", search ?? "");
    searchParams.append("sort_by", sortBy ?? "created_at");
    searchParams.append("sort_order", sortOrder ?? "desc");

    const res = await api.get<PaginationResponse<Course>>(
      this.#baseURL + "?" + searchParams.toString(),
    );

    return res.data;
  }
}

export const cmsCourseService = new CMSCourseService();
