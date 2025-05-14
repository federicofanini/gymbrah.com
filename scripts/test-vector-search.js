const { PrismaClient } = require("@prisma/client");
const OpenAI = require("openai");
require("dotenv").config();

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateEmbedding(input) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input,
  });
  return res.data[0].embedding;
}

async function testVectorSearch() {
  console.log("Testing vector search functionality...");

  // 1. First check if pgvector extension is installed
  try {
    const extensionResult =
      await prisma.$queryRaw`SELECT * FROM pg_extension WHERE extname = 'vector'`;
    if (!extensionResult || extensionResult.length === 0) {
      console.error("❌ PGVector extension is not installed!");
      console.log("Please run `node scripts/run-pgvector-setup.js` first");
      return;
    }
    console.log("✅ PGVector extension is installed");
  } catch (error) {
    console.error("Error checking PGVector extension:", error);
    return;
  }

  // 2. Test a basic vector search query
  try {
    const query = "gym in new york";
    console.log(`Searching for: "${query}"`);

    const queryEmbedding = await generateEmbedding(query);
    if (!queryEmbedding) {
      console.error("❌ Failed to generate embedding for query");
      return;
    }
    console.log("✅ Successfully generated embedding");

    // Attempt the query with proper vector casting
    const results = await prisma.$queryRawUnsafe(
      `
      SELECT b.id, b.name, b.slug, b.type, b.description, 
             be.embedding::vector <#> $1::vector AS distance
      FROM "Business" b
      JOIN "BusinessEmbedding" be ON b.id = be."businessId"
      ORDER BY distance ASC
      LIMIT 5;
      `,
      queryEmbedding
    );

    console.log(
      `✅ Query executed successfully! Found ${results.length} results`
    );
    console.log("\nTop results:");
    results.forEach((result, index) => {
      console.log(
        `${index + 1}. ${result.name} (${result.type}) - Distance: ${
          result.distance
        }`
      );
    });
  } catch (error) {
    console.error("❌ Vector search test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testVectorSearch().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
