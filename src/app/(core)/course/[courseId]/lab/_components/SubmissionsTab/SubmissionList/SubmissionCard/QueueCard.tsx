import { RefreshCcw } from "lucide-react";
import React from "react";

interface Props {
  order: number;
}

export function QueueCard({ order }: Props) {
  return (
    <div className="border flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-2 border-gray-6">
      <RefreshCcw />
      <div className="flex flex-col">
        <h5 className="font-medium text-gray-12">Submission #{order}</h5>
        <h6 className="text-xs text-gray-11">In Queue</h6>
      </div>
    </div>
  );
}
