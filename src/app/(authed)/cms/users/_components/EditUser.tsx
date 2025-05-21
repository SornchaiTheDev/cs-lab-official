import { UserRoundPen } from "lucide-react";
import { Button } from "~/components/commons/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EditUserSchema,
  editUserSchema,
} from "../_schemas/write-user.schema";
import { cn } from "~/lib/utils";
import { userService } from "~/services/user.service";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../_queries/key";
import { toast } from "sonner";
import UserRole from "./UserRole";
import UserType from "./UserType";
import type { User } from "~/types/user";

type EditUser = Pick<
  User,
  "id" | "username" | "display_name" | "email" | "type" | "roles"
>;

interface Props {
  user: EditUser;
  onClose?: () => void;
}

const EditUser = ({ user, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      ...user,
      email: user.email || "",
      password: "",
    },
  });

  const isOauth = watch("type") === "oauth";
  const isCredential = watch("type") === "credential";

  const isError = (field: keyof EditUserSchema) => !!errors[field];

  const [isOpen, setIsOpen] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const handleEditUser: SubmitHandler<EditUserSchema> = async ({
    type,
    username,
    password,
    display_name,
    email,
    roles,
  }) => {
    try {
      setIsPending(true);
      if (type === "credential") {
        await userService.editCredentialUser(
          user.id,
          username,
          password,
          display_name,
          roles,
        );
      }

      if (type === "oauth") {
        await userService.editOauthUser(
          user.id,
          username,
          email!,
          display_name,
          roles,
        );
      }
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      reset();
      setIsOpen(false);
      if (!!onClose) onClose();
      toast.success("User edited successfully");
    } catch (err) {
      toast.error("Failed to edit user");
    } finally {
      setIsPending(false);
    }
  };

  const handleOnOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!!onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditUser)} className="space-y-4">
          <div className="space-y-1.5">
            <Label className={cn(isError("type") && "text-red-9")}>
              User Type
            </Label>
            <Controller
              name="type"
              {...{ control }}
              render={({ field: { onChange, value } }) => (
                <UserType value={value} onSelect={onChange} disabled />
              )}
            />
            {isError("type") && (
              <p className="text-red-9 text-sm font-light">
                {errors.type?.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className={cn(isError("username") && "text-red-9")}>
              Username
            </Label>
            <Input {...register("username")} />
            {isError("username") && (
              <p className="text-red-9 text-sm font-light">
                {errors.username?.message}
              </p>
            )}
          </div>
          {isCredential && (
            <div className="space-y-1.5">
              <Label className={cn(isError("password") && "text-red-9")}>
                New Password
              </Label>
              <Input type="password" {...register("password")} />
              <p
                className={cn(
                  "text-sm font-light",
                  isError("password") && "text-red-9",
                )}
              >
                password must have at least 8 characters
              </p>
            </div>
          )}
          <div className="space-y-1.5">
            <Label className={cn(isError("display_name") && "text-red-9")}>
              Display Name
            </Label>
            <Input {...register("display_name")} />
            {isError("display_name") && (
              <p className="text-red-9 text-sm font-light">
                {errors.display_name?.message}
              </p>
            )}
          </div>

          {isOauth && (
            <div className="space-y-1.5">
              <Label className={cn(isError("email") && "text-red-9")}>
                Email
              </Label>
              <Input {...register("email")} />
              {isError("email") && (
                <p className="text-red-9 text-sm font-light">
                  {errors.email?.message}
                </p>
              )}
            </div>
          )}
          <div className="space-y-1.5">
            <Label className={cn(isError("roles") && "text-red-9")}>
              Roles
            </Label>
            <Controller
              name="roles"
              {...{ control }}
              render={({ field: { onChange, value } }) => (
                <UserRole value={value} onSelect={onChange} />
              )}
            />
            {isError("roles") && (
              <p className="text-red-9 text-sm font-light">
                {errors.roles?.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            className="bg-gray-12 text-gray-1 hover:bg-gray-11 hover:text-gray-2 py-2 w-full"
          >
            <UserRoundPen size="1rem" />
            Edit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
