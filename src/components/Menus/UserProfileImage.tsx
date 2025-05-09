import Image from "next/image";

interface Props {
  src: string | null;
  username: string;
}
function UserProfileImage({ src, username }: Props) {
  if (src === null) {
    return (
      <div className="w-9 h-9 rounded-full flex justify-center items-center bg-gray-3">
        <p className="text-sm font-medium text-gray-11">
          {username.charAt(0).toUpperCase()}
          {username.charAt(1).toLowerCase()}
        </p>
      </div>
    );
  }

  return (
    <Image
      {...{ src }}
      alt={`${username}'s profile image`}
      className="rounded-xl shrink-0"
      width={36}
      height={36}
    />
  );
}

export default UserProfileImage;
