import Image from "next/image";
import { cn } from "~/lib/utils";

interface Props {
  src?: string | null;
  username: string;
  size?: string;
  textSize?: string;
  className?: string;
}
function UserProfileImage({
  src,
  username,
  size = "2.25rem",
  textSize = "0.875rem",
  className = "",
}: Props) {
  if (src === null || src === undefined) {
    return (
      <div
        className={cn(
          "rounded-xl flex justify-center items-center bg-(--gray-3)",
          className,
        )}
        style={{ width: size, height: size }}
      >
        <p
          className="font-medium text-(gray-11)"
          style={{ fontSize: textSize }}
        >
          {username.charAt(0).toUpperCase()}
          {username.charAt(1).toLowerCase()}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-xl shrink-0 h-fit overflow-hidden",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image {...{ src }} fill alt={`${username}'s profile image`} />
    </div>
  );
}

export default UserProfileImage;
