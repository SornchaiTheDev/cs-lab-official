"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ChildrenProps } from "~/types/children-props";

const queryClient = new QueryClient();

function QueryProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
