"use client";

import useDrag from "../hooks/useDrag";
import { cn } from "~/lib/utils";
import CodeHeader from "./CodeHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useEffect, type RefObject } from "react";
import CodeMirror from "./CodeMirror";
import useEditor, { type SetupEditor } from "../hooks/useEditor";
import { Button } from "~/components/ui/button";
import { CirclePlay } from "lucide-react";

function RightSection(props: SetupEditor) {
  const { isDrag, size, containerRef, buttonRef, events } = useDrag({
    direction: "vertical",
  });

  const { setup, fontSize, code, setCode, selectedLanguage } = useEditor();

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
          />
        </div>
      </div>
      <VerticalSectionControl {...{ buttonRef, events, isDrag }} />
      <div className="bg-white border rounded-lg flex flex-col flex-1 min-h-56 overflow-hidden">
        <div className="flex justify-between items-center gap-2 p-2">
          <h4 className="font-medium text-gray-12 text-sm">Playground</h4>
          <Button className="space-x-2 w-fit" variant="outline" size="sm">
            <CirclePlay size="1rem" />
            <h6>Run</h6>
          </Button>
        </div>

        <Tabs defaultValue="input" className="min-h-0 flex-1 flex flex-col">
          <TabsList className="self-start">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
          <TabsContent value="input" className="flex-1 overflow-auto">
            <CodeMirror height="100%" />
          </TabsContent>
          <TabsContent value="output" className="flex-1 overflow-auto">
            <CodeMirror height="100%" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default RightSection;

const VerticalSectionControl = ({
  buttonRef,
  events,
  isDrag,
}: {
  buttonRef: RefObject<HTMLButtonElement>;
  events: {
    onMouseDown: () => void;
    onDoubleClick: () => void;
  };
  isDrag: boolean;
}) => {
  return (
    <button
      ref={buttonRef}
      className="flex justify-center my-2 w-full cursor-ns-resize"
      {...events}
    >
      <div
        className={cn(
          "w-12 h-2 bg-gray-6 rounded-full hover:w-14 transition-all",
          isDrag && "w-16",
        )}
      ></div>
    </button>
  );
};
