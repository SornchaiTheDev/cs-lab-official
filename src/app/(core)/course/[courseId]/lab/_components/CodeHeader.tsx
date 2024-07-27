import { ALargeSmall, CloudUpload, Copy, RotateCcw, SaveIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

function CodeHeader() {
  return (
    <div className="p-4 bg-white border-b border-gray-6 flex flex-wrap gap-4 justify-between items-center">
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
  );
}

export default CodeHeader;
