import type { ReactNode } from "react";
import PageControl from "../_components/PageControl";
import { CircleCheck } from "lucide-react";
import { Metadata } from "next";

interface Props {
  children: ReactNode;
}

export const generateMetadata = async ({
  params,
}: {
  params: { courseId: string; slug: string };
}): Promise<Metadata> => {
  const { courseId, slug } = params;
  const lessonName = "Lesson 1.1 Repetition: while";
  const isNotFit = lessonName.length > 32;
  let title = lessonName.slice(0, 32);

  if (isNotFit) title += "...";

  return {
    title: `${title} | CS Lab`,
  };
};

function LessonLayout({ children }: Props) {
  return (
    <div className="relative">
      <div className="sticky z-30 p-4 top-0 border-b bg-white flex gap-4 items-center shadow-sm">
        <CircleCheck size="2rem" className="text-grass-11" />
        <div className="space-y-1">
          <h5 className="text-gray-11 text-sm">Lesson 1.1</h5>
          <h2 className="text-2xl font-medium">
            Repetition: <code>while</code>
          </h2>
          <h4 className="text-sm">
            Status: <span className="text-grass-11 font-semibold">Passed</span>
          </h4>
        </div>
      </div>
      <div className="p-4 container mx-auto max-w-4xl lg:px-10 prose prose-code:before:content-none prose-code:after:content-none font-anuphan">
        {children}
        <PageControl
          nextPage={{
            slug: "something-easy",
            title: "Something Easy",
          }}
          prevPage={{
            slug: "something-fun",
            title: "Something Fun",
          }}
        />
      </div>
    </div>
  );
}

export default LessonLayout;
