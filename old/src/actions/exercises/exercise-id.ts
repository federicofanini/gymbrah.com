"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { prisma } from "@/lib/db";
import type { ActionResponse } from "../types/action-response";

const schema = z.object({
  id: z.string(),
});

export const getExerciseById = createSafeActionClient()
  .schema(schema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const exercise = await prisma.exercises.findUnique({
        where: { id: input.parsedInput.id },
        select: {
          id: true,
          name: true,
          body_part: true,
          equipment: true,
          target: true,
          secondary_muscles: true,
          instructions: true,
          gif_url: true,
        },
      });

      if (!exercise) {
        return {
          success: false,
          error: "Exercise not found",
        };
      }

      return {
        success: true,
        data: exercise,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch exercise",
      };
    }
  });
