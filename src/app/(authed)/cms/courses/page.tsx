import CreateCourseButton from "./_components/CreateCourseButton";
import CourseSection from "./CourseSection";

function CMSMainPage() {
  return (
    <div className="@container w-full max-w-[1920px] mx-auto h-screen flex flex-col">
      <div className="flex justify-between w-full">
        <h3 className="text-3xl font-medium">Courses</h3>
        <CreateCourseButton />
      </div>
      <CourseSection />
    </div>
  );
}

export default CMSMainPage;
