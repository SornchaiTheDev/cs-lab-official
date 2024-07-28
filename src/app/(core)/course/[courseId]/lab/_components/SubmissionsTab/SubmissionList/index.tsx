import React from "react";
import { FailedCard, PassedCard, QueueCard } from "./SubmissionCard";

function SubmissionList() {
  return (
    <div className="space-y-4">
      <h4 className="text-gray-12 font-medium text-sm">Your Submissions</h4>
      <PassedCard order={3} totalCase={20} />
      <QueueCard order={2} />
      <FailedCard order={1} correctCase={10} totalCase={20} />
    </div>
  );
}

export default SubmissionList;
