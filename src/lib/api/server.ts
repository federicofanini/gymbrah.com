import { hc } from "hono/client";
import { headers } from "next/headers";

import { getBaseUrl } from "./utils";

import type { AppRouter } from "@/packages/api";

export const { api } = hc<AppRouter>(getBaseUrl(), {
  headers: async () => ({
    ...Object.fromEntries((await headers()).entries()),
    "x-api-source": "web-server",
  }),
});
