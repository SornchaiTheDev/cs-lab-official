import { Atom, Settings } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

function Sidebar() {
  return (
    <nav className="w-[300px] bg-gray-2 flex flex-col justify-between fixed top-0 bottom-0">
      <div className="px-4 pt-4 py-2 flex gap-2 items-center">
        <Atom />
        <h6>CS Lab</h6>
      </div>
      <section className="ml-4 mr-2 flex-1 overflow-y-auto">
        <h6 className="text-gray-11 text-sm font-light sticky top-0 bg-gray-2 py-2">
          My Courses
        </h6>
        <div className="flex flex-col gap-4 mt-2 pr-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="w-10 h-10 bg-gray-4 rounded-lg content-center text-center text-xs">
                🖥️
              </div>
              <h3 className="truncate flex-1 text-sm">
                Fundamental Computing Concept
              </h3>
            </div>
          ))}
        </div>
      </section>
      <section className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/profile.png"
            width={40}
            height={40}
            className="rounded-full"
            alt="user profile image"
          />
          <div>
            <h5 className="font-anuphan text-sm">ศรชัย สมสกุล</h5>
          </div>
        </div>
        <Button variant="ghost" className="p-2">
          <Settings size="1.25rem" />
        </Button>
      </section>
    </nav>
  );
}

export default Sidebar;
