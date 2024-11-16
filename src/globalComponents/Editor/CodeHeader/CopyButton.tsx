import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/globalComponents/ui/button";
import { copyToClipboard } from "~/lib/copyToClipboard";
import { cn } from "~/lib/utils";
import useEditor from "~/globalComponents/Editor/hooks/useEditor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/globalComponents/ui/tooltip";

function CopyButton() {
  const [isCopied, setIsCopied] = useState(false);
  const { code } = useEditor();

  const handleOnCopy = () => {
    copyToClipboard(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleOnCopy}
            variant="ghost"
            size="icon"
            className={cn(
              "flex-1",
              isCopied &&
                "bg-grass-3 text-grass-9 hover:bg-grass-3 hover:text-grass-9",
            )}
          >
            {isCopied ? <Check size="1rem" /> : <Copy size="1rem" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CopyButton;
