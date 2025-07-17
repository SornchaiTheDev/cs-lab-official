import Link from "next/link";
import UserProfileImage from "~/components/Menus/UserProfileImage";
import type { Course } from "~/types/cms-course";

function CourseCard({ id, name, creators }: Course) {
  const renderCreators = () => {
    const MAX_SHOW_CREATORS = 4;

    return (
      <div className="flex items-center mt-2">
        {creators
          .slice(0, MAX_SHOW_CREATORS)
          .map(({ id, display_name, profile_image }) => (
            <UserProfileImage
              className="-ml-1.5 first:ml-0"
              key={id}
              username={display_name}
              src={profile_image}
              textSize="12px"
              size="1.75rem"
            />
          ))}
        {creators.length > MAX_SHOW_CREATORS && (
          <UserProfileImage
            className="-ml-1.5"
            username={`+${creators.length - MAX_SHOW_CREATORS}`}
            textSize="12px"
            size="1.75rem"
          />
        )}
      </div>
    );
  };

  return (
    <Link
      href={`/cms/courses/${id}`}
      className="block rounded-md overflow-hidden bg-white border border-(--gray-4)"
    >
      <div className="bg-linear-to-t from-sky-500 to-indigo-500 h-5"></div>
      <div className="p-4 space-y-2 flex-1">
        <div>
          <h6 className="text-xs leading-tight">Name</h6>
          <h3 className="text-xl font-medium line-clamp-2 mt-2">{name}</h3>
        </div>
        <div>
          <h6 className="text-xs leading-tight">Creators</h6>
          {renderCreators()}
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
