import { routing } from "@/i18n/routing";
import { updateSession } from "@/utils/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import languineConfig from "./languine.json";

const locales = [
  ...languineConfig.locale.targets,
  languineConfig.locale.source,
];

const I18nMiddleware = createMiddleware({
  ...routing,
  locales,
  defaultLocale: languineConfig.locale.source,
  localePrefix: "always", // Force locale prefix
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if path starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale in path, redirect to default locale
  if (
    !pathnameHasLocale &&
    !pathname.match(/\.(jpg|png|gif|ico|svg|css|js)$/)
  ) {
    const defaultLocale = languineConfig.locale.source;
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  const response = await updateSession(request, I18nMiddleware(request));
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
