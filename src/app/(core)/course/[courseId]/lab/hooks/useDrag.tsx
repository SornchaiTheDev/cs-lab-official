import { useEffect, useRef, useState } from "react";

interface Props {
  initialSize?: number;
  direction?: "horizontal" | "vertical";
}
function useDrag({ initialSize = 500, direction = "horizontal" }: Props) {
  const [isDrag, setIsDrag] = useState(false);
  const [size, setSize] = useState(initialSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDrag(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    if (!isDrag) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (direction === "horizontal") {
        const mousePosition = e.x;
        const containerOffset =
          containerRef.current?.getBoundingClientRect().x ?? 0;
        const dragButtonWidth = buttonRef.current?.clientWidth ?? 0;
        const buttonMargin = window.getComputedStyle(
          buttonRef.current!,
        ).marginLeft;

        const buttonMarginAmount =
          parseInt(buttonMargin.slice(0, buttonMargin.length - 2)) / 2;

        setSize(
          mousePosition -
            containerOffset -
            dragButtonWidth -
            buttonMarginAmount,
        );
      }

      if (direction === "vertical") {
        const mousePosition = e.y;
        const containerOffset =
          containerRef.current?.getBoundingClientRect().y ?? 0;
        const dragButtonHeight = buttonRef.current?.clientHeight ?? 0;
        const buttonMargin = window.getComputedStyle(
          buttonRef.current!,
        ).marginTop;

        const buttonMarginAmount =
          parseInt(buttonMargin.slice(0, buttonMargin.length - 2)) / 2;

        setSize(
          mousePosition -
            containerOffset -
            dragButtonHeight -
            buttonMarginAmount,
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDrag, direction]);

  const onDoubleClick = () => setSize(initialSize);
  const onMouseDown = () => setIsDrag(true);

  const events = { onMouseDown, onDoubleClick };

  return { isDrag, size, containerRef, buttonRef, events };
}

export default useDrag;
