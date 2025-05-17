import { Button } from "~/components/commons/Button";
import type { UserRole } from "~/types/user";

interface UserRoleProps {
  value: UserRole[];
  onSelect: (value: UserRole[]) => void;
}

const UserRole = ({ value, onSelect }: UserRoleProps) => {
  const handleOnSelect = (role: "admin" | "teacher" | "student") => {
    if (value.includes(role)) {
      onSelect(value.filter((r) => r !== role));
    } else {
      onSelect([...value, role]);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        isActive={value.includes("admin")}
        onClick={() => handleOnSelect("admin")}
      >
        Admin
      </Button>
      <Button
        isActive={value.includes("teacher")}
        onClick={() => handleOnSelect("teacher")}
      >
        Teacher
      </Button>
      <Button
        isActive={value.includes("student")}
        onClick={() => handleOnSelect("student")}
      >
        Student
      </Button>
    </div>
  );
};

export default UserRole;
