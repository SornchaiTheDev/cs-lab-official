import { useEffect, useState } from "react";
import StatusIcon from "../../StatusIcon";
import type { CourseItem } from "~/app/(core)/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "~/components/commons/Link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

const CourseItem = ({
  name,
  subItems,
  type,
  courseId,
}: CourseItem & { type: "lesson" | "lab"; courseId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const { slug } = useParams();

  useEffect(() => {
    const isInCourseItem = subItems.some(({ slug }) => pathname.includes(slug));
    setIsOpen(isInCourseItem);
  }, [pathname, subItems]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-gray-12 flex items-center justify-between w-full"
      >
        {name}
        <div className="p-0 text-gray-10 w-6 h-6 rounded-md hover:bg-gray-3 hover:text-gray-10 flex justify-center items-center">
          {isOpen ? <ChevronUp size="1rem" /> : <ChevronDown size="1rem" />}
        </div>
      </button>

      {isOpen && (
        <ul className="space-y-2 mt-2">
          {subItems.map(({ name, slug: _slug, status }) => (
            <li key={_slug} className="text-sm overflow-hidden">
              <Link
                href={`/course/${courseId}/${type}/${_slug}`}
                className={cn(
                  "grid grid-cols-12 items-center p-2 rounded-md hover:bg-gray-3",
                  _slug === slug && "bg-gray-4",
                )}
              >
                <div className="text-gray-12 flex justify-center items-center">
                  <StatusIcon {...{ status }} size="1rem" />
                </div>
                <p
                  className={cn(
                    "col-span-11 ml-2 truncate text-gray-12",
                  )}
                >
                  {name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CourseItem;
