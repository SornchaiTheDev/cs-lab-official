"use client";

import {
  flexRender,
  type VisibilityState,
  type Table as ITable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Inbox, SearchX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";
import PageSize from "./PageSize";
import TablePagination from "./TablePagination";
import TableSkeleton from "./TableSkeleton";
import { useMemo } from "react";

interface Props {
  table: ITable<any>;
  isLoading?: boolean;
  search?: string;
  totalData?: number;
}

function DataTable({ table, isLoading, search, totalData }: Props) {
  const visibleColumns = useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            table.getState().columnVisibility[
              column.id as keyof VisibilityState
            ] !== false,
        ),
    [table],
  );

  return (
    <div className="rounded-md border border-gray-4 overflow-hidden mt-4 h-full flex flex-col">
      <Table className="flex-1">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-2 h-9">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
                    <div
                      onClick={() => {
                        if (header.column.getCanSort()) {
                          header.column.toggleSorting();
                        }
                      }}
                      className={cn(
                        "flex gap-1.5 text-xs",
                        header.column.getCanSort() && "cursor-pointer",
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {{
                        asc: (
                          <ChevronDown size="1rem" className="text-gray-11" />
                        ),
                        desc: (
                          <ChevronUp size="1rem" className="text-gray-11" />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="flex-1">
          {isLoading ? (
            <TableSkeleton columns={visibleColumns} />
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-b last:border-none border-gray-4 h-9"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-1.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-[calc(100vh-300px)]"
              >
                <div className="h-full w-full flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-10">
                    {search && table.getState().globalFilter !== "" ? (
                      <>
                        <SearchX size="2.5rem" />
                        <p className="text-sm font-medium">
                          No results found for &ldquo;
                          {table.getState().globalFilter}&rdquo;
                        </p>
                        <p className="text-xs text-gray-9">
                          Try adjusting your search or filter to find what
                          you&apos;re looking for.
                        </p>
                      </>
                    ) : (
                      <>
                        <Inbox size="2.5rem" />
                        <p className="text-sm font-medium">
                          There is no data available
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="p-2 border-t border-gray-4 flex justify-between items-center">
        <p className="text-xs text-gray-10 tracking-wide">
          Total{" "}
          <span className="ml-1 text-gray-12 font-semibold">{totalData}</span>
        </p>
        <div className="flex items-center gap-4">
          <PageSize
            value={table.getState().pagination.pageSize}
            onChange={(value) => table.setPageSize(Number(value))}
          />
          <TablePagination
            totalPages={table.getPageCount()}
            currentPage={table.getState().pagination.pageIndex + 1}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      </div>
    </div>
  );
}

export default DataTable;
