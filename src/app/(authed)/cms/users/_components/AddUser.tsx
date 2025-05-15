import { Lock, Plus, UserRoundPlus } from "lucide-react";
import { GoogleIcon } from "~/assets/icons";
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
  type CreateUserSchema,
  createUserSchema,
} from "../_schemas/create-user.schema";
import type { UserRole } from "~/types/user";
import { cn } from "~/lib/utils";
import { userService } from "~/services/user.service";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../_queries/key";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      display_name: "",
      type: "credential",
      roles: [],
    },
  });

  const isOauth = watch("type") === "oauth";
  const isCredential = watch("type") === "credential";

  const isError = (field: keyof CreateUserSchema) => !!errors[field];

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const handleCreateUser: SubmitHandler<CreateUserSchema> = async ({
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
    } catch (err) {
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

interface UserTypeProps {
  value: "credential" | "oauth" | null;
  onSelect: (value: "credential" | "oauth") => void;
}

const UserType = ({ value, onSelect }: UserTypeProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => onSelect("credential")}
        isActive={value === "credential"}
      >
        <Lock size="1rem" />
        Credential
      </Button>
      <Button onClick={() => onSelect("oauth")} isActive={value === "oauth"}>
        <GoogleIcon className="w-4 h-4 mx-auto" />
        OAuth
      </Button>
    </div>
  );
};

interface UserRoleProps {
  value: UserRole[];
  onSelect: (value: UserRole[]) => void;
}

const UserRole = ({ value, onSelect }: UserRoleProps) => {
  const handleOnSelect = (role: "admin" | "teacher" | "student") => {
    if (value.includes(role)) {
      onSelect(value.filter((r) => r !== role));
    } else {
      onSelect([...value, role]);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        isActive={value.includes("admin")}
        onClick={() => handleOnSelect("admin")}
      >
        Admin
      </Button>
      <Button
        isActive={value.includes("teacher")}
        onClick={() => handleOnSelect("teacher")}
      >
        Teacher
      </Button>
      <Button
        isActive={value.includes("student")}
        onClick={() => handleOnSelect("student")}
      >
        Student
      </Button>
    </div>
  );
};

export default AddUser;
