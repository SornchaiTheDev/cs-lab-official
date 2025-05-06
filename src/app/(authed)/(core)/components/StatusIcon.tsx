import { CircleCheck, CircleX, PlayCircle } from "lucide-react";
import React from "react";
import type { LearnStatus } from "../types";

interface Props {
  status: LearnStatus;
  size?: string | number;
}
function StatusIcon({ status, size }: Props) {
  switch (status) {
    case "PASSED":
      return (
        <CircleCheck
          {...{ size }}
          className="text-grass-11 group-hover:text-grass-11/50"
        />
      );
    case "FAILED":
      return (
        <CircleX
          {...{ size }}
          className="text-tomato-11 group-hover:text-tomato-11/50"
        />
      );
    case "IN_PROGRESS":
      return (
        <PlayCircle
          {...{ size }}
          className="text-amber-11 group-hover:text-amber-11/50"
        />
      );
    default:
      return null;
  }
}

export default StatusIcon;
