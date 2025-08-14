"use client";
import {
  type SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import DataTable from "~/components/commons/DataTable";
import { columns } from "../_columns/groups.columns";
import useUserGroupPagination from "../_hooks/useUserGroupPagination";
import type { UserGroup } from "~/types/user-group";

function UserGroupsTable() {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: true,
    },
  ]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: groupPagination, isFetching } = useUserGroupPagination({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search: "",
    sortBy: (sorting[0]?.id as keyof UserGroup) ?? undefined,
  });

  const memoizedColumns = useMemo(() => columns, []);
  const table = useReactTable({
    data: groupPagination.data ?? [],
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
    pageCount: 1,
  });

  return <DataTable isLoading={isFetching} {...{ table }} />;
}

export default UserGroupsTable;
