"use server";

import { prisma } from "@/packages/database/prisma";

export interface ExercisesResponse {
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

    let where = {};

    // Add search filter if provided
    if (search && search.trim() !== "") {
      where = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { body_part: { contains: search, mode: "insensitive" } },
          { equipment: { contains: search, mode: "insensitive" } },
          { target: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const totalPromise = prisma.exercises.count({ where });
    const exercisesPromise = prisma.exercises.findMany({
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

    const [total, exercises] = await Promise.all([
      totalPromise,
      exercisesPromise,
    ]);

    return {
      data: {
        success: true,
        data: {
          exercises,
          pagination: {
            total,
            pages: Math.ceil(total / limit),
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
