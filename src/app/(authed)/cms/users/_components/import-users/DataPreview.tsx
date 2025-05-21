import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import type { CreateUser } from "~/types/user";
import { createUserColumns } from "../../_datas/create-user-columns";
import SearchData from "../SearchData";
import DataTable from "~/components/commons/DataTable";
import DeleteManyUserButton from "../DeleteManyUsersButton";
import { Button } from "~/components/commons/Button";
import { ArrowLeft, Import } from "lucide-react";

interface Props {
  users: CreateUser[];
  onDeleteUsers: (usernames: string[]) => void;
  onBack?: () => void;
}

const DataPreview = ({ users, onDeleteUsers, onBack }: Props) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    columns: createUserColumns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: false,
    data: users,
    state: {
      globalFilter,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.username,
    meta: {
      userPreview: {
        deleteUser: (username: string) => {
          onDeleteUsers([username]);
        },
      },
    },
  });

  const isRowSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

  const handleOnDeleteManyUsers = () => {
    const users = Object.keys(rowSelection);
    onDeleteUsers(users);
    setRowSelection({});
  };

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center gap-1.5 w-fit text-sm text-gray-12 hover:text-gray-11"
        onClick={onBack}
      >
        <ArrowLeft size="1rem" />
        Back
      </button>
      <div className="flex justify-end gap-1.5">
        {isRowSelected && (
          <DeleteManyUserButton
            onConfirm={handleOnDeleteManyUsers}
            users={users.filter((user) =>
              Object.keys(rowSelection).includes(user.username),
            )}
          />
        )}
        <SearchData
          className="h-[34px] self-end"
          value={globalFilter}
          onChange={setGlobalFilter}
        />
      </div>
      <DataTable
        {...{ table }}
        className="h-[400px]"
        totalData={users.length}
        hidePagination
      />
      <div className="flex justify-end mt-2 gap-1.5">
        <Button variant="action" className="px-8">
          <Import size="1rem" />
          Import
        </Button>
      </div>
    </div>
  );
};

export default DataPreview;
