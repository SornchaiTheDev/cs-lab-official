import React from "react";

interface Props {
  role: string;
}
function UserRole({ role }: Props) {
  return (
    <span className="bg-gray-2 border-gray-4 border text-gray-12 rounded-lg px-2 py-1 text-xs font-light">
      {role[0].toUpperCase() + role.slice(1)}
    </span>
  );
}

export default UserRole;
