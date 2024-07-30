import { RotateCcw } from "lucide-react";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import useEditor from "../../hooks/useEditor";

function ResetButton() {
  const [isTapped, setIsTapped] = useState(false);
  const { resetEditor } = useEditor();

  const handleOnReset = () => {
    resetEditor();
    setIsTapped(false);
  };
  return (
    <>
      <Dialog open={isTapped} onOpenChange={setIsTapped}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will reset your code editor to initial state
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleOnReset} variant="destructive">
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => setIsTapped(true)}
        variant="ghost"
        size="icon"
        className="flex-1"
      >
        <RotateCcw size="1rem" />
      </Button>
    </>
  );
}

export default ResetButton;
