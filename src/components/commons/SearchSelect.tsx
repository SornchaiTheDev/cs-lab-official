import { useEffect, useMemo, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/commons/Popover";
import Input from "./Input";
import type { ClassNameProps } from "~/types/classname-props";
import { cn } from "~/lib/utils";
import { ChevronDown } from "lucide-react";
import Loading from "./Loading";
import useInputDebounce from "~/hooks/useInputDebounce";
import { Skeleton } from "../ui/skeleton";

interface Props<T> extends ClassNameProps {
  value: T;
  options?: T[];
  placeholder?: string;
  children?: (options: T[]) => React.ReactNode;
  queryFn?: (query: string) => Promise<T[]>;
  isError?: boolean;
}

function SearchSelect<T extends { id: string; name: string }>({
  placeholder,
  className,
  value,
  options: initialOptions,
  children,
  queryFn,
  isError,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedInput = useInputDebounce(search, 1000);
  const [options, setOptions] = useState<T[]>(initialOptions ?? []);

  const [isLoading, setIsLoading] = useState(false);

  // close on select item
  useEffect(() => {
    setIsOpen(false);
    setSearch("");
  }, [value]);

  useEffect(() => {
    if (queryFn === undefined) return;
    if (!isOpen) return;

    const query = async () => {
      try {
        setIsLoading(true);
        const res = await queryFn(debouncedInput);
        setOptions(res);
      } finally {
        setIsLoading(false);
      }
    };
    query();
  }, [queryFn, debouncedInput, isOpen]);

  useEffect(() => {
    if (search.length > 0) {
      setIsOpen(true);
    }
  }, [search]);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const filteredOptions = useMemo(() => {
    if (queryFn === undefined) {
      if (initialOptions === undefined) return [];
      return initialOptions.filter((option) =>
        option.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return options;
  }, [options, search, initialOptions, queryFn]);

  const isEmpty = !isLoading && filteredOptions.length === 0;

  return (
    <Popover open={isOpen}>
      <PopoverTrigger
        ref={triggerRef}
        className={cn(
          "relative w-40 border bg-(--gray-2) rounded-md text-left px-2 h-9",
          isError && "border-(--red-9)",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className="text-sm w-10/12 truncate">{value.name}</h5>
        <ChevronDown
          size="1rem"
          id="search-select-chevron"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 text-(--gray-11)",
            isOpen && "rotate-180",
          )}
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popper-anchor-width) p-0 overflow-hidden flex flex-col max-h-100"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => {
          if (triggerRef.current?.contains(e.target as Node)) {
            return;
          }
          setIsOpen(false);
        }}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => {
          e.stopPropagation();
        }}
      >
        <Input
          value={search}
          id="search-select-input"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-(--gray-2) text-sm border-0 rounded-none focus-visible:border-0 px-2 py-1.5"
          {...{ placeholder }}
        />
        {!isEmpty && (
          <div className="p-1 border-t border-(--gray-6) flex-1 overflow-y-auto">
            <Loading
              {...{ isLoading }}
              fallback={
                <div className="space-y-2 mt-2">
                  <Skeleton className="w-full h-4 bg-(--gray-5)" />
                  <Skeleton className="w-full h-4 bg-(--gray-5)" />
                  <Skeleton className="w-full h-4 bg-(--gray-5)" />
                  <Skeleton className="w-full h-4 bg-(--gray-5)" />
                </div>
              }
            >
              {!!children && children(filteredOptions)}
            </Loading>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default SearchSelect;
