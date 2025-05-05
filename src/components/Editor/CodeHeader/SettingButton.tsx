"use client"

import { Dialog } from "@radix-ui/react-dialog";
import { Settings } from "lucide-react";
import { Button } from "~/globalComponents/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/globalComponents/ui/dialog";
import { Label } from "~/globalComponents/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/globalComponents/ui/select";
import { Switch } from "~/globalComponents/ui/switch";
import useEditor from "~/globalComponents/Editor/hooks/useEditor";

const fontSizes: string[] = Array.from({ length: 10 }).map((_, i) =>
  (i * 2 + 12).toString(),
);

function SettingButton() {
  const { fontSize, changeFontSize, vimMode, setVimMode } = useEditor();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="flex-1">
          <Settings size="1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editor Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="vim-mode">Font Size</Label>

          <Select
            value={fontSize.toString()}
            onValueChange={(value) => changeFontSize(parseInt(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select Font size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}px
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="vim-mode" className="block">
            Vim mode
          </Label>
          <Switch
            id="vim-mode"
            checked={vimMode}
            onCheckedChange={setVimMode}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingButton;
