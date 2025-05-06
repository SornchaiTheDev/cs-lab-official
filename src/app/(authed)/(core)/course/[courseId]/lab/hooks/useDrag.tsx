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
    const handleDragEnd = () => {
      setIsDrag(false);
    };

    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, []);

  useEffect(() => {
    if (!isDrag) return;

    const dragHandler = (position: { x: number; y: number }) => {
      if (direction === "horizontal") {
        const pointerPosition = position.x;
        const containerOffset =
          containerRef.current?.getBoundingClientRect().x ?? 0;
        const dragButtonWidth = buttonRef.current?.clientWidth ?? 0;
        const buttonMargin = window.getComputedStyle(
          buttonRef.current!,
        ).marginLeft;

        const buttonMarginAmount =
          parseInt(buttonMargin.slice(0, buttonMargin.length - 2)) / 2;

        setSize(
          pointerPosition -
            containerOffset -
            dragButtonWidth -
            buttonMarginAmount,
        );
      }

      if (direction === "vertical") {
        const pointerPosition = position.y;
        const containerOffset =
          containerRef.current?.getBoundingClientRect().y ?? 0;
        const dragButtonHeight = buttonRef.current?.clientHeight ?? 0;
        const buttonMargin = window.getComputedStyle(
          buttonRef.current!,
        ).marginTop;

        const buttonMarginAmount =
          parseInt(buttonMargin.slice(0, buttonMargin.length - 2)) / 2;

        setSize(
          pointerPosition -
            containerOffset -
            dragButtonHeight -
            buttonMarginAmount,
        );
      }
    };

    const handleMouseMove = (e: MouseEvent) =>
      dragHandler({ x: e.clientX, y: e.clientY });

    const handleTouchMove = (e: TouchEvent) => {
      dragHandler({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDrag, direction]);

  const onDoubleClick = () => setSize(initialSize);
  const onMouseDown = () => setIsDrag(true);
  const onTouchStart = () => setIsDrag(true);

  const events = { onMouseDown, onDoubleClick, onTouchStart };

  return { isDrag, size, containerRef, buttonRef, events };
}

export default useDrag;
