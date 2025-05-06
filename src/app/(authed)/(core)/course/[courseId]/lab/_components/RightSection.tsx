"use client";

import useDrag from "../hooks/useDrag";
import { cn } from "~/lib/utils";
import { useEffect, type RefObject } from "react";
import CodeMirror from "~/components/Editor/CodeMirror";
import useEditor, {
  type SetupEditor,
} from "~/components/Editor/hooks/useEditor";
import Playground from "~/components/Editor/Playground";
import CodeHeader from "~/components/Editor/CodeHeader";

function RightSection(props: SetupEditor) {
  const { isDrag, size, containerRef, buttonRef, events } = useDrag({
    direction: "vertical",
  });

  const {
    setup,
    fontSize,
    code,
    setCode,
    selectedLanguage,
    vimMode,
    initialCode,
  } = useEditor();

  useEffect(() => {
    setup(props);
  }, [props, setup]);

  return (
    <div className="flex-1 flex flex-col min-w-[300px]">
      <div
        ref={containerRef}
        style={{ minHeight: 200, height: size }}
        className="bg-white border rounded-lg overflow-hidden flex flex-col"
      >
        <CodeHeader />
        <div className="h-full overflow-auto">
          <CodeMirror
            height="100%"
            style={{ fontSize }}
            lang={selectedLanguage}
            value={code}
            onChange={setCode}
            vimMode={vimMode}
            initialCode={initialCode}
          />
        </div>
      </div>
      <VerticalSectionControl {...{ buttonRef, events, isDrag }} />
      <Playground />
    </div>
  );
}

export default RightSection;

const VerticalSectionControl = ({
  buttonRef,
  events,
  isDrag,
}: {
  buttonRef: RefObject<HTMLButtonElement | null>;
  events: {
    onMouseDown: () => void;
    onDoubleClick: () => void;
  };
  isDrag: boolean;
}) => {
  return (
    <button
      ref={buttonRef}
      className="flex justify-center my-1 w-full cursor-ns-resize"
      {...events}
    >
      <div
        className={cn(
          "w-12 h-1 bg-gray-6 rounded-full hover:w-14 transition-all",
          isDrag && "w-16",
        )}
      ></div>
    </button>
  );
};
