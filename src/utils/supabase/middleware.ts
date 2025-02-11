import { type CookieOptions, createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { SKIP_SESSION_REFRESH_COOKIE } from "./utils";
import { setSkipSessionRefreshCookie } from "./utils";

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
          setSkipSessionRefreshCookie(response, true);
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response.cookies.set({ name, value: "", ...options });
          setSkipSessionRefreshCookie(response, false);
        },
      },
    }
  );

  // If the cookie is not set, check the remote session
  if (!request.cookies.get(SKIP_SESSION_REFRESH_COOKIE)) {
    await supabase.auth.getUser();
  }

  return response;
}
