import { UsersRound } from "lucide-react";

function CourseCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-md col-span-4 @6xl:col-span-3">
      <div className="bg-linear-to-t from-sky-500 to-indigo-500 h-5"></div>
      <div className="p-4 space-y-2">
        <div>
        <h6 className="text-xs leading-tight">Name</h6>
        <h3 className="text-xl font-medium line-clamp-2">Fundamental Computing Concepts lksjdlajdljajldasdlajls</h3>
        </div>
        <div className="">
          <h6 className="text-xs leading-tight">Creator</h6>
          <h4 className="text-lg font-medium" >Sornchai Somsakul</h4>
        </div>
        <div className="flex items-center gap-2 text-(--gray-12)">
          <UsersRound size="1rem" />
          <span className="text-xs">10 students</span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
