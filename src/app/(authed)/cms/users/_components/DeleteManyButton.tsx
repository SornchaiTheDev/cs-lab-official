"use client";

import { Trash } from "lucide-react";
import { Button } from "~/components/commons/Button";
import UserProfileImage from "~/components/Menus/UserProfileImage";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { User } from "~/types/user";
interface Props {
  onClick?: () => void;
  users: User[];
}

function DeleteManyButton({ onClick, users }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...{ onClick }} variant="danger">
          <Trash size="1rem" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete these users? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-auto space-y-1.5">
          {users.map(({ id, display_name, profile_image, username }) => (
            <div key={id} className="flex items-center gap-2.5">
              <UserProfileImage src={profile_image} username={username} />
              <span className="text-sm text-gray-12">{display_name}</span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" variant="danger">
              Cancel
            </Button>
          </DialogClose>
          <Button isLoading className="w-full" variant="primary">
            <Trash size="1rem" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteManyButton;
