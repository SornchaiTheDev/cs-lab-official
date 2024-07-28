import { CircleX } from "lucide-react";
import React from "react";

interface Props {
  order: number;
  correctCase: number;
  totalCase: number;
}

export function FailedCard({ order, correctCase, totalCase }: Props) {
  return (
    <div className="border flex items-center gap-2 px-4 py-2 rounded-lg bg-tomato-2 border-tomato-6">
      <CircleX className="text-tomato-9" />
      <div className="flex flex-col">
        <h5 className="font-medium text-gray-12">Submission #{order}</h5>
        <div className="flex items-center gap-2 text-xs">
          <h6 className="text-tomato-11 font-semibold">Failed</h6>
          <h6 className="text-gray-11">
            {correctCase}/{totalCase} Testcases
          </h6>
        </div>
      </div>
    </div>
  );
}
