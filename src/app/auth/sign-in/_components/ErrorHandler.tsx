import { MessageSquareWarning } from "lucide-react";
import React from "react";

function ErrorAlert() {
  return (
    <div className="border-red-6 bg-red-4 rounded-lg w-full p-2 space-y-2 mt-4">
      <div className="flex items-center gap-1 text-red-9">
        <MessageSquareWarning size="1rem" />
        <h6 className="text-sm font-medium">Error</h6>
      </div>
      <p className="text-red-9 text-sm font-light">
        Your account couldn&apos;t be found.{" "}
        <a className="text-blue-9 hover:underline font-medium" href="#">
          Contact Admin
        </a>
      </p>
    </div>
  );
}

export default ErrorAlert;
