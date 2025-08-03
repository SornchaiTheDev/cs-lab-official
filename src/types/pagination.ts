export interface PaginationResponse<T> {
  pagination: {
    page: number;
    total_rows: number;
    total_page: number;
  };
  data: T[];
}

export interface PaginationRequestParams<T extends Record<string, any>> {
  page: number;
  pageSize: number;
  search: string;
  sortBy: keyof T | "";
  sortOrder: string;
}
