"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { prisma } from "@/lib/db";
import type { ActionResponse } from "../types/action-response";
import { Prisma } from "@prisma/client";

const schema = z.object({
  bodyPart: z.string(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const getExercisesByBodyPart = createSafeActionClient()
  .schema(schema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const skip = (input.parsedInput.page - 1) * input.parsedInput.limit;

      const where: Prisma.exercisesWhereInput = {
        body_part: input.parsedInput.bodyPart,
      };

      const totalCount = await prisma.exercises.count({ where });

      const exercises = await prisma.exercises.findMany({
        where,
        select: {
          id: true,
          name: true,
          body_part: true,
          equipment: true,
          gif_url: true,
          target: true,
          secondary_muscles: true,
          instructions: true,
        },
        skip,
        take: input.parsedInput.limit,
        orderBy: {
          name: "asc",
        },
        cacheStrategy: {
          ttl: 60 * 60, // 1 hour
        },
      });

      return {
        success: true,
        data: {
          exercises,
          pagination: {
            total: totalCount,
            pages: Math.ceil(totalCount / input.parsedInput.limit),
            currentPage: input.parsedInput.page,
            limit: input.parsedInput.limit,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch exercises by body part",
      };
    }
  });
