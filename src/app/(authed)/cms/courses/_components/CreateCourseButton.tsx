"use client";

import { Plus } from "lucide-react";
import { Button } from "~/components/commons/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/commons/Dialog";
import Input from "~/components/commons/Input";
import { Label } from "~/components/ui/label";

function CreateCourseButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-4">
          <Plus size="1rem" />
          New course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <form>
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creator">Creator</Label>
              <Input id="creator" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full h-10" variant="primary">
                Close
              </Button>
            </DialogClose>
            <Button isLoading className="w-full h-10" variant="action">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCourseButton;
