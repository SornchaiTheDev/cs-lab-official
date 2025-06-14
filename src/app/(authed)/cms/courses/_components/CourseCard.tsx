import Link from "next/link";
import { Fragment } from "react";
import type { Course } from "~/types/cms-course";

function CourseCard({ id, name, creators }: Course) {
  const renderCreators = () => {
    const MAX_SHOW_CREATORS = 2;

    return (
      <>
        <div className="flex items-center gap-1">
          {creators
            .slice(0, MAX_SHOW_CREATORS)
            .map(({ id, display_name }, index) => (
              <Fragment key={id}>
                <h4 className="text-lg font-medium">{display_name}</h4>
                {creators.length > 1 && index < MAX_SHOW_CREATORS - 1 && (
                  <h4 className="text-lg font-medium">&</h4>
                )}
              </Fragment>
            ))}
        </div>

        {creators.length > MAX_SHOW_CREATORS && (
          <h6 className="text-xs text-gray-500">
            +{creators.length - MAX_SHOW_CREATORS} more
          </h6>
        )}
      </>
    );
  };

  return (
    <Link
      href={`/courses/${id}`}
      className="block rounded-xl overflow-hidden bg-white shadow-md col-span-12 @2xl:col-span-6 @5xl:col-span-4 @7xl:col-span-3"
    >
      <div className="bg-linear-to-t from-sky-500 to-indigo-500 h-5"></div>
      <div className="p-4 space-y-2 flex-1">
        <div>
          <h6 className="text-xs leading-tight">Name</h6>
          <h3 className="text-xl font-medium line-clamp-2">{name}</h3>
        </div>
        <div>
          <h6 className="text-xs leading-tight">Creator</h6>
          {renderCreators()}
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
