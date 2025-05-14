import { z } from "zod";

import type { ClientRequestOptions } from "hono";
import type { ClientResponse } from "hono/client";

type HandleReturn<
  T,
  E extends boolean,
  S extends z.ZodType | undefined = undefined
> = E extends true
  ? S extends z.ZodType
    ? z.infer<S>
    : T
  : S extends z.ZodType
  ? z.infer<S> | null
  : T | null;

const apiErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
  timestamp: z.string(),
  path: z.string(),
});

export const isAPIError = (e: unknown): e is z.infer<typeof apiErrorSchema> => {
  return apiErrorSchema.safeParse(e).success;
};

interface HandleOptions<
  E extends boolean = true,
  S extends z.ZodType | undefined = undefined
> {
  throwOnError?: E;
  schema?: S;
}

export const handle = <
  TResponse,
  TArgs,
  E extends boolean = true,
  S extends z.ZodType | undefined = undefined
>(
  fn: (
    args: TArgs,
    options?: ClientRequestOptions
  ) => Promise<ClientResponse<TResponse, number, "json">>,
  options: HandleOptions<E, S> = {}
) => {
  const { throwOnError = true as E, schema } = options;

  const handler = async (
    args?: TArgs,
    requestOptions?: ClientRequestOptions
  ): Promise<HandleReturn<TResponse, E, S>> => {
    const response = await fn(args as TArgs, requestOptions);

    let data: unknown;
    try {
      data = await response.json();
    } catch (e) {
      if (throwOnError) {
        throw new Error(
          e instanceof Error
            ? e.message
            : "Something went wrong. Please try again later."
        );
      }
      return null as HandleReturn<TResponse, E, S>;
    }

    if (!response.ok) {
      if (throwOnError) {
        throw new Error(
          isAPIError(data)
            ? data.message
            : "Something went wrong. Please try again later."
        );
      }
      return null as HandleReturn<TResponse, E, S>;
    }

    if (schema) {
      const result = schema.safeParse(data);
      if (!result.success) {
        if (throwOnError) {
          throw result.error;
        }
        return null as HandleReturn<TResponse, E, S>;
      }
      return result.data as HandleReturn<TResponse, E, S>;
    }

    return data as HandleReturn<TResponse, E, S>;
  };

  return Object.assign(handler, {
    __responseType: {} as HandleReturn<TResponse, E, S>,
  });
};

export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMillis: number
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out!")), timeoutMillis)
    ),
  ]);
};
