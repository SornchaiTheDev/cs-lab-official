"use client";
import {
  flexRender,
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
import { UserRoundPlus, Inbox, SearchX } from "lucide-react";
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
import SearchData from "./SearchData";
import { useUserPagination } from "../_queries/pagination.queries";
import TableSkeleton from "./TableSkeleton";
import { mapUserColumnID } from "../_utils/mapColumnID";
import DeleteManyButton from "./DeleteManyButton";

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

  const { data, isLoading } = useUserPagination({
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
  });

  const isRowSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

  return (
    <>
      <div className="flex justify-end items-center gap-2">
        {isRowSelected && (
          <DeleteManyButton
            users={data.users.filter((user) =>
              Object.keys(rowSelection).includes(user.id),
            )}
          />
        )}
        <SearchData value={globalFilter} onChange={setGlobalFilter} />
        <FilterColumns
          columns={table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((col) => ({ ...col, id: mapUserColumnID(col.id) }))}
        />
        <button className="px-3 py-1.5 border bg-gray-2 text-gray-11 text-sm rounded-md flex justify-center items-center gap-1.5 hover:bg-gray-3">
          <UserRoundPlus size="1rem" />
          Add User
        </button>
      </div>
      <div className="rounded-md border border-gray-4 overflow-hidden mt-4 h-full flex flex-col">
        <Table className="flex-1">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-2 h-9">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
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
          <TableBody className="flex-1">
            {isLoading ? (
              <TableSkeleton columnVisibility={columnVisibility} />
            ) : table.getRowModel().rows?.length ? (
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
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-[calc(100vh-300px)]"
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-gray-10">
                      {search ? (
                        <>
                          <SearchX size="2.5rem" />
                          <p className="text-sm font-medium">
                            No results found for &ldquo;{globalFilter}&rdquo;
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
            <span className="ml-1 text-gray-12 font-semibold">
              {userAmount}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <PageSize
              value={pagination.pageSize}
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
    </>
  );
}

export default TableSection;
