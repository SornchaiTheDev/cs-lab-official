import { useParams } from "next/navigation";

function useResolvePath() {
  const params = useParams();

  if (Object.values(params).some((param) => typeof param === "object")) {
    const sameParams = Object.entries(params)
      .filter(([_, value]) => typeof value === "object")
      .map(([key]) => key);

    throw new Error(
      `There are some params that are the same (${sameParams.join(", ")})`,
    );
  }

  return (path: string) => {
    const replacer = (match: string) => {
      const key = match.slice(1);
      const path = (params[key] ? params[key] : match) as string;
      return path;
    };
    return path.replace(/:\w+/g, replacer);
  };
}

export default useResolvePath;
