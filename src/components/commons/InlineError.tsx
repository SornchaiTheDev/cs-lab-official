import { OctagonX } from "lucide-react";
import type { ChildrenProps } from "~/types/children-props";

interface Props extends ChildrenProps {
  isError?: boolean;
}

function InlineError({ children, isError }: Props) {
  if (!isError) return null;

  return (
    <div className="flex items-center gap-1 text-(--red-9)">
      <OctagonX size="1rem" />
      <p className="text-sm font-light">{children}</p>
    </div>
  );
}

export default InlineError;
