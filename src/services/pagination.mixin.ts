import { api } from "~/lib/api";
import type { PaginationResponse } from "~/types/pagination";

type Constructor<T = { _baseURL: string }> = new (...args: any[]) => T;

export const PaginationMixin = <Item extends unknown, T extends Constructor>(
  Base: T,
) => {
  return class Pagination extends Base {
    async getPagination({
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      show,
    }: any): Promise<PaginationResponse<Item>> {
      const searchParams = new URLSearchParams();
      searchParams.append("page", page?.toString() ?? "1");
      searchParams.append("page_size", pageSize?.toString() ?? "10");
      searchParams.append("search", search ?? "");
      searchParams.append("sort_by", sortBy ?? "created_at");
      searchParams.append("sort_order", sortOrder ?? "desc");
      searchParams.append("show", show ?? "all");

      const res = await api.get<PaginationResponse<Item>>(
        this._baseURL + "?" + searchParams.toString(),
      );

      return res.data;
    }
  };
};
