import {
  type QueryFunction,
  type QueryKey,
  useQuery,
} from "@tanstack/react-query";
import type { PaginationResponse } from "~/types/pagination";

interface Args<T> {
  queryKey: QueryKey;
  queryFn: QueryFunction<PaginationResponse<T>, readonly unknown[], number>;
}

function usePagination<T>({ queryKey, queryFn }: Args<T>) {
  return useQuery({
    queryKey,
    queryFn,
    initialData: {
      data: [],
      pagination: {
        page: 1,
        total_page: 0,
        total_rows: 0,
      },
    },
  });
}

export default usePagination;
