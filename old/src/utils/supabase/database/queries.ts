import type { Client } from "../type";
import { prisma } from "@/lib/db";

export async function getUserQuery(supabase: Client, userId: string) {
  return prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
}

export async function getUserAuthMetadata(supabase: Client) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("User not found");
  }

  const metadata = user.user_metadata;
  const provider = user.app_metadata.provider;

  // Get current user data
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      avatar_url: true,
      full_name: true,
    },
  });

  // Only update avatar and full name if not already set
  if (!userData?.avatar_url || !userData?.full_name) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar_url: metadata.avatar_url,
        full_name: metadata.full_name,
      },
    });
  }

  // Map common fields between providers
  const userInfo = {
    avatar_url: metadata.avatar_url,
    full_name: metadata.full_name,
    email: metadata.email,
  };

  // Add provider-specific fields
  if (provider === "github") {
    return {
      ...userInfo,
      username: metadata.user_name,
      github: metadata.user_name,
      bio: metadata.bio,
      location: metadata.location,
      website: metadata.website,
    };
  }

  if (provider === "google") {
    return {
      ...userInfo,
      username: null,
      github: null,
      bio: null,
      location: null,
      website: null,
    };
  }

  return userInfo;
}
