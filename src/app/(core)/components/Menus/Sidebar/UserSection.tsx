import { motion } from "framer-motion";
import { DoorOpen, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useSession } from "~/providers/SessionProvider";

function UserSection() {
  const { user, signOut } = useSession();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="m-4 p-2 flex items-center gap-3 hover:bg-gray-4 rounded-lg"
        >
          <Image
            src={user.profileImage}
            alt={`${user.username}'s Profile`}
            className="rounded-xl shrink-0"
            width={36}
            height={36}
          />
          <div className="flex-1 space-y-0.5 grid text-left">
            <h4 className="text-sm font-medium truncate text-gray-12 leading-tight">
              {user.displayName}
            </h4>
            <h6 className="text-xs font-light text-gray-10">
              @{user.username}
            </h6>
          </div>
          <EllipsisVertical size="1rem" className="shrink-0 text-gray-11" />
        </motion.button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <div className="px-2 py-4 flex gap-3 rounded-lg">
          <Image
            src={user.profileImage}
            alt={`${user.username}'s Profile`}
            className="rounded-xl shrink-0 h-fit"
            width={36}
            height={36}
          />
          <div className="flex-1 space-y-0.5 grid text-left">
            <h4 className="text-sm font-medium truncate text-gray-12 leading-tight">
              {user.displayName}
            </h4>
            <h6 className="text-xs font-light text-gray-10">
              @{user.username}
            </h6>
            <div className="pt-1 space-x-1.5">
              {user.roles.map((role) => (
                <span
                  key={role}
                  className="bg-gray-2 border-gray-4 border text-gray-12 rounded-lg px-2 py-1 text-xs font-light"
                >
                  {role[0].toUpperCase() + role.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="p-2">
          <button
            onClick={signOut}
            className="flex items-center gap-1 hover:bg-gray-2 w-full pl-1.5 pr-4 py-2 rounded-lg"
          >
            <DoorOpen size="1rem" />
            <h6 className="text-sm">Sign out</h6>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserSection;
