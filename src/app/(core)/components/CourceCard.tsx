import Link from "next/link";

const CourseCard = () => {
  return (
    <Link
      href="/"
      className="rounded-xl bg-white shadow-sm  w-[400px] h-[200px] p-4 pr-8 flex flex-col justify-between border border-gray-6 hover:scale-105 transition-transform"
    >
      <div className="w-14 h-14 bg-gray-4 rounded-lg content-center text-center text-2xl">
        🖥️
      </div>
      <div className="space-y-0.5">
        <h6 className="text-sm">Sec 12 • Fri 14-16 pm</h6>
        <h4 className="font-semibold truncate">
          Fundamental Computing Concepts
        </h4>
        <h6 className="font-anuphan text-sm">อ.ศรชัย ลักษณะปิติ</h6>
      </div>
    </Link>
  );
};

export default CourseCard;
