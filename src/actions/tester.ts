"use server";

import { z } from "zod";
import { createSafeActionClient } from "next-safe-action";
import type { ActionResponse } from "@/actions/types/action-response";
import { prisma } from "@/lib/db";

// Maximum number of testers allowed for each role
const MAX_BUSINESS_TESTERS = 100;
const MAX_ATHLETE_TESTERS = 100;

const testerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.string().optional(),
});

const deleteTesterSchema = z.object({
  id: z.string(),
});

export type TesterFormData = z.infer<typeof testerSchema>;

// Renamed to match the import in the component file
export const addTesterAction = createSafeActionClient()
  .schema(testerSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      const role = input.parsedInput.role || "athlete";

      // Check if maximum testers reached for role
      const count = await prisma.tester.count({
        where: { role },
      });

      const maxAllowed =
        role === "business" ? MAX_BUSINESS_TESTERS : MAX_ATHLETE_TESTERS;

      if (count >= maxAllowed) {
        return {
          success: false,
          error: `Maximum number of ${role} testers (${maxAllowed}) reached`,
        };
      }

      const tester = await prisma.tester.create({
        data: {
          email: input.parsedInput.email,
          role,
        },
      });
      return { success: true, data: tester };
    } catch (error) {
      return { success: false, error: "Failed to add tester" };
    }
  });

export const deleteTesterAction = createSafeActionClient()
  .schema(deleteTesterSchema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      await prisma.tester.delete({
        where: {
          id: input.parsedInput.id,
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to delete tester" };
    }
  });

export async function getTesters(): Promise<ActionResponse> {
  try {
    const testers = await prisma.tester.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        created_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return { success: true, data: testers };
  } catch (error) {
    return { success: false, error: "Failed to fetch testers" };
  }
}

export async function getTesterCounts(): Promise<ActionResponse> {
  try {
    const businessCount = await prisma.tester.count({
      where: { role: "business" },
    });

    const athleteCount = await prisma.tester.count({
      where: { role: "athlete" },
    });

    return {
      success: true,
      data: {
        business: {
          current: businessCount,
          maximum: MAX_BUSINESS_TESTERS,
          spotsLeft: MAX_BUSINESS_TESTERS - businessCount,
        },
        athlete: {
          current: athleteCount,
          maximum: MAX_ATHLETE_TESTERS,
          spotsLeft: MAX_ATHLETE_TESTERS - athleteCount,
        },
      },
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch tester counts" };
  }
}
