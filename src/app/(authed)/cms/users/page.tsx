import { UserRoundPlus } from "lucide-react";
import { UsersTable } from "./_components/UsersTable";
import { columns } from "./_datas/columns";
import { sampleUsers } from "./_datas/user.data";

function UsersManagementPage() {
  return (
    <div className="flex-1 flex flex-col">
      <h4 className="text-gray-12 text-2xl font-medium mt-4">
        Users Management
      </h4>
      <div className="flex justify-end">
        <button className="px-3 py-1.5 border bg-gray-2 text-gray-11 text-sm rounded-md flex justify-center items-center gap-1.5 hover:bg-gray-3">
          <UserRoundPlus size="1rem" />
          Add User
        </button>
      </div>
      <UsersTable
        className="mt-4 h-full"
        columns={columns}
        data={sampleUsers}
      />
    </div>
  );
}

export default UsersManagementPage;
