import { Tooltip } from "@mantine/core";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { copyToClipboard } from "~/lib/copyToClipboard";
import { cn } from "~/lib/utils";
import useEditor from "../../hooks/useEditor";

function CopyButton() {
  const [isCopied, setIsCopied] = useState(false);
  const { code } = useEditor();

  const handleOnCopy = () => {
    copyToClipboard(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <Tooltip color="gray" label={isCopied ? "Copied" : "Copy"}>
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
    </Tooltip>
  );
}

export default CopyButton;
