import { z } from "zod";

import { getStatusCode } from "@/packages/shared/utils";

import type { Context } from "hono";

const errorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
});

const isError = (e: unknown): e is z.infer<typeof errorSchema> => {
  return errorSchema.safeParse(e).success;
};

export const onError = async (
  e: unknown,
  c?: Context<{
    Bindings: { NODE_ENV: string };
    Variables: { locale: string };
  }>
) => {
  const details = {
    status: getStatusCode(e),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const timestamp = new Date().toISOString();
  const path = c?.req.raw.url ? new URL(c.req.raw.url).pathname : "/api";

  if (isError(e)) {
    console.log(e.code, e.message);

    return new Response(
      JSON.stringify({
        code: e.code,
        message: e.message || e.code || "An error occurred",
        status: details.status,
        timestamp,
        path,
      }),
      details
    );
  }

  return new Response(
    JSON.stringify({
      code: "ERROR",
      message: "An error occurred",
      status: details.status,
      path,
    }),
    details
  );
};
