import { Hono } from "hono";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { HttpStatusCode } from "@/packages/shared/constants";
import { HttpException } from "@/packages/shared/utils";

export const authRouter = new Hono().get("/", async (c) => {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser || !kindeUser.email) {
      throw new HttpException(HttpStatusCode.UNAUTHORIZED, {
        code: "UNAUTHORIZED",
        message: "Not authenticated or missing email",
      });
    }

    // Set redirect header to dashboard
    c.header("Location", "/");
    return c.json({ redirectTo: "/" }, 200);
  } catch (error) {
    console.error("Auth error:", error);
    throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get user information",
    });
  }
});
