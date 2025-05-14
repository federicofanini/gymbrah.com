"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { prisma } from "@/lib/db";
import type { ActionResponse } from "../types/action-response";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  x_username: z.string().min(1, "X username is required"),
  role: z.string().min(1, "Role is required"),
  content: z.string().min(1, "Content is required"),
});

export const addReview = createSafeActionClient()
  .schema(schema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const review = await prisma.testimonials.create({
        data: {
          name: input.parsedInput.name,
          x_username: `https://x.com/${input.parsedInput.x_username}`,
          role: input.parsedInput.role,
          content: input.parsedInput.content,
        },
      });

      return {
        success: true,
        data: review,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to add review",
      };
    }
  });
