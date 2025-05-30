import type { MDXComponents } from "mdx/types";
import CodeBlock from "./components/Editor/CodeBlock";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: ({ children }) => (
      <code className="bg-(--gray-3) rounded-md p-1 border border-gray-6">
        {children}
      </code>
    ),
    CodeBlock,
    ...components,
  };
}
