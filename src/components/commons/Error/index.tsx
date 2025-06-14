import type { ChildrenProps } from "~/types/children-props";
import ErrorFallback from "./ErrorFallback";
import { ServerCrash } from "lucide-react";

interface Props extends ChildrenProps {
  isError?: boolean;
  fallback?: React.ReactNode;
}

function Error({ isError, fallback, children }: Props) {
  if (isError) {
    return (
      fallback ?? (
        <ErrorFallback
          icon={<ServerCrash size="2rem" />}
          title="Something went wrong"
          message={
            <>
              {" "}
              There was an error processing your request. <br /> Please try
              again later or report issue{" "}
              <a href="#" className="text-(--grass-9)">
                here
              </a>
              .
            </>
          }
          onRetry={() => {}}
        />
      )
    );
  }
  return children;
}

export default Error;
