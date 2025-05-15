import { api } from "~/lib/api";
import type { User, UserRole } from "~/types/user";

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
  #baseURL = "/admin/users";

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
      this.#baseURL + "?" + searchParams.toString(),
    );

    return res.data;
  }

  async deleteManyUsers(IDs: string[]) {
    await api.post(this.#baseURL + "/deleteMany", {
      ids: IDs,
    });
  }

  async createCredentialUser(
    username: string,
    password: string,
    display_name: string,
    roles: UserRole[],
  ) {
    const res = await api.post(this.#baseURL + "/credential", {
      username,
      display_name,
      password,
      roles,
    });

    return res.data;
  }

  async createOauthUser(
    username: string,
    display_name: string,
    email: string,
    roles: UserRole[],
  ) {
    const res = await api.post(this.#baseURL + "/oauth", {
      username,
      display_name,
      email,
      roles,
    });

    return res.data;
  }
}

export const userService = new UserService();
