import { cn } from "~/lib/utils";
import { Input as ShadcnInput } from "../ui/input";

function Input(props: React.ComponentProps<"input">) {
  return (
    <ShadcnInput {...props} className={cn("bg-(--gray-2) h-10 focus-visible:ring-0", props.className)} />
  );
}

export default Input;
