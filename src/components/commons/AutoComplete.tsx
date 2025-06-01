"use client";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverAnchor, PopoverContent } from "../ui/popover";
import Input from "./Input";
import useInputDebounce from "~/hooks/useInputDebounce";
import Loading from "./Loading";

interface Props<T extends { id: string | number }> {
  isError?: boolean;
  value: T[];
  onChange?: (value: T[]) => void;
  queryFn: (query: string) => Promise<T[]>;
  renderSelected: (option: T) => React.ReactNode;
  children?: (options: T[]) => React.ReactNode;
  loadingFallback?: React.ReactNode;
}

function AutoComplete<T extends { id: string | number }>({
  isError,
  value,
  onChange,
  queryFn,
  children,
  renderSelected,
  loadingFallback,
}: Props<T>) {
  const [inputValue, setInputValue] = useState("");

  const debouncedInput = useInputDebounce(inputValue, 1000);
  const [options, setOptions] = useState<T[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const memoizedQueryFn = useMemo(() => queryFn, [queryFn]);

  useEffect(() => {
    if (debouncedInput === "") return;
    const query = async () => {
      try {
        setIsLoading(true);
        const res = await memoizedQueryFn(debouncedInput);
        setOptions(res);
      } finally {
        setIsLoading(false);
      }
    };
    query();
  }, [memoizedQueryFn, debouncedInput]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue.length === 0) {
      e.preventDefault();
      if (value.length > 0) {
        const newValue = value.slice(0, -1);
        onChange?.(newValue);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const memoizedOptions = useMemo(
    () => options.filter((option) => !value.some((v) => v.id === option.id)),
    [options, value],
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(options.length > 0 || value.length > 0);
  }, [options.length, value.length]);

  return (
    <Popover open={isOpen || isLoading}>
      <PopoverAnchor className="w-full">
        <div
          onClick={handleDivClick}
          className="flex flex-wrap items-center border rounded-md p-2 min-h-10 gap-2"
        >
          {value.map((option) => renderSelected(option))}
          <Input
            {...{ isError }}
            ref={inputRef}
            value={inputValue}
            autoComplete="off"
            className="border-none w-fit p-0 h-auto"
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChange}
          />
        </div>
      </PopoverAnchor>
      <PopoverContent
        onInteractOutside={() => setIsOpen(false)}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onWheel={(e) => e.stopPropagation()}
        className="w-(--radix-popper-anchor-width) p-2 max-h-40 overflow-y-auto"
      >
        <Loading {...{ isLoading }} fallback={loadingFallback}>
          {!!children && children(memoizedOptions)}
        </Loading>
      </PopoverContent>
    </Popover>
  );
}

export default AutoComplete;
