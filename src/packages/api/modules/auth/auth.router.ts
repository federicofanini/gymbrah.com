import { Hono } from "hono";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { HttpStatusCode } from "@/packages/shared/constants";
import { HttpException } from "@/packages/shared/utils";
import { createUser } from "@/packages/database/create-user";

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

    // Create or get existing user in our database
    const user = await createUser({
      email: kindeUser.email,
      full_name: `${kindeUser.given_name || ""} ${
        kindeUser.family_name || ""
      }`.trim(),
      avatar_url: kindeUser.picture || undefined,
    });

    // Set redirect header to dashboard
    c.header("Location", "/dashboard");
    return c.json({ user, redirectTo: "/dashboard" }, 200);
  } catch (error) {
    console.error("Auth error:", error);
    throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get user information",
    });
  }
});
