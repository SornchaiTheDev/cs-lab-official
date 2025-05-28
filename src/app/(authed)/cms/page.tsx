import React from "react";
import { cn } from "~/lib/utils";
import type { ChildrenProps } from "~/types/children-props";
import CourseCard from "../(core)/components/CourceCard";
import { Button } from "~/components/commons/Button";
import { Plus } from "lucide-react";

function CMSMainPage() {
  return (
    <div className="@container">
      <div className="flex justify-between w-full">
        <h3 className="text-3xl font-medium">Courses</h3>
        <Button className="my-4">
          <Plus size="1rem" />
          Create
        </Button>
      </div>
      <div className="grid grid-cols-12 mt-10 gap-x-4 gap-y-10">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}

export default CMSMainPage;

interface RoundedButtonProps extends ChildrenProps {
  isActive?: boolean;
}

const RoundedButton = ({ children, isActive }: RoundedButtonProps) => {
  return (
    <button
      className={cn(
        "px-8 py-1 rounded-full text-sm text-(--gray-11) hover:bg-(--gray-9) hover:text-(--gray-1) transition-colors",
        isActive && "bg-(--gray-12) text-(--gray-2)",
      )}
    >
      {children}
    </button>
  );
};
