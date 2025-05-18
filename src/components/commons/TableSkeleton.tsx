"use client";

import { TableCell, TableRow } from "~/components/ui/table";
import { Skeleton } from "~/components/ui/skeleton";
import type { Column } from "@tanstack/react-table";

interface TableSkeletonProps {
  columns: Column<any, unknown>[];
}

export default function TableSkeleton({ columns }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow
          key={index}
          className="border-b last:border-none border-gray-4 h-9"
        >
          {columns.map((column) => {
            // Customize skeleton based on column type
            let skeletonContent = <Skeleton className="h-4 w-24" />;

            if (column.id === "select" || column.id === "Type") {
              skeletonContent = (
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-4" />
                </div>
              );
            } else if (column.id === "Profile") {
              skeletonContent = (
                <div className="flex justify-center">
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              );
            } else if (column.id === "Roles") {
              skeletonContent = (
                <div className="flex gap-1.5">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              );
            } else if (
              column.id === "Created At" ||
              column.id === "Updated At"
            ) {
              skeletonContent = <Skeleton className="h-4 w-20" />;
            }

            return (
              <TableCell key={column.id} className="py-1.5">
                {skeletonContent}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
}
