"use client";
import { X } from "lucide-react";
import AutoComplete from "~/components/commons/AutoComplete";
import { Skeleton } from "~/components/ui/skeleton";
import { timeout } from "~/lib/timeout";

type UserGroups = { id: string; name: string }[];

interface Props {
  value: UserGroups;
  onChange: (value: UserGroups) => void;
  isError?: boolean;
}

function UserGroups({ value, onChange, isError }: Props) {
  const queryGroups = async (query: string): Promise<UserGroups> => {
    await timeout(1000);
    return [
      { name: "POSN", id: "1" },
      { name: "โครงการเรียนล่วงหน้า", id: "2" },
      { name: "TOI", id: "3" },
    ];
  };

  return (
    <AutoComplete
      queryOnRender
      {...{ value, onChange, isError }}
      renderSelected={(group) => (
        <button
          key={group.id}
          type="button"
          className="flex items-center px-2 py-1 gap-2 bg-(--gray-4) text-(--gray-11) text-sm rounded-md"
        >
          {group.name}
          <X
            size="0.8rem"
            onClick={() => onChange(value.filter((v) => v.id !== group.id))}
          />
        </button>
      )}
      queryFn={queryGroups}
      loadingFallback={Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center px-2 py-1.5 gap-2">
          <Skeleton className="w-32 h-4 rounded" />
        </div>
      ))}
    >
      {(options) =>
        options.map((group) => (
          <button
            className="flex items-center px-2 py-1.5 gap-2 hover:bg-gray-100 cursor-pointer w-full rounded-md text-sm"
            key={group.id}
            onClick={() => onChange([...value, group])}
          >
            {group.name}
          </button>
        ))
      }
    </AutoComplete>
  );
}

export default UserGroups;
