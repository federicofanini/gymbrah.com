"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { prisma } from "@/lib/db";
import type { ActionResponse } from "../types/action-response";
import { Prisma } from "@prisma/client";

const schema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  bodyPart: z.string().optional(),
  target: z.string().optional(),
  equipment: z.string().optional(),
  search: z.string().optional(),
});

export const getExercises = createSafeActionClient()
  .schema(schema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      // Calculate pagination values
      const skip = (input.parsedInput.page - 1) * input.parsedInput.limit;

      // Build where clause based on filters
      const where: Prisma.exercisesWhereInput = {};
      const conditions: Prisma.exercisesWhereInput[] = [];

      if (input.parsedInput.bodyPart) {
        conditions.push({ body_part: input.parsedInput.bodyPart });
      }

      if (input.parsedInput.target) {
        conditions.push({ target: input.parsedInput.target });
      }

      if (input.parsedInput.equipment) {
        conditions.push({ equipment: input.parsedInput.equipment });
      }

      if (input.parsedInput.search) {
        conditions.push({
          name: {
            contains: input.parsedInput.search,
            mode: "insensitive",
          },
        });
      }

      if (conditions.length > 0) {
        where.AND = conditions;
      }

      // Get total count for pagination
      const totalCount = await prisma.exercises.count({ where });

      // Fetch paginated exercises
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
      });

      return {
        success: true,
        data: {
          exercises,
          // pagination: {
          //   total: totalCount,
          //   pages: Math.ceil(totalCount / input.parsedInput.limit),
          //   currentPage: input.parsedInput.page,
          //   limit: input.parsedInput.limit,
          // },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch exercises",
      };
    }
  });
