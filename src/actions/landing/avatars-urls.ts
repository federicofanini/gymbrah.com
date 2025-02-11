"use server";

import { createSafeActionClient } from "next-safe-action";
import { prisma } from "@/lib/db";
import type { ActionResponse } from "../types/action-response";

export const getAvatarUrls = createSafeActionClient().action(
  async (): Promise<ActionResponse> => {
    try {
      const users = await prisma.user.findMany({
        select: {
          avatar_url: true,
        },
        where: {
          avatar_url: {
            not: null,
          },
        },
        take: 10,
        orderBy: {
          created_at: "desc",
        },
      });

      const avatarUrls = users.map((user) => ({
        imageUrl: user.avatar_url as string,
        profileUrl: "#", // Added profileUrl to match Avatar type
      }));

      return {
        success: true,
        data: avatarUrls,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch avatar URLs",
      };
    }
  }
);
