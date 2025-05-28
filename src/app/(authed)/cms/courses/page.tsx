import CourseCard from "~/components/commons/CourceCard";
import CreateCourseButton from "./_components/CreateCourseButton";

function CMSMainPage() {
  return (
    <div className="@container">
      <div className="flex justify-between w-full">
        <h3 className="text-3xl font-medium">Courses</h3>
        <CreateCourseButton />
      </div>
      <div className="grid grid-cols-12 mt-10 gap-x-4 gap-y-10">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}

export default CMSMainPage;
