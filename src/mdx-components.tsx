import { Blockquote } from "@mantine/core";
import { Info } from "lucide-react";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: ({ children }) => (
      <code className="bg-gray-3 rounded-md p-1 border border-gray-6">
        {children}
      </code>
    ),
    blockquote: ({ children }) => (
      <Blockquote icon={<Info />} color="green">{children}</Blockquote>
    ),
    ...components,
  };
}
