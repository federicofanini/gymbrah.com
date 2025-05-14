const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Get database URL from environment
const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("ERROR: Database URL not found in environment variables");
  process.exit(1);
}

// Check if this is a Supabase URL
const isSupabase = databaseUrl.includes("supabase");

if (isSupabase) {
  console.log("\n🚨 SUPABASE DETECTED 🚨");
  console.log("-------------------------------------------------------");
  console.log("You're using Supabase as your database provider. psql commands");
  console.log("won't work directly through this script.");
  console.log("\nTo enable pgvector on Supabase, please:");
  console.log("1. Log in to your Supabase dashboard");
  console.log("2. Select your project");
  console.log("3. Go to the SQL Editor");
  console.log("4. Run: CREATE EXTENSION vector;");
  console.log(
    '5. Then run: ALTER TABLE "BusinessEmbedding" ALTER COLUMN "embedding" TYPE vector(1536);'
  );
  console.log("\nFor more information, visit:");
  console.log("https://supabase.com/docs/guides/database/extensions/pgvector");
  console.log("-------------------------------------------------------");
  console.log(
    "\nIn the meantime, the app will use mock data for vector searches.\n"
  );
  process.exit(0);
}

// Path to SQL setup file
const setupFilePath = path.join(__dirname, "setup-pgvector.sql");

// Check if the file exists
if (!fs.existsSync(setupFilePath)) {
  console.error(`ERROR: Setup file not found at ${setupFilePath}`);
  process.exit(1);
}

console.log("Running PGVector setup...");

// Run the SQL script using psql
const command = `psql "${databaseUrl}" -f "${setupFilePath}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`ERROR: Failed to execute setup script: ${error.message}`);
    process.exit(1);
  }

  if (stderr && !stderr.includes("NOTICE")) {
    console.error(`ERROR: ${stderr}`);
  }

  console.log("PGVector setup completed successfully!");
  console.log(stdout);

  // Additional verification step
  const verifyCommand = `psql "${databaseUrl}" -c "SELECT * FROM pg_extension WHERE extname = 'vector';"`;

  exec(verifyCommand, (verifyError, verifyStdout) => {
    if (verifyError) {
      console.error(`ERROR during verification: ${verifyError.message}`);
      process.exit(1);
    }

    if (verifyStdout.includes("vector")) {
      console.log("✅ PGVector extension is properly installed");
    } else {
      console.error("❌ PGVector extension is NOT installed correctly");
    }
  });
});
