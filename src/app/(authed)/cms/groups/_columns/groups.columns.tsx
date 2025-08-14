import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  CaseSensitive,
  EllipsisVertical,
  Pencil,
  Trash,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/commons/DropDownMenu";
import { Checkbox } from "~/components/ui/checkbox";
import type { Group } from "~/types/user-group";

const columnHelper = createColumnHelper<Group>();

export const columns = [
  columnHelper.display({
    id: "select",
    size: 20,
    enableSorting: false,
    enableColumnFilter: false,
    header: ({ table }) => (
      <div className="mx-auto">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={row.getToggleSelectedHandler()}
          aria-label="Select row"
        />
      </div>
    ),
  }),
  columnHelper.accessor("name", {
    enableSorting: true,
    header: () => (
      <>
        <CaseSensitive size="1rem" /> Name
      </>
    ),
  }),
  columnHelper.accessor("user_amount", {
    enableSorting: true,
    header: () => (
      <span className="flex gap-1.5 text-xs">
        <UserRound size="1rem" /> User Amount
      </span>
    ),
  }),
  columnHelper.display({
    id: "action",
    enableColumnFilter: false,
    enableSorting: false,
    size: 10,
    cell: ({ table, row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center">
            <EllipsisVertical size="1rem" className="text-(--gray-12)" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="left"
            align="start"
            sideOffset={-2}
            alignOffset={200}
          >
            <DropdownMenuItem
              onClick={() =>
                table.options.meta?.addUser!.editUser(row.original.id)
              }
              className="flex items-center gap-2"
            >
              <Pencil size="1rem" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                table.options.meta?.addUser!.deleteUser(row.original.id)
              }
              className="flex items-center gap-2 text-red-9 focus:text-red-10"
            >
              <Trash size="1rem" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
] satisfies ColumnDef<Group, any>[];
