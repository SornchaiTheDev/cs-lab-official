import { api } from "~/lib/api";
import type { User } from "~/types/user";

export interface GetUserPaginationParams {
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: string;
}

interface PaginationResponse {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
  users: User[];
}

class UserService {
  async getUserPagination({
    page,
    pageSize,
    search,
    sortBy,
    sortOrder,
  }: Partial<GetUserPaginationParams>): Promise<PaginationResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page?.toString() ?? "1");
    searchParams.append("page_size", pageSize?.toString() ?? "10");
    searchParams.append("search", search ?? "");
    searchParams.append("sort_by", sortBy ?? "created_at");
    searchParams.append("sort_order", sortOrder ?? "desc");

    const res = await api.get<PaginationResponse>(
      "/admin/users?" + searchParams.toString(),
    );

    return res.data;
  }
}

export const userService = new UserService();
