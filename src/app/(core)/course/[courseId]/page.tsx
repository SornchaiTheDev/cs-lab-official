import React from "react";
import LearnStatusCard, {
  type LearnStatus,
} from "./components/LearnStatusCard";
import Link from "~/components/commons/Link";
import { MoveLeft } from "lucide-react";
import { type Metadata } from "next";
import { timeout } from "~/lib/timeout";

export const generateMetadata = async ({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> => {
  const courses = [
    { name: "Fundamental Computing Concepts", id: "1" },
    { name: "Fundamental Programming", id: "2" },
  ];

  const course = courses.find((course) => course.id === params.courseId);
  await timeout(1000);

  return {
    title: `${course?.name} | CS Lab`,
  };
};

function MainCoursePage() {
  return (
    <div className="px-4 lg:px-12 py-4">
      <Link
        href="../../"
        className="flex items-center gap-2 text-gray-12 hover:text-gray-11 my-4 group"
      >
        <MoveLeft className="group-hover:-translate-x-2 transition-all" />
        <h5 className="text-sm">My Courses</h5>
      </Link>
      <div className="flex items-center bg-white rounded-b-xl gap-4 mt-4">
        <div className="w-14 h-14 bg-sand-3 rounded-lg content-center text-center text-2xl">
          🖥️
        </div>
        <div className="space-y-0.5 flex-1 overflow-hidden flex flex-col">
          <h6 className="text-sm  ">Sec 12 • Fri 14-16 pm</h6>
          <h4 className="font-semibold truncate">
            Fundamental Computing Concepts
          </h4>
          <h6 className="font-anuphan text-sm">อ.ศรชัย ลักษณะปิติ</h6>
        </div>
      </div>
      <div className="mt-10">
        <h5 className="text-xl font-medium">Lessons</h5>
        <div className="mt-4 mb-10 grid gap-x-4 gap-y-8 grid-cols-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <LearnStatusCard
              title="For Loops"
              subTitle={`Lesson 1.${i + 1}`}
              status={
                ["NONE", "SUCCESS", "FAILED", "IN_PROGRESS"][
                  Math.floor(Math.random() * 4)
                ] as LearnStatus
              }
              key={i}
            />
          ))}
        </div>
        <h5 className="text-xl font-medium">Labs</h5>
        <div className="mt-4 mb-10 grid gap-x-4 gap-y-8 grid-cols-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <LearnStatusCard
              title="For Loops"
              subTitle={`Lab 1.${i + 1}`}
              status="NONE"
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainCoursePage;
