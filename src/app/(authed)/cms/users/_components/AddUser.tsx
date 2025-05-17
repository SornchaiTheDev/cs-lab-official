import { Plus, UserRoundPlus } from "lucide-react";
import { Button } from "~/components/commons/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type AddUserSchema,
  addUserSchema,
} from "../_schemas/write-user.schema";
import { cn } from "~/lib/utils";
import { userService } from "~/services/user.service";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../_queries/key";
import { toast } from "sonner";
import UserRole from "./UserRole";
import UserType from "./UserType";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      username: "",
      display_name: "",
      type: "credential",
      roles: [],
    },
  });

  const isOauth = watch("type") === "oauth";
  const isCredential = watch("type") === "credential";

  const isError = (field: keyof AddUserSchema) => !!errors[field];

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const handleCreateUser: SubmitHandler<AddUserSchema> = async ({
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
        await userService.createCredentialUser(
          username,
          password,
          display_name,
          roles,
        );
      }

      if (type === "oauth") {
        await userService.createOauthUser(
          username,
          display_name,
          email!,
          roles,
        );
      }
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
      reset();
      setIsOpen(false);
      toast.success("User created successfully");
    } catch (err) {
      toast.error("Failed to create user");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserRoundPlus size="1rem" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new user</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-4">
          <div className="space-y-1.5">
            <Label className={cn(isError("type") && "text-red-9")}>
              User Type
            </Label>
            <Controller
              name="type"
              {...{ control }}
              render={({ field: { onChange, value } }) => (
                <UserType value={value} onSelect={onChange} />
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
                Password
              </Label>
              <Input type="password" {...register("password")} />
              {isError("password") && (
                <p className="text-red-9 text-sm font-light">
                  {errors.password?.message}
                </p>
              )}
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
            <Plus size="1rem" />
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;
