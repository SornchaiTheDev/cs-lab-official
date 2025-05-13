"use client";
import {
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { columns } from "../_datas/columns";
import { sampleUsers } from "../_datas/user.data";
import { UsersTable } from "./UsersTable";
import { Search, UserRoundPlus } from "lucide-react";
import FilterColumns from "./FilterColumns";

function TableSection() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    Email: false,
    Username: false,
  });

  const table = useReactTable({
    data: sampleUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      columnVisibility,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <>
      <div className="flex justify-end items-center gap-2">
        <div className="relative pl-7 border border-gray-6 rounded-md w-64 h-8 flex items-center focus-within:ring-gray-9 focus-within:ring-2 hover:bg-gray-2">
          <Search
            size="1rem"
            className="absolute left-1.5 top-1/2 -translate-y-1/2"
          />
          <input
            placeholder="Search users"
            className="block text-sm w-full h-fit outline-none bg-transparent"
          />
        </div>
        <FilterColumns
          columns={table
            .getAllColumns()
            .filter((column) => column.getCanHide())}
        />
        <button className="px-3 py-1.5 border bg-gray-2 text-gray-11 text-sm rounded-md flex justify-center items-center gap-1.5 hover:bg-gray-3">
          <UserRoundPlus size="1rem" />
          Add User
        </button>
      </div>
      <UsersTable
        {...{ table }}
        className="mt-4 h-full"
        totalColumns={columns.length}
      />
    </>
  );
}

export default TableSection;
