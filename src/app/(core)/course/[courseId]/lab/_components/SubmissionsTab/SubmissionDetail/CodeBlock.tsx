import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { Button } from "~/components/ui/button";
import { Copy } from "lucide-react";

const hardCode = `print("Hello World")





`;

function CodeBlock() {
  return (
    <div className="mt-4 mb-2 space-y-2">
      <div className="flex justify-between items-center">
        <h6 className="text-sm font-semibold text-gray-11">Code | Python3</h6>
        <Button variant="secondary" size="sm" className="text-gray-11 space-x-2">
          <Copy size="0.75rem" />
          <span className="text-xs font-medium">Copy</span>
        </Button>
      </div>
      <div className="border rounded-lg h-64 overflow-y-auto">
        <CodeMirror
          readOnly
          extensions={[python()]}
          value={hardCode}
          height="100%"
        />
      </div>
    </div>
  );
}

export default CodeBlock;
