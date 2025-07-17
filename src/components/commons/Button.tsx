import { cn } from "~/lib/utils";
import Loading from "./Loading";
import { Loader } from "lucide-react";
import type { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  variant?: "primary" | "danger" | "action";
  className?: string;
  isLoading?: boolean;
  isActive?: boolean;
  children: ReactNode;
}

export const Button = ({
  onClick,
  variant,
  children,
  className,
  isLoading,
  isActive,
  ...props
}: Props) => {
  let normalColor = "border-(--gray-6) bg-(--gray-2) hover:bg-(--gray-3) text-(--gray-11)";
  let activeColor =
    "bg-(--gray-12) hover:bg-(--gray-12) hover:text-(--gray-1) text-(--gray-1)";

  switch (variant) {
    case "danger":
      normalColor =
        "border-(--red-6) bg-(--red-2) hover:bg-(--red-3) text-(--red-11) hover:text-(--red-10)";
      activeColor =
        "bg-(--red-3) text-(--red-12) text-(--red-11) hover:text-(--red-10)";
      break;
    case "action":
      normalColor =
        "border-(--gray-6) bg-(--gray-12) hover:bg-(--gray-11) active:bg-(--gray-10) text-(--gray-2) hover:text-(--gray-1)";
      break;
  }

  return (
    <button
      type="button"
      {...{ onClick, ...props }}
      className={cn(
        "px-3 py-1.5 border text-xs rounded-md flex justify-center items-center gap-1.5 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-(--gray-7) focus:ring-offset-2 transition-colors",
        normalColor,
        isActive && activeColor,
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
