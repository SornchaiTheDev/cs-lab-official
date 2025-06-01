"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverAnchor, PopoverContent } from "../ui/popover";
import Input from "./Input";
import useInputDebounce from "~/hooks/useInputDebounce";
import Loading from "./Loading";
import { SearchX } from "lucide-react";

interface Props<T extends { id: string | number }, K extends string | number> {
  isError?: boolean;
  value: K[];
  onChange?: (value: K[]) => void;
  queryFn: (query: string) => Promise<T[]>;
  renderSelected: (option: T) => React.ReactNode;
  children?: (options: T[]) => React.ReactNode;
  loadingFallback?: React.ReactNode;
}

function AutoComplete<
  T extends { id: string | number },
  K extends string | number,
>({
  isError,
  value,
  onChange,
  queryFn,
  children,
  renderSelected,
  loadingFallback,
}: Props<T, K>) {
  const [inputValue, setInputValue] = useState("");

  const debouncedInput = useInputDebounce(inputValue, 1000);
  const [options, setOptions] = useState<T[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const memoizedQueryFn = useMemo(() => queryFn, [queryFn]);

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (debouncedInput.length > 0) {
      setIsFirstRender(false);
    }

    if (isFirstRender) return;

    const query = async () => {
      try {
        setIsLoading(true);
        setIsOpen(true);
        const res = await memoizedQueryFn(debouncedInput);
        setOptions(res);
      } finally {
        setIsLoading(false);
      }
    };
    query();
  }, [memoizedQueryFn, debouncedInput, isFirstRender]);

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
    () => options.filter((option) => !value.some((v) => v === option.id)),
    [options, value],
  );

  const [selectedOptions, setSelectedOptions] = useState<T[]>([]);

  useEffect(() => {
    setSelectedOptions((prev) => {
      const currentSelectedOptions = prev.filter((option) =>
        value.some((v) => v === option.id),
      );

      const newSelectedOptions = options.filter(
        (option) =>
          value.some((v) => v === option.id) &&
          !currentSelectedOptions.some((o) => o.id === option.id),
      );

      return [...currentSelectedOptions, ...newSelectedOptions];
    });
  }, [value, memoizedOptions, options]);

  const isOptionEmpty =
    memoizedOptions.length === 0 && debouncedInput.length > 0 && !isLoading;

  return (
    <Popover open={isOpen && (isOptionEmpty || memoizedOptions.length > 0)}>
      <PopoverAnchor className="w-full">
        <div
          onClick={handleDivClick}
          className="flex flex-wrap items-center border rounded-md p-2 min-h-10 gap-2"
        >
          {selectedOptions.map((option) => renderSelected(option))}
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
          {isOptionEmpty ? (
            <div className="flex flex-col justify-center items-center gap-2 text-(--gray-11) my-2">
              <SearchX size="1.5rem" />
              <h6 className="text-sm">No options available</h6>
            </div>
          ) : (
            !!children && children(memoizedOptions)
          )}
        </Loading>
      </PopoverContent>
    </Popover>
  );
}

export default AutoComplete;
