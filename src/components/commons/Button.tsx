import { cn } from "~/lib/utils";
import Loading from "./Loading";
import { Loader } from "lucide-react";
import type { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  variant?: "primary" | "danger";
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
  let bgColor =
    "border-gray-6 bg-gray-2 hover:bg-gray-3 disabled:bg-gray-3 disabled:text-gray-11";
  let textColor = "text-gray-11 hover:text-gray-12";
  let activeColor = "bg-gray-3 text-gray-12";

  switch (variant) {
    case "danger":
      bgColor = "border-red-6 bg-red-2 hover:bg-red-3";
      textColor = "text-red-11 hover:text-red-10";
      activeColor = "bg-red-3 text-red-12";
      break;
  }

  return (
    <button
      type="button"
      {...{ onClick, ...props }}
      className={cn(
        "px-3 py-1.5 border text-sm rounded-md flex justify-center items-center gap-1.5",
        bgColor,
        textColor,
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
