import type * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent as ShadcnDropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

function DropdownMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <ShadcnDropdownMenuContent
      {...props}
      className={cn(className, "bg-(--gray-2) text-(--gray-11) ")}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
};
