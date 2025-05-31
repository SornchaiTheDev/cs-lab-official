import { cn } from "~/lib/utils";
import { Input as ShadcnInput } from "../ui/input";

function Input(props: React.ComponentProps<"input">) {
  return (
    <ShadcnInput {...props} className={cn("bg-white shadow-none h-10 focus-visible:ring-0", props.className)} />
  );
}

export default Input;
