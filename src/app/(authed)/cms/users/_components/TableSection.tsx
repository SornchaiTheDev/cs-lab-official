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
import useUserPagination from "../_hooks/useUserPagination";
import { mapUserColumnID } from "../_utils/mapColumnID";
import DeleteManyUsersButton from "./DeleteManyUsersButton";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import type { User } from "~/types/user";
import DeleteUserDialog from "./DeleteUserDialog";
import ImportUser from "./import-users";
import DataTable from "~/components/commons/DataTable";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../_queries/key";
import { userService } from "~/services/user.service";

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

  const { data: userPagination, isPending } = useUserPagination({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search,
    sortBy: (sorting[0]?.id as keyof User) ?? "created_at",
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
  });

  const userAmount = userPagination?.data.length ?? 0;

  const memoizedColumns = useMemo(() => columns, []);

  const table = useReactTable({
    data: userPagination.data,
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
      addUser: {
        editUser: (id: string) => {
          const user = userPagination.data.find((user) => user.id === id);
          if (user) {
            setEditUser(user);
          }
        },
        deleteUser: (id: string) => {
          const user = userPagination.data.find((user) => user.id === id);
          if (user) {
            setDeleteUser(user);
          }
        },
      },
    },
    autoResetPageIndex: false,
  });

  const isRowSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

  const queryClient = useQueryClient();
  const handleOnDeleteManyUsers = async () => {
    await userService.deleteManyUsers(
      userPagination.data
        .filter((user) => Object.keys(rowSelection).includes(user.id))
        .map((user) => user.id),
    );
    setRowSelection({});
    queryClient.refetchQueries({ queryKey: userKeys.all });
  };

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
          <DeleteManyUsersButton
            onConfirm={handleOnDeleteManyUsers}
            users={userPagination.data
              .filter((user) => Object.keys(rowSelection).includes(user.id))
              .map(({ display_name, username, profile_image }) => ({
                display_name,
                username,
                profile_image,
              }))}
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
        totalData={userPagination.pagination.total_rows}
      />
    </>
  );
}

export default TableSection;
