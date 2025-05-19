"use client";
import {
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { columns } from "../_datas/columns";
import FilterColumns from "./FilterColumns";
import SearchData from "./SearchData";
import { useUserPagination } from "../_queries/pagination.queries";
import { mapUserColumnID } from "../_utils/mapColumnID";
import DeleteManyButton from "./DeleteManyButton";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import type { User } from "~/types/user";
import DeleteUserDialog from "./DeleteUserDialog";
import ImportUser from "./ImportUser";
import DataTable from "~/components/commons/DataTable";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    editUser: (id: string) => void;
    deleteUser: (id: string) => void;
  }
}

function TableSection() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    email: false,
    username: false,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "created_at",
      desc: true,
    },
  ]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [search, setSearch] = useState("");

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const handleOnSearch = useMemo(() => {
    let timeout: NodeJS.Timeout | null = null;
    return (globalFilter: string) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setSearch(globalFilter);
      }, 500);
    };
  }, []);

  useEffect(() => {
    handleOnSearch(globalFilter);
  }, [globalFilter, handleOnSearch]);

  const { data, isPending } = useUserPagination({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search,
    sortBy: sorting[0]?.id ?? "created_at",
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
  });

  const userAmount = data?.users.length ?? 0;

  const memoizedColumns = useMemo(() => columns, []);

  const table = useReactTable({
    data: data.users,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: false,
    manualFiltering: true,
    state: {
      columnVisibility,
      pagination,
      globalFilter,
      sorting,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    pageCount: Math.ceil(userAmount / pagination.pageSize),
    getRowId: (row) => row.id,
    meta: {
      editUser: (id: string) => {
        const user = data.users.find((user) => user.id === id);
        if (user) {
          setEditUser(user);
        }
      },
      deleteUser: (id: string) => {
        const user = data.users.find((user) => user.id === id);
        if (user) {
          setDeleteUser(user);
        }
      },
    },
    autoResetPageIndex: false,
  });

  const isRowSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

  return (
    <>
      {!!editUser && (
        <EditUser user={editUser} onClose={() => setEditUser(null)} />
      )}

      {!!deleteUser && (
        <DeleteUserDialog
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
        />
      )}

      <div className="flex justify-end items-center gap-2 mt-4">
        {isRowSelected && (
          <DeleteManyButton
            onSuccess={() => setRowSelection({})}
            users={data.users.filter((user) =>
              Object.keys(rowSelection).includes(user.id),
            )}
          />
        )}
        <SearchData
          className="h-full"
          value={globalFilter}
          onChange={setGlobalFilter}
        />
        <FilterColumns
          columns={table
            .getAllColumns()
            .filter((column) => column.getCanFilter())
            .map((col) => ({ ...col, id: mapUserColumnID(col.id) }))}
        />
        <AddUser />
        <ImportUser />
      </div>
      <DataTable
        {...{ table, isLoading: isPending, search }}
        totalData={data.pagination.total_rows}
      />
    </>
  );
}

export default TableSection;
