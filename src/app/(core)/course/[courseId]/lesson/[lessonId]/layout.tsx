import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
function LessonLayout({ children }: Props) {
  return (
    <div className="p-4 container mx-auto max-w-4xl lg:px-10 prose prose-code:before:content-none prose-code:after:content-none font-anuphan">
      {children}
    </div>
  );
}

export default LessonLayout;
