import { prisma } from "@/packages/database/prisma";
import { generateEmbedding } from "./openai";

export async function upsertBusinessEmbedding(
  businessId: string,
  input: string
) {
  const embedding = await generateEmbedding(input);

  // Use raw SQL since Prisma Edge might not fully support the BusinessEmbedding model
  await prisma.$executeRawUnsafe(
    `
    INSERT INTO "BusinessEmbedding" ("businessId", "embedding")
    VALUES ($1, $2)
    ON CONFLICT ("businessId") 
    DO UPDATE SET "embedding" = $2
  `,
    businessId,
    embedding
  );
}
