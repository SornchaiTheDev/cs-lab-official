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
    enableHiding: false,
    header: ({ table }) => (
      <div className="flex justify-center items-center">
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
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  }),
  columnHelper.accessor("type", {
    size: 10,
    id: "Type",
    header: () => (
      <span className="flex gap-1.5 text-xs justify-center">
        <Shield size="1rem" /> Type
      </span>
    ),
    cell: ({ cell }) => {
      if (cell.getValue() === "credential")
        return <Lock size="1rem" className="mx-auto" />;
      return <GoogleIcon className="w-4 h-4 mx-auto" />;
    },
  }),
  columnHelper.accessor("username", {
    id: "Username",
    header: () => (
      <span className="flex gap-1.5 text-xs">
        <UserRound size="1rem" /> Username
      </span>
    ),
  }),
  columnHelper.accessor("email", {
    id: "Email",
    header: () => (
      <span className="flex gap-1.5 text-xs">
        <AtSign size="1rem" /> Email
      </span>
    ),
  }),
  columnHelper.accessor("profileImage", {
    id: "Profile",
    size: 10,
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
  columnHelper.accessor("displayName", {
    id: "Display Name",
    size: 10,
    header: () => (
      <span className="flex gap-1.5 text-xs">
        <UserPen size="1rem" /> Display Name
      </span>
    ),
  }),
  columnHelper.accessor("roles", {
    id: "Roles",
    size: 10,
    header: () => (
      <span className="flex gap-1.5 text-xs">
        <ShieldUser size="1rem" /> Roles
      </span>
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
  columnHelper.accessor("createdAt", {
    id: "Created At",
    size: 10,
    header: () => (
      <span className="flex gap-1.5 text-xs">
        <Calendar size="1rem" /> Created at
      </span>
    ),
    cell: ({ cell }) => {
      const date = cell.getValue();
      return dayjs(date).fromNow();
    },
  }),
  columnHelper.accessor("updatedAt", {
    id: "Updated At",
    size: 10,
    header: () => (
      <span className="flex gap-1.5 text-xs">
        <Calendar size="1rem" /> Updated at
      </span>
    ),
    cell: ({ cell }) => {
      const date = cell.getValue();
      return dayjs(date).fromNow();
    },
  }),
  columnHelper.display({
    id: "action",
    enableHiding: false,
    size: 20,
    cell: () => {
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
            <DropdownMenuItem className="flex items-center gap-2">
              <Pencil size="1rem" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-red-9 focus:text-red-10">
              <Trash size="1rem" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
] satisfies ColumnDef<User, any>[];
