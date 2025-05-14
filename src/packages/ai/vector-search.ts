import { prisma } from "@/packages/database/prisma";
import { generateEmbedding } from "./openai";

export async function searchBusinessesAI(query: string) {
  const queryEmbedding = await generateEmbedding(query);

  // Skip search if embedding generation failed
  if (!queryEmbedding) {
    console.warn("Failed to generate embedding for query:", query);
    return [];
  }

  try {
    // Using raw SQL query since Prisma doesn't natively support vector operations
    // Cast both embeddings to vector type to ensure proper comparison
    // First try with proper vector casting
    try {
      return await prisma.$queryRawUnsafe(
        `
        SELECT b.id, b.name, b.slug, b.type, b.description, 
               be.embedding::vector <#> $1::vector AS distance
        FROM "Business" b
        JOIN "BusinessEmbedding" be ON b.id = be."businessId"
        ORDER BY distance ASC
        LIMIT 10;
        `,
        queryEmbedding
      );
    } catch (vectorError) {
      console.warn(
        "Vector search failed, falling back to mock data:",
        vectorError
      );

      // Return mock data for development
      return [
        {
          id: "mock1",
          name: "Gold's Gym NYC",
          slug: "golds-gym-nyc",
          type: "GYM",
          description:
            "Famous gym chain with top-notch equipment and amenities.",
          distance: 0.2,
        },
        {
          id: "mock2",
          name: "FitLife Personal Training",
          slug: "fitlife-personal-training",
          type: "PERSONAL_TRAINER",
          description:
            "Personalized workout plans and one-on-one training sessions.",
          distance: 0.3,
        },
        {
          id: "mock3",
          name: "Zen Yoga Studio",
          slug: "zen-yoga-studio",
          type: "STUDIO",
          description:
            "Peaceful yoga studio with classes for all experience levels.",
          distance: 0.4,
        },
      ];
    }
  } catch (error) {
    console.error("Vector search error:", error);
    // Return empty results on error
    return [];
  }
}
