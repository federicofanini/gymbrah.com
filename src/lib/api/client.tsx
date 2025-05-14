"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { hc } from "hono/client";

import { createQueryClient, getBaseUrl } from "./utils";

import type { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "@/packages/api";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

export const { api } = hc<AppRouter>(getBaseUrl(), {
  headers: {
    "x-api-source": "web-client",
  },
});

export function ApiProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
