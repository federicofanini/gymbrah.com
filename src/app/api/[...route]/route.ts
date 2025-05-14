import { handle } from "hono/vercel";

import { appRouter } from "@/packages/api";

const handler = handle(appRouter);
export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };
