import Image from "next/image";

interface Props {
  src?: string | null;
  username: string;
  size?: string;
  textSize?: string;
}
function UserProfileImage({
  src,
  username,
  size = "2.25rem",
  textSize = "0.875rem",
}: Props) {
  if (src === null || src === undefined) {
    return (
      <div
        className="rounded-xl flex justify-center items-center bg-(--gray-3)"
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
      className="relative rounded-xl shrink-0 h-fit overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image {...{ src }} fill alt={`${username}'s profile image`} />
    </div>
  );
}

export default UserProfileImage;
