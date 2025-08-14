"use client";
import SearchInput from "~/components/commons/SearchInput";
import { useState } from "react";
import UserGroupsTable from "./_components/UserGroupsTable";
import CreateGroupButton from "./_components/CreateGroupButton";

function GroupManagementPage() {
  const [search, setSearch] = useState("");
  return (
    <div className="flex-1 flex flex-col">
      <h4 className="text-(--gray-12) text-2xl font-medium">
        Groups Management
      </h4>

      <div className="flex justify-end items-center gap-2 mt-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search Group"
        />
        <CreateGroupButton />
      </div>

      <UserGroupsTable />
    </div>
  );
}

export default GroupManagementPage;
