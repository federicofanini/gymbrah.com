"use server";

import { prisma } from "@/packages/database/prisma";
import type { Prisma } from "@prisma/client";

export interface ExerciseResponse {
  success: boolean;
  data?: {
    exercises: any[];
    pagination: {
      total: number;
      pages: number;
      currentPage: number;
      limit: number;
    };
  };
  error?: string;
}

interface GetExercisesByBodyPartParams {
  bodyPart: string;
  page?: number;
  limit?: number;
}

export async function getExercisesByBodyPart({
  bodyPart,
  page = 1,
  limit = 10,
}: GetExercisesByBodyPartParams): Promise<{ data: ExerciseResponse }> {
  try {
    const skip = (page - 1) * limit;

    let where: any = {};

    // Handle the "all" case specially
    if (bodyPart !== "all") {
      where = {
        body_part: bodyPart,
      };
    }

    // Use prisma client directly to check if model exists
    if (!prisma.$queryRaw) {
      throw new Error("Database client is not properly initialized");
    }

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
      take: limit,
      orderBy: {
        name: "asc",
      },
    });

    return {
      data: {
        success: true,
        data: {
          exercises,
          pagination: {
            total: totalCount,
            pages: Math.ceil(totalCount / limit),
            currentPage: page,
            limit: limit,
          },
        },
      },
    };
  } catch (error) {
    console.error("Error fetching exercises by body part:", error);
    return {
      data: {
        success: false,
        error: "Failed to fetch exercises by body part",
      },
    };
  }
}
