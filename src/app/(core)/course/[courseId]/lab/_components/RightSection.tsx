"use client";

import { CirclePlay } from "lucide-react";
import { Button } from "~/components/ui/button";
import useDrag from "../hooks/useDrag";
import { cn } from "~/lib/utils";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import CodeHeader from "./CodeHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

function RightSection() {
  const { isDrag, size, containerRef, buttonRef, events } = useDrag({
    direction: "vertical",
  });

  return (
    <div className="flex-1 flex flex-col min-w-[300px]">
      <div
        ref={containerRef}
        style={{ minHeight: 200, height: size }}
        className="bg-white border rounded-lg overflow-hidden flex flex-col"
      >
        <CodeHeader />
        <div className="h-full overflow-auto">
          <CodeMirror height="100%" extensions={[python()]} />
        </div>
      </div>
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
      <div className="bg-white border rounded-lg flex flex-col flex-1 min-h-56 overflow-hidden">
        <div className="flex items-center gap-2 p-2">
          <h4 className="font-medium">Playground</h4>
          <Button className="space-x-2">
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

/**
 *
        <Tabs defaultValue="input" className="flex-1 flex flex-col min-h-0">
          <TabsList className="self-start w-full bg-white">
            <TabsTrigger
              value="input"
              className="data-[state=active]:bg-black data-[state=active]:text-gray-950"
            >
              Input
            </TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
          <TabsContent value="output">Change your password here.</TabsContent>
          <TabsContent value="input" className="flex-1 overflow-y-auto">
            <CodeMirror height="100%" />
          </TabsContent>
        </Tabs>
 */
