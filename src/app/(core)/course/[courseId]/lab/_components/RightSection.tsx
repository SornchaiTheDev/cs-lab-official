"use client";

import {
  ALargeSmall,
  CirclePlay,
  CloudUpload,
  Copy,
  RotateCcw,
  SaveIcon,
} from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import useDrag from "../hooks/useDrag";
import { cn } from "~/lib/utils";

function RightSection() {
  const { isDrag, size, containerRef, buttonRef, events } = useDrag({
    direction: "vertical",
  });

  return (
    <div className="flex-1 flex flex-col">
      <div
        ref={containerRef}
        className="bg-white border rounded-lg overflow-hidden"
        style={{ minHeight: 200, height: size }}
      >
        <div className="p-4 bg-white border-b border-gray-6 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Python3" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python3">Python3</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="c++">C++</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center text-gray-9 space-x-2">
              <SaveIcon size="1rem" />
              <h6 className="text-xs">Saved to local</h6>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Button variant="ghost" size="icon">
                <Copy size="1rem" />
              </Button>
              <Button variant="ghost" size="icon">
                <ALargeSmall size="1rem" />
              </Button>
              <Button variant="ghost" size="icon">
                <RotateCcw size="1rem" />
              </Button>
            </div>
            <Button className="space-x-2">
              <CloudUpload size="1rem" />
              <h6>Submit</h6>
            </Button>
          </div>
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
      <div className="flex-1 bg-white p-4 border rounded-lg">
        <div className="flex items-center gap-2">
          <h4 className="text-xl font-medium">Playground</h4>
          <Button className="space-x-2">
            <CirclePlay size="1rem" />
            <h6>Run</h6>
          </Button>
        </div>

        <Tabs
          defaultValue="input"
          className="mt-2 flex flex-col justify-start items-start"
        >
          <TabsList>
            <TabsTrigger value="input" className="flex gap-2 items-center">
              Input
            </TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
          <TabsContent
            value="desc"
            className="px-4 py-2 overflow-y-auto"
          ></TabsContent>
          <TabsContent value="subm">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default RightSection;
