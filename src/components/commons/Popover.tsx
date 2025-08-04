import {
  PopoverTrigger,
  Popover,
  PopoverContent as ShadcnPopoverContent,
  PopoverAnchor,
} from "~/components/ui/popover";
import type * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "~/lib/utils";

const PopoverContent = ({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => {
  return (
    <ShadcnPopoverContent
      {...props}
      className={cn("bg-(--gray-2)", className)}
    />
  );
};

export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent };
