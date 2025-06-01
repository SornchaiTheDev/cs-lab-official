import { useEffect } from "react";

interface Args {
  onActivate?: (event: MouseEvent) => void;
  ref?: React.RefObject<HTMLElement | null>;
}

function useOnClickOutside({ onActivate, ref }: Args) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current === null) {
        throw new Error("Ref is null. Please provide a valid ref.");
      }

      const target = event.target as HTMLElement;
      const isOutside = !ref?.current.contains(target);

      if (isOutside) {
        onActivate?.(event);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, onActivate]);
}

export default useOnClickOutside;
