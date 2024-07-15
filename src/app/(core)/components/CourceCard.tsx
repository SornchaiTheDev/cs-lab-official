import Link from "next/link";

const CourseCard = () => {
  return (
    <Link
      href="/course/1"
      className="rounded-xl bg-white drop-shadow-md h-[200px] col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3 flex flex-col justify-end group bg-gradient-to-br from-grass-6 to-grass-10 noise"
    >
      <div className="flex items-center bg-white rounded-b-xl p-4 gap-4 group-hover:bg-grass-2">
        <div className="w-14 h-14 bg-sand-3 rounded-lg content-center text-center text-2xl group-hover:bg-grass-3">
          🖥️
        </div>
        <div className="space-y-0.5 flex-1 overflow-hidden flex flex-col">
          <h6 className="text-sm  group-hover:text-grass-9">
            Sec 12 • Fri 14-16 pm
          </h6>
          <h4 className="font-semibold truncate group-hover:text-grass-9">
            Fundamental Computing Concepts
          </h4>
          <h6 className="font-anuphan text-sm  group-hover:text-grass-9">
            อ.ศรชัย ลักษณะปิติ
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
