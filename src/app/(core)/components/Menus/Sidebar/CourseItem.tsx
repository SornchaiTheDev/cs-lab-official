import { useState } from "react";
import StatusIcon from "../../StatusIcon";
import type { CourseItem } from "~/app/(core)/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "~/components/commons/Link";

const CourseItem = ({
  name,
  subItems,
  type,
  courseId,
}: CourseItem & { type: "lesson" | "lab"; courseId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-gray-12 flex items-center justify-between w-full"
      >
        {name}
        <div className="p-0 text-gray-10 w-4 h-4">
          {isOpen ? <ChevronUp size="1rem" /> : <ChevronDown size="1rem" />}
        </div>
      </button>

      {isOpen && (
        <ul className="space-y-4 mt-2">
          {subItems.map(({ name, slug, status }) => (
            <li key={slug} className="text-sm overflow-hidden">
              <Link
                href={`/course/${courseId}/${type}/${slug}`}
                className="grid grid-cols-12 items-center"
              >
                <div className="text-gray-12 flex justify-center items-center">
                  <StatusIcon {...{ status }} size="1rem" />
                </div>
                <p className="col-span-11 ml-2 truncate">{name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CourseItem;
