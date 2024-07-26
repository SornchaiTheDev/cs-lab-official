import type { ReactNode } from "react";
import PageControl from "../_components/PageControl";

interface Props {
  children: ReactNode;
}
 
function LessonLayout({ children }: Props) {
  return (
    <div className="relative">
      <div className="sticky p-4 top-0 border-b bg-white">
        <h5 className="text-gray-11 text-sm">Lesson 1.1</h5>
        <h2 className="text-2xl mt-1 font-medium">
          Repetition: <code>while</code>
        </h2>
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
