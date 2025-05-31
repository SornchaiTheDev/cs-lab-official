import Link from "~/components/commons/Link";

const SectionCard = () => {
  return (
    <Link
      href="/course/1"
      className="rounded-xl drop-shadow-md flex flex-col justify-end group aspect-square bg-linear-to-t from-sky-500 to-indigo-500 col-span-4 @6xl:col-span-3"
    >
      <div className="flex justify-center items-center w-full h-full flex-1 min-h-[200px] text-6xl group-hover:text-[5rem] group-hover:rotate-45 transition-all">
        ✨
      </div>
      <div className="flex items-center rounded-b-xl gap-4 bg-white p-4 w-full">
        <div className="space-y-0.5 flex-1 overflow-hidden flex flex-col">
          <h6 className="text-sm">Sec 12 • Fri 14-16 pm</h6>
          <h4 className="font-semibold truncate">
            Fundamental Computing Concepts
          </h4>
          <h6 className="font-anuphan text-sm">
            อ.ศรชัย ลักษณะปิติ, อ.สุทธิพงษ์ หมื่นตาบุตร
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default SectionCard;
