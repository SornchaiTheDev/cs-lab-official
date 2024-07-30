import { ALargeSmall } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import useEditor from "../../hooks/useEditor";

interface FontSize {
  name: string;
  size: number;
}

const fontSizes: FontSize[] = [
  {
    name: "Smaller",
    size: 12,
  },
  {
    name: "Default",
    size: 16,
  },
  {
    name: "Larger",
    size: 20,
  },
  {
    name: "Largest",
    size: 24,
  },
];

function TextSizeButton() {
  const { fontSize, changeFontSize } = useEditor();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="flex-1">
          <ALargeSmall size="1rem" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs">Font Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fontSizes.map(({ name, size }) => (
          <DropdownMenuCheckboxItem
            key={name}
            className="text-xs"
            checked={fontSize === size}
            onCheckedChange={() => changeFontSize(size)}
          >
            {name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextSizeButton;
