"use server";

import { prisma } from "@/packages/database/prisma";

export interface ExerciseResponse {
  success: boolean;
  data?: {
    id: string;
    name: string;
    body_part: string;
    equipment: string;
    gif_url: string;
    target: string;
    secondary_muscles: string[];
    instructions: string[];
  };
  error?: string;
}

interface GetExerciseByIdParams {
  id: string;
}

export async function getExerciseById({
  id,
}: GetExerciseByIdParams): Promise<{ data: ExerciseResponse }> {
  try {
    const exercise = await prisma.exercises.findUnique({
      where: {
        id,
      },
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
    });

    if (!exercise) {
      return {
        data: {
          success: false,
          error: "Exercise not found",
        },
      };
    }

    return {
      data: {
        success: true,
        data: exercise,
      },
    };
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    return {
      data: {
        success: false,
        error: "Failed to fetch exercise",
      },
    };
  }
}
