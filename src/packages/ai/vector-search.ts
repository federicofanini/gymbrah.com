import { prisma } from "@/packages/database/prisma";
import { generateEmbedding } from "./openai";

export async function searchBusinessesAI(query: string) {
  const queryEmbedding = await generateEmbedding(query);

  // Using raw SQL query since Prisma doesn't natively support vector operations
  return await prisma.$queryRawUnsafe(
    `
    SELECT b.id, b.name, b.slug, b.type, b.description, be.embedding <#> $1 AS distance
    FROM "Business" b
    JOIN "BusinessEmbedding" be ON b.id = be."businessId"
    ORDER BY distance ASC
    LIMIT 10;
  `,
    queryEmbedding
  );
}
