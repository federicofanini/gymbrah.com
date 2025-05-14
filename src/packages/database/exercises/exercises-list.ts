"use server";

import { prisma } from "@/packages/database/prisma";
import { Exercise } from "./exercise-by-bodyPart";
import { CountResult } from "@/packages/database/types/db-types";

export interface ExercisesResponse {
  success: boolean;
  data?: {
    exercises: Exercise[];
    pagination: {
      total: number;
      pages: number;
      currentPage: number;
      limit: number;
    };
  };
  error?: string;
}

interface GetExercisesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getExercises({
  page = 1,
  limit = 10,
  search = "",
}: GetExercisesParams = {}): Promise<{ data: ExercisesResponse }> {
  try {
    const skip = (page - 1) * limit;

    let totalCount: number;
    let exercises: Exercise[];

    if (search && search.trim() !== "") {
      const searchTerm = `%${search}%`;

      // With search filter
      totalCount = await prisma.$queryRaw`
        SELECT COUNT(*)::int FROM "exercises"
        WHERE 
          name ILIKE ${searchTerm} OR 
          body_part ILIKE ${searchTerm} OR 
          equipment ILIKE ${searchTerm} OR 
          target ILIKE ${searchTerm}
      `.then((res: unknown) => (res as CountResult[])[0].count);

      exercises = await prisma.$queryRaw`
        SELECT * FROM "exercises"
        WHERE 
          name ILIKE ${searchTerm} OR 
          body_part ILIKE ${searchTerm} OR 
          equipment ILIKE ${searchTerm} OR 
          target ILIKE ${searchTerm}
        ORDER BY name ASC
        LIMIT ${limit} OFFSET ${skip}
      `;
    } else {
      // Without search filter
      totalCount = await prisma.$queryRaw`
        SELECT COUNT(*)::int FROM "exercises"
      `.then((res: unknown) => (res as CountResult[])[0].count);

      exercises = await prisma.$queryRaw`
        SELECT * FROM "exercises"
        ORDER BY name ASC
        LIMIT ${limit} OFFSET ${skip}
      `;
    }

    return {
      data: {
        success: true,
        data: {
          exercises,
          pagination: {
            total: totalCount,
            pages: Math.ceil(totalCount / limit),
            currentPage: page,
            limit,
          },
        },
      },
    };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return {
      data: {
        success: false,
        error: "Failed to fetch exercises",
      },
    };
  }
}
