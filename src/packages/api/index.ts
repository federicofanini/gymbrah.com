import { ErrorHandler, Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";

import { timing } from "./middleware";
import { onError } from "./utils/on-error";
import { authRouter } from "./modules/auth/auth.router";

// Create the main app router
const appRouter = new Hono()
  .use(logger())
  .use(csrf())
  .use(
    cors({
      origin: [
        "https://api.telegram.org",
        "http://localhost:3000",
        process.env.NEXT_PUBLIC_API_URL!,
      ],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS", "HEAD"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  )
  .use(timing)
  .use("*", async (c, next) => {
    // Special handling for Telegram webhook requests
    if (c.req.path.includes("/telegram/webhook")) {
      // Skip CSRF for webhook endpoints
      return next();
    }
    return next();
  })
  .route("/api/user", authRouter)
  .onError(onError as ErrorHandler);

// Add a test endpoint to verify routing
appRouter.get("/api/test", (c) => c.json({ ok: true }));

type AppRouter = typeof appRouter;

export type { AppRouter };
export { appRouter };
