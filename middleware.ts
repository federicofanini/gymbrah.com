import { routing } from "@/i18n/routing";
import { updateSession } from "@/utils/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

const I18nMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = await updateSession(request, I18nMiddleware(request));

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
