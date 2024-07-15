import CourseCard from "./components/CourceCard";

export default function Home() {
  return (
    <div className="pt-12">
      <h4 className="text-3xl font-semibold">My Courses</h4>

      <div className="py-10 flex flex-wrap gap-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <CourseCard key={i} />
        ))}
      </div>
    </div>
  );
}

