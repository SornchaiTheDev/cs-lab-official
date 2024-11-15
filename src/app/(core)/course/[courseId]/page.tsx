import React from "react";
import LearnStatusCard from "./_components/LearnStatusCard";
import { type Metadata } from "next";
import { timeout } from "~/lib/timeout";
import { myCourses } from "~/__mocks__/myCourses";

export const generateMetadata = async (
  props: {
    params: Promise<{ courseId: string }>;
  }
): Promise<Metadata> => {
  const params = await props.params;
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

async function MainCoursePage(props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  const { courseId } = params;
  const currentCourse = myCourses[0];
  const { lessons, labs } = currentCourse;
  return (
    <div className="px-4 lg:px-12 py-4">
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
          {lessons.map(({ name, status, subItems }, i) => {
            const firstLessonSlug = subItems[0].slug;
            return (
              <LearnStatusCard
                href={`/course/${courseId}/lesson/${firstLessonSlug}`}
                title={name}
                status={status}
                key={i}
              />
            );
          })}
        </div>
        <h5 className="text-xl font-medium">Labs</h5>
        <div className="mt-4 mb-10 grid gap-x-4 gap-y-8 grid-cols-12">
          {labs.map(({ name, status, subItems }, i) => {
            const firstLessonSlug = subItems[0].slug;
            return (
              <LearnStatusCard
                href={`/course/${courseId}/lab/${firstLessonSlug}`}
                title={name}
                status={status}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainCoursePage;
