import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createClient } from "../server";
import { getUserQuery, getUserAuthMetadata } from "./queries";

// Cache per request and revalidate every 30 minutes
export const getSession = cache(async () => {
  const supabase = await createClient();

  return supabase.auth.getSession();
});

// Cache per request and revalidate every 30 minutes
export const getUser = cache(async () => {
  const {
    data: { session },
  } = await getSession();

  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      // 30 minutes, jwt expires in 1 hour
      revalidate: 1800,
    }
  )();
});

// Cache per request and revalidate every 30 minutes
export const getUserMetadata = cache(async () => {
  const {
    data: { session },
  } = await getSession();

  if (!session?.user) {
    return null;
  }

  const supabase = await createClient();

  return unstable_cache(
    async () => {
      return getUserAuthMetadata(supabase);
    },
    ["user-metadata", session.user.id],
    {
      tags: [`user-metadata_${session.user.id}`],
      // 30 minutes, jwt expires in 1 hour
      revalidate: 1800,
    }
  )();
});
