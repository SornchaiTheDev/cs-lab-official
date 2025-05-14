"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type VisibilityState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { columns } from "../_datas/columns";
import { sampleUsers } from "../_datas/user.data";
import { Search, UserRoundPlus } from "lucide-react";
import FilterColumns from "./FilterColumns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import PageSize from "./PageSize";
import TablePagination from "./TablePagination";

function TableSection() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    Email: false,
    Username: false,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const table = useReactTable({
    data: sampleUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      columnVisibility,
      pagination,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    pageCount: Math.ceil(sampleUsers.length / pagination.pageSize),
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
      <div className="rounded-md border border-gray-4 overflow-hidden mt-4 h-full flex flex-col">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-2 h-9">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b last:border-none border-gray-4 h-9"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-1.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-16 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="p-2 border-t border-gray-4 flex justify-between items-center">
          <p className="text-xs text-gray-10 tracking-wide">
            Total <span className="ml-1 text-gray-12 font-semibold">{sampleUsers.length}</span>
          </p>
          <div className="flex items-center gap-4">
            <PageSize
              value={pagination.pageSize}
              onChange={(value) => table.setPageSize(Number(value))}
            />
            <TablePagination
              table={table}
              totalPages={table.getPageCount()}
              currentPage={table.getState().pagination.pageIndex + 1}
              onPageChange={(page) => table.setPageIndex(page - 1)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TableSection;
