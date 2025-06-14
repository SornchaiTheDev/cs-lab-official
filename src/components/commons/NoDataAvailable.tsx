import { Telescope } from "lucide-react";

function NoDataAvailable() {
  return (
    <div className="p-4 flex flex-col justify-center items-center gap-4 flex-1">
      <div className="bg-(--gray-3) rounded-full p-4 text-(--gray-11)">
        <Telescope size="2rem" />
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-medium text-(--gray-12) text-center">
          No Data Available
        </h4>
        <p className="text-(--gray-11) text-center">
          There is no data available to display at the moment. <br /> Please
          check back later or try a different search.
        </p>
      </div>
    </div>
  );
}

export default NoDataAvailable;
