import { prisma } from "@/packages/database/prisma";
import { generateEmbedding } from "./openai";

export async function upsertBusinessEmbedding(
  businessId: string,
  input: string
): Promise<boolean> {
  try {
    const embedding = await generateEmbedding(input);

    if (!embedding) {
      console.error("Failed to generate embedding for business:", businessId);
      return false;
    }

    // Use raw SQL with proper casting to vector type
    await prisma.$executeRawUnsafe(
      `
      INSERT INTO "BusinessEmbedding" ("businessId", "embedding")
      VALUES ($1, $2::vector)
      ON CONFLICT ("businessId") 
      DO UPDATE SET "embedding" = $2::vector
    `,
      businessId,
      embedding
    );

    return true;
  } catch (error) {
    console.error("Error upserting embedding for business:", businessId, error);
    return false;
  }
}
