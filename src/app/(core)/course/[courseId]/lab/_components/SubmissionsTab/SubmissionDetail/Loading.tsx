import { Skeleton } from "~/components/ui/skeleton";
import React from "react";
import BackButton from "./BackButton";
import TestcaseTable from "./TestcaseTable";

function Loading() {
  return (
    <>
      <BackButton />
      <Skeleton className="w-full h-24" />
      <TestcaseTable isLoading />
    </>
  );
}

export default Loading;
