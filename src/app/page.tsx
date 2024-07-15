import { Atom } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen">
      <nav className="p-4 w-[300px] bg-gray-2 h-full">
        <div className="flex gap-2 items-center">
          <Atom />
          <h6>CS Lab</h6>
        </div>
      </nav>
    </div>
  );
}
