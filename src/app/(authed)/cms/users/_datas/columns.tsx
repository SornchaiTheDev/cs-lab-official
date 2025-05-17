"use client";

import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import type { User } from "~/types/user";
import {
  AtSign,
  Calendar,
  EllipsisVertical,
  Lock,
  Pencil,
  Shield,
  ShieldUser,
  Trash,
  UserPen,
  UserRound,
} from "lucide-react";
import { GoogleIcon } from "~/assets/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UserRole from "~/components/commons/UserRole";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import UserProfileImage from "~/components/Menus/UserProfileImage";

dayjs.extend(relativeTime);

const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.display({
    id: "select",
    size: 10,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
      />
    ),
  }),
  columnHelper.accessor("type", {
    id: "type",
    size: 10,
    enableSorting: true,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting()}
        className="flex gap-1.5 text-xs justify-center w-full"
      >
        <Shield size="1rem" /> Type
      </button>
    ),
    cell: ({ cell }) => {
      if (cell.getValue() === "credential")
        return <Lock size="1rem" className="mx-auto" />;
      return <GoogleIcon className="w-4 h-4 mx-auto" />;
    },
  }),
  columnHelper.accessor("username", {
    id: "username",
    enableSorting: true,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting()}
        className="flex gap-1.5 text-xs w-full"
      >
        <UserRound size="1rem" /> Username
      </button>
    ),
  }),
  columnHelper.accessor("email", {
    id: "email",
    enableSorting: true,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting()}
        className="flex gap-1.5 text-xs w-full"
      >
        <AtSign size="1rem" /> Email
      </button>
    ),
  }),
  columnHelper.accessor("profile_image", {
    id: "profile_image",
    size: 10,
    enableSorting: false,
    header: () => (
      <span className="flex gap-1.5 text-xs justify-center items-center">
        <UserRound size="1rem" /> Profile
      </span>
    ),
    cell: ({ cell, row }) => {
      const image = cell.getValue() as string;
      return (
        <div className="flex justify-center items-center">
          <UserProfileImage src={image} username={row.original.username} />
        </div>
      );
    },
  }),
  columnHelper.accessor("display_name", {
    id: "display_name",
    size: 200,
    enableSorting: true,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting()}
        className="flex gap-1.5 text-xs w-full"
      >
        <UserPen size="1rem" /> Display Name
      </button>
    ),
  }),
  columnHelper.accessor("roles", {
    id: "roles",
    size: 10,
    enableSorting: true,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting()}
        className="flex gap-1.5 text-xs w-full"
      >
        <ShieldUser size="1rem" /> Roles
      </button>
    ),
    cell: ({ cell }) => {
      const roles = cell.getValue() as string[];

      return (
        <div className="space-x-1.5">
          {roles.map((role) => (
            <UserRole key={role} {...{ role }} />
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor("created_at", {
    id: "created_at",
    enableSorting: true,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting()}
        className="flex gap-1.5 text-xs w-full"
      >
        <Calendar size="1rem" /> Created at
      </button>
    ),
    cell: ({ cell }) => {
      const date = cell.getValue();
      return dayjs(date).fromNow();
    },
  }),
  columnHelper.accessor("updated_at", {
    id: "updated_at",
    enableSorting: true,
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting()}
        className="flex gap-1.5 text-xs w-full"
      >
        <Calendar size="1rem" /> Updated at
      </button>
    ),
    cell: ({ cell }) => {
      const date = cell.getValue();
      return dayjs(date).fromNow();
    },
  }),
  columnHelper.display({
    id: "action",
    enableHiding: false,
    enableSorting: false,
    size: 10,
    cell: ({ table, row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center items-center">
            <EllipsisVertical size="1rem" className="text-gray-12" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="left"
            align="start"
            sideOffset={-2}
            alignOffset={200}
          >
            <DropdownMenuItem
              onClick={() => table.options.meta?.editUser(row.original.id)}
              className="flex items-center gap-2"
            >
              <Pencil size="1rem" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => table.options.meta?.deleteUser(row.original.id)}
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
] satisfies ColumnDef<User, any>[];
