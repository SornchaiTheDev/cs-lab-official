import { cn } from "~/lib/utils";
import type { ChildrenProps } from "~/types/children-props";

interface AlertContainerProps extends ChildrenProps {
  className?: string;
}

export const AlertContainer = ({
  children,
  className,
}: AlertContainerProps) => {
  return (
    <div
      className={cn(
        "border-red-6 bg-red-4 rounded-lg w-full p-4 space-y-2 mt-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface AlertHeaderProps extends ChildrenProps {
  icon: React.ReactNode;
}

export const AlertHeader = ({ icon, children }: AlertHeaderProps) => {
  return (
    <div className="flex items-center gap-1 text-red-9">
      {icon}
      <h6 className="text-sm font-medium">{children}</h6>
    </div>
  );
};

interface AlertBodyProps extends ChildrenProps {
  className?: string;
}

export const AlertBody = ({ className, children }: AlertBodyProps) => {
  return <p className={cn("text-sm font-light", className)}>{children}</p>;
};
