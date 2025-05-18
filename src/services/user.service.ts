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
    page: number;
    total_rows: number;
    total_page: number;
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

  async deleteUser(id: string) {
    await api.delete(this.#baseURL + `/${id}`);
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

  async editCredentialUser(
    id: string,
    username: string,
    password: string | undefined,
    display_name: string,
    roles: UserRole[],
  ) {
    const res = await api.patch(this.#baseURL + `/${id}`, {
      username,
      password,
      display_name,
      roles,
    });

    return res.data;
  }

  async editOauthUser(
    id: string,
    username: string,
    email: string,
    display_name: string,
    roles: UserRole[],
  ) {
    const res = await api.patch(this.#baseURL + `/${id}`, {
      username,
      email,
      display_name,
      roles,
    });

    return res.data;
  }
}

export const userService = new UserService();
