"use server";

import { prisma } from "@/packages/database/prisma";

// Define the exercise type based on what we need
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
  data?: Exercise;
  error?: string;
}

interface GetExerciseByIdParams {
  id: string;
}

export async function getExerciseById({
  id,
}: GetExerciseByIdParams): Promise<{ data: ExerciseResponse }> {
  try {
    // Use prisma's raw query capability to get the exercise
    const exercises = await prisma.$queryRaw<Exercise[]>`
      SELECT * FROM "exercises" WHERE id = ${id} LIMIT 1
    `;

    const exercise = exercises[0];

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
