import {
  type QueryFunction,
  type QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import type { PaginationResponse } from "~/types/pagination";

interface Args<T> {
  queryKey: QueryKey;
  queryFn: QueryFunction<PaginationResponse<T>, readonly unknown[], number>;
}

function usePagination<T>({ queryKey, queryFn }: Args<T>) {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getPreviousPageParam: (lastPage) => lastPage.pagination.page - 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.total_page) {
        return lastPage.pagination.page + 1;
      }
      return null;
    },
    initialData: {
      pages: [],
      pageParams: [],
    },
  });
}

export default usePagination;
