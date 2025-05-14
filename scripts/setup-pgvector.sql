-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Modify the BusinessEmbedding table to use the vector type
ALTER TABLE "BusinessEmbedding" ALTER COLUMN "embedding" TYPE vector(1536);

-- Create an index for faster vector searches
CREATE INDEX IF NOT EXISTS idx_business_embedding ON "BusinessEmbedding" USING ivfflat (embedding vector_cosine_ops);

-- Check if the setup was successful
SELECT * FROM pg_extension WHERE extname = 'vector'; 