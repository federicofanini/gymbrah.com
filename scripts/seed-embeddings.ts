import { prisma } from "@/packages/database/prisma";
import { upsertBusinessEmbedding } from "@/packages/ai/embedding";

type BusinessRecord = {
  id: string;
  name: string;
  description: string;
  city: string | null;
  country: string | null;
  service_names: string[] | null;
  amenity_names: string[] | null;
};

async function main() {
  console.log("🔍 Fetching businesses...");

  // Use raw query to avoid type issues with Prisma Edge
  const businesses = await prisma.$queryRaw<BusinessRecord[]>`
    SELECT 
      b.id, b.name, b.description,
      bl.city, bl.country,
      ARRAY_AGG(DISTINCT st.name) AS service_names,
      ARRAY_AGG(DISTINCT at.name) AS amenity_names
    FROM "Business" b
    LEFT JOIN "BusinessLocation" bl ON b.id = bl."businessId"
    LEFT JOIN "ServiceTag" st ON b.id = st."businessId"
    LEFT JOIN "AmenityTag" at ON b.id = at."businessId"
    GROUP BY b.id, bl.city, bl.country
  `;

  console.log(`Found ${businesses.length} businesses to embed.`);

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

    try {
      await upsertBusinessEmbedding(b.id, input);
      console.log(`✅ Embedded: ${b.name}`);
    } catch (error) {
      console.error(`❌ Failed to embed ${b.name}:`, error);
    }
  }

  console.log("✨ Embedding generation complete!");
}

main()
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
