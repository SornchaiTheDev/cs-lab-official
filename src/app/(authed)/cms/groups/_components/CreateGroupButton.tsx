"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Tag } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/commons/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/commons/Dialog";
import { addGroupSchema } from "../_schemas/add-group.schema";
import Label from "~/components/commons/Label";
import Input from "~/components/commons/Input";
import { useMutation } from "@tanstack/react-query";
import { groupService } from "~/services/group.service";
import { toast } from "sonner";
function CreateGroupButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isPending = false;
  const form = useForm({
    resolver: zodResolver(addGroupSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (name: string) => {
      await groupService.createGroup(name);
    },
    onSuccess: () => {
      toast.success("Group created successfully");
    },
  });

  const handleCreateGroup = async ({ name }: { name: string }) => {
    await mutateAsync(name);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Tag size="1rem" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="p-4">
          <DialogTitle>Add new Group</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleCreateGroup)}>
          <div className="p-4 space-y-4">
            <Label>Name</Label>
            <Input placeholder="Group name" />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              isLoading={isPending}
              disabled={isPending}
              className="bg-(--gray-12) text-(--gray-1) hover:bg-(--gray-11) hover:text-(--gray-2) py-2 w-full"
            >
              <Plus size="1rem" />
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateGroupButton;
