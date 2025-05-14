import { cn } from "~/lib/utils";
import type { ChildrenProps } from "~/types/children-props";
import Loading from "./Loading";
import { Loader } from "lucide-react";

interface Props extends ChildrenProps {
  onClick?: () => void;
  variant?: "primary" | "danger";
  className?: string;
  isLoading?: boolean;
}

export const Button = ({
  onClick,
  variant,
  children,
  className,
  isLoading,
}: Props) => {
  let bgColor = "border-gray-6 bg-gray-2 hover:bg-gray-3";
  let textColor = "text-gray-11 hover:text-gray-12";

  switch (variant) {
    case "danger":
      bgColor = "border-red-6 bg-red-2 hover:bg-red-3";
      textColor = "text-red-11 hover:text-red-10";
      break;
  }

  return (
    <button
      {...{ onClick }}
      className={cn(
        "px-3 py-1.5 border text-sm rounded-md flex justify-center items-center gap-1.5",
        bgColor,
        textColor,
        className,
      )}
    >
      <Loading
        {...{ isLoading: !!isLoading }}
        fallback={<Loader className="animate-spin" size="1rem" />}
      >
        {children}
      </Loading>
    </button>
  );
};
