import { zValidator } from "@hono/zod-validator";
import { env } from "hono/adapter";
import { createMiddleware } from "hono/factory";
import { getAuthUser } from "@/packages/auth/get-user";
import type { User } from "@/packages/auth/types";
import type { ValidationTargets } from "hono";
import type { ZodSchema } from "zod";
import { HttpStatusCode, NodeEnv } from "@/packages/shared/constants";
import { HttpException } from "@/packages/shared/utils";

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
export const enforceAuth = createMiddleware<{
  Variables: {
    user: User;
  };
}>(async (c, next) => {
  const user = await getAuthUser();

  if (!user) {
    throw new HttpException(HttpStatusCode.UNAUTHORIZED, {
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  c.set("user", user);
  await next();
});

/**
 * Middleware for adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
export const timing = createMiddleware<{
  Bindings: {
    NODE_ENV: string;
  };
}>(async (c, next) => {
  if (env(c).NODE_ENV === NodeEnv.DEVELOPMENT) {
    // artificial delay in dev 100-500ms
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  await next();
});

/**
 * Middleware for validating the request input using Zod.
 */
export const validate = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zValidator(target, schema, async (result) => {
    if (!result.success) {
      const error = result.error.errors[0];

      if (!error) {
        throw new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY, {
          code: "VALIDATION_ERROR",
          message: "Invalid request",
        });
      }

      throw new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY, {
        code: "VALIDATION_ERROR",
        message: error.message || "Invalid request",
      });
    }
  });
