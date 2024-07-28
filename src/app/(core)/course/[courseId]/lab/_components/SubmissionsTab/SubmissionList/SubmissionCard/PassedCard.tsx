import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
  order: number;
  totalCase: number;
}

export function PassedCard({ order, totalCase }: Props) {
  return (
    <div className="border flex items-center gap-2 px-4 py-2 rounded-lg bg-grass-2 border-grass-6">
      <CircleCheck className="text-grass-9" />
      <div className="flex flex-col">
        <h5 className="font-medium text-gray-12">Submission #{order}</h5>
        <div className="flex items-center gap-2 text-xs">
          <h6 className="text-grass-11 font-semibold">Passed</h6>
          <h6 className="text-gray-11">
            {totalCase}/{totalCase} Testcases
          </h6>
        </div>
      </div>
    </div>
  );
}
