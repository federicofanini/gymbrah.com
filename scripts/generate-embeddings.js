const { PrismaClient } = require("@prisma/client");
const OpenAI = require("openai");

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ Error: OPENAI_API_KEY environment variable is required");
  process.exit(1);
}

// Setup clients
const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate embedding function
async function generateEmbedding(input) {
  try {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input,
    });
    return res.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    return null;
  }
}

// Upsert embedding function
async function upsertBusinessEmbedding(businessId, input) {
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

async function main() {
  console.log("🔍 Fetching businesses...");

  // Use raw query to avoid type issues with Prisma Edge
  const businesses = await prisma.$queryRaw`
    SELECT 
      b.id, b.name, b.description,
      bl.city, bl.country,
      ARRAY_AGG(DISTINCT st.name) FILTER (WHERE st.name IS NOT NULL) AS service_names,
      ARRAY_AGG(DISTINCT at.name) FILTER (WHERE at.name IS NOT NULL) AS amenity_names
    FROM "Business" b
    LEFT JOIN "BusinessLocation" bl ON b.id = bl."businessId"
    LEFT JOIN "ServiceTag" st ON b.id = st."businessId"
    LEFT JOIN "AmenityTag" at ON b.id = at."businessId"
    GROUP BY b.id, bl.city, bl.country
  `;

  console.log(`Found ${businesses.length} businesses to embed.`);

  let successCount = 0;
  let failCount = 0;

  for (const b of businesses) {
    // Create a rich text representation of the business
    const input = [
      b.name,
      b.description,
      b.city,
      b.country,
      (b.service_names || []).join(", "),
      (b.amenity_names || []).join(", "),
    ]
      .filter(Boolean)
      .join(" | ");

    const success = await upsertBusinessEmbedding(b.id, input);
    if (success) {
      console.log(`✅ Embedded: ${b.name}`);
      successCount++;
    } else {
      console.error(`❌ Failed to embed: ${b.name}`);
      failCount++;
    }
  }

  console.log(`✨ Embedding generation complete!`);
  console.log(`✅ Successfully embedded: ${successCount} businesses`);
  if (failCount > 0) {
    console.log(`❌ Failed to embed: ${failCount} businesses`);
  }
}

main()
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
