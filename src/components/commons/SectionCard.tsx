import Link from "~/components/commons/Link";
import { cn } from "~/lib/utils";
import type { ClassNameProps } from "~/types/classname-props";

const SectionCard = ({ className }: ClassNameProps) => {
  return (
    <Link
      href="/course/1"
      className={cn(
        "rounded-xl overflow-hidden flex flex-col justify-end group aspect-square bg-linear-to-t from-sky-500 to-indigo-500 border border-(--gray-4)",
        className,
      )}
    >
      <div className="flex justify-center items-center w-full h-full flex-1 min-h-[100px] text-6xl group-hover:text-[5rem] group-hover:rotate-45 transition-all">
        ✨
      </div>
      <div className="flex items-center gap-4 bg-white p-4 w-full">
        <div className="space-y-0.5 flex-1 overflow-hidden flex flex-col">
          <h6 className="text-xs">Sec 12 • Fri 14-16 pm</h6>
          <h4 className="font-semibold truncate text-sm">
            Fundamental Computing Concepts
          </h4>
          <h6 className="font-anuphan text-xs">
            อ.ศรชัย ลักษณะปิติ, อ.สุทธิพงษ์ หมื่นตาบุตร
          </h6>
        </div>
      </div>
    </Link>
  );
};

export default SectionCard;
