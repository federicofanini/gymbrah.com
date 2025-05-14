const { PrismaClient } = require("@prisma/client");
const OpenAI = require("openai");
require("dotenv").config();

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

async function createBusinessEmbedding(business) {
  // Create a rich text representation of the business
  const embeddingText = `
    Business: ${business.name}
    Type: ${business.type}
    Description: ${business.description}
    ${
      business.location
        ? `Location: ${business.location.address}, ${business.location.city}, ${business.location.country}`
        : ""
    }
    ${
      business.services?.length > 0
        ? `Services: ${business.services.map((s) => s.name).join(", ")}`
        : ""
    }
    ${
      business.amenities?.length > 0
        ? `Amenities: ${business.amenities.map((a) => a.name).join(", ")}`
        : ""
    }
  `.trim();

  console.log(`Generating embedding for business: ${business.name}`);

  const embedding = await generateEmbedding(embeddingText);
  if (!embedding) {
    console.log(`Skipping ${business.name} - could not generate embedding`);
    return false;
  }

  try {
    // Use raw SQL with proper casting to vector type
    await prisma.$executeRawUnsafe(
      `
      INSERT INTO "BusinessEmbedding" ("businessId", "embedding")
      VALUES ($1, $2)
      ON CONFLICT ("businessId") 
      DO UPDATE SET "embedding" = $2
    `,
      business.id,
      embedding
    );
    console.log(`Embedding created for: ${business.name}`);
    return true;
  } catch (error) {
    console.error(`Error creating embedding for ${business.name}:`, error);
    return false;
  }
}

async function generateAllEmbeddings() {
  console.log("Generating embeddings for all businesses...");

  // Fetch all businesses with their related data
  const businesses = await prisma.business.findMany({
    include: {
      location: true,
      services: true,
      amenities: true,
    },
  });

  console.log(`Found ${businesses.length} businesses to process`);

  let successCount = 0;
  let failureCount = 0;

  for (const business of businesses) {
    const success = await createBusinessEmbedding(business);
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
    // Add a small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log("\n=== Embedding Generation Complete ===");
  console.log(`Successfully generated: ${successCount}`);
  console.log(`Failed: ${failureCount}`);
}

// Run the script
generateAllEmbeddings()
  .catch((e) => {
    console.error("Error in embedding generation script:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
