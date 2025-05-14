# AI Search Implementation

This module implements vector search capabilities for the GymBrah platform using OpenAI embeddings and PostgreSQL vector operations.

## Setup Requirements

1. Install the `pgvector` extension in your PostgreSQL database:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

2. Modify the `BusinessEmbedding` table to use the vector type:

```sql
ALTER TABLE "BusinessEmbedding" ALTER COLUMN "embedding" TYPE vector(1536);
```

3. Add appropriate indexing for faster vector searches:

```sql
CREATE INDEX ON "BusinessEmbedding" USING ivfflat (embedding vector_cosine_ops);
```

## Usage

### Generate Embeddings

Run the embedding generation script to create embeddings for all businesses:

```bash
npx ts-node scripts/seed-embeddings.ts
```

### API Endpoints

The AI search is available through the API:

```
GET /api/search/ai?query=your search query
```

## Implementation Details

- Embeddings are generated using the OpenAI `text-embedding-3-small` model
- Vector similarity search is performed using PostgreSQL's vector operations
- Results are sorted by similarity (ascending distance)
