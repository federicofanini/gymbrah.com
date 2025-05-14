const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const testBusinesses = [
  {
    name: "FitLife NYC",
    slug: "fitlife-nyc",
    type: "GYM",
    description:
      "Premium gym in downtown Manhattan with state-of-the-art equipment and expert trainers. Specializing in weight training, cardio, and group fitness classes.",
    ownerId: "", // Will be set during script execution
    location: {
      address: "123 Broadway",
      city: "New York",
      region: "NY",
      country: "USA",
      zipCode: "10001",
      latitude: 40.7128,
      longitude: -74.006,
    },
    services: [
      "Weight Training",
      "Personal Training",
      "Group Classes",
      "Cardio",
    ],
    amenities: [
      "Showers",
      "Towel Service",
      "Locker Room",
      "Sauna",
      "Smoothie Bar",
    ],
  },
  {
    name: "Mike's Personal Training",
    slug: "mikes-personal-training",
    type: "PERSONAL_TRAINER",
    description:
      "Expert personal training services focused on weight loss, strength building, and athletic performance. Customized plans for all fitness levels.",
    ownerId: "", // Will be set during script execution
    location: {
      address: "456 Park Ave",
      city: "New York",
      region: "NY",
      country: "USA",
      zipCode: "10022",
      latitude: 40.7631,
      longitude: -73.9712,
    },
    services: [
      "Weight Loss Programs",
      "Strength Training",
      "Athletic Conditioning",
      "Online Coaching",
    ],
    amenities: ["Private Studio", "Equipment Provided", "Nutritional Guidance"],
  },
  {
    name: "Zen Yoga Studio",
    slug: "zen-yoga-studio",
    type: "STUDIO",
    description:
      "Tranquil yoga studio offering a variety of classes from beginner to advanced levels. Focuses on mindfulness, flexibility and strength through various yoga styles.",
    ownerId: "", // Will be set during script execution
    location: {
      address: "789 Village Way",
      city: "New York",
      region: "NY",
      country: "USA",
      zipCode: "10014",
      latitude: 40.7373,
      longitude: -74.0027,
    },
    services: ["Hatha Yoga", "Vinyasa Flow", "Yin Yoga", "Meditation Classes"],
    amenities: [
      "Mats Provided",
      "Meditation Room",
      "Changing Rooms",
      "Tea Bar",
    ],
  },
];

async function seedTestData() {
  console.log("Starting to seed test businesses...");

  try {
    // First, find or create a test user
    const testUser = await prisma.user.upsert({
      where: { email: "test@gymbrah.com" },
      update: {},
      create: {
        email: "test@gymbrah.com",
        full_name: "Test User",
      },
    });

    console.log(`Using test user with ID: ${testUser.id}`);

    // Seed each business
    for (const businessData of testBusinesses) {
      // Set the owner ID
      businessData.ownerId = testUser.id;

      // Extract related data
      const { location, services, amenities, ...businessInfo } = businessData;

      // Create the business
      const business = await prisma.business.upsert({
        where: { slug: businessInfo.slug },
        update: businessInfo,
        create: businessInfo,
      });

      console.log(`Created/updated business: ${business.name}`);

      // Create location
      if (location) {
        await prisma.businessLocation.upsert({
          where: { businessId: business.id },
          update: {
            ...location,
            businessId: business.id,
          },
          create: {
            ...location,
            businessId: business.id,
          },
        });
        console.log(`Added location for: ${business.name}`);
      }

      // Create services
      if (services && services.length > 0) {
        // First, delete existing services
        await prisma.serviceTag.deleteMany({
          where: { businessId: business.id },
        });

        // Create new services
        for (const serviceName of services) {
          await prisma.serviceTag.create({
            data: {
              name: serviceName,
              businessId: business.id,
            },
          });
        }
        console.log(`Added ${services.length} services for: ${business.name}`);
      }

      // Create amenities
      if (amenities && amenities.length > 0) {
        // First, delete existing amenities
        await prisma.amenityTag.deleteMany({
          where: { businessId: business.id },
        });

        // Create new amenities
        for (const amenityName of amenities) {
          await prisma.amenityTag.create({
            data: {
              name: amenityName,
              businessId: business.id,
            },
          });
        }
        console.log(
          `Added ${amenities.length} amenities for: ${business.name}`
        );
      }
    }

    console.log("\n✅ Seed completed successfully!");
    console.log(`Added ${testBusinesses.length} test businesses`);
    console.log("\nNext steps:");
    console.log(
      "1. Run 'node scripts/generate-business-embeddings.js' to create embeddings for these businesses"
    );
    console.log("2. Open the app and test the AI search feature");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTestData().catch(console.error);
