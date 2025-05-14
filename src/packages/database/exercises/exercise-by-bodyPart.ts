"use server";

import { prisma } from "@/packages/database/prisma";
import { CountResult } from "../types/db-types";

export interface Exercise {
  id: string;
  name: string | null;
  body_part: string | null;
  equipment: string | null;
  gif_url: string | null;
  target: string | null;
  secondary_muscles: string[];
  instructions: string[];
}

export interface ExerciseResponse {
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

    // Use prisma client directly to check if model exists
    if (!prisma.$queryRaw) {
      throw new Error("Database client is not properly initialized");
    }

    let totalCount: number;
    let exercises: Exercise[];

    if (bodyPart === "all") {
      // For "all" case - no filtering
      totalCount =
        await prisma.$queryRaw`SELECT COUNT(*)::int FROM "exercises"`.then(
          (res: unknown) => (res as CountResult[])[0].count
        );

      exercises = await prisma.$queryRaw`
        SELECT * FROM "exercises"
        ORDER BY name ASC
        LIMIT ${limit} OFFSET ${skip}
      `;
    } else {
      // For specific body part
      totalCount = await prisma.$queryRaw`
        SELECT COUNT(*)::int FROM "exercises" 
        WHERE body_part = ${bodyPart}
      `.then((res: unknown) => (res as CountResult[])[0].count);

      exercises = await prisma.$queryRaw`
        SELECT * FROM "exercises"
        WHERE body_part = ${bodyPart}
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
