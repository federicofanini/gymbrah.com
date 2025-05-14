# AI Search Components

This directory contains the components for the AI-powered semantic search functionality of GymBrah.

## Overview

The search system uses OpenAI embeddings and vector similarity to find the most relevant businesses based on natural language queries. Rather than simple keyword matching, this approach understands the semantic meaning of search queries.

## Components

- `index.tsx`: Main component that orchestrates the search functionality
- `search-input.tsx`: Input component for entering search queries
- `search-results.tsx`: Display component for search results
- `search-status.tsx`: Status indicators for loading, errors, etc.
- `search-layout.tsx`: Layout components for organizing the search UI
- `search-info.tsx`: Information about how the search works
- `debug-panel.tsx`: Development tool for debugging search functionality

## Backend Components

- `src/packages/ai/openai.ts`: OpenAI client setup and embedding generation
- `src/packages/ai/embedding.ts`: Functions to store embeddings in the database
- `src/packages/ai/vector-search.ts`: Vector similarity search functionality

## Setup Requirements

1. **Database Setup**:

   - PgVector extension for PostgreSQL
   - Vector column in BusinessEmbedding table

2. **Environment Variables**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DATABASE_URL`: PostgreSQL connection string
   - `DIRECT_URL`: Direct PostgreSQL connection (for Prisma)

## Using with Supabase

If using Supabase as your database provider, you need to enable the pgvector extension:

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run: `CREATE EXTENSION vector;`
4. Run: `ALTER TABLE "BusinessEmbedding" ALTER COLUMN "embedding" TYPE vector(1536);`

## Scripts

- `scripts/run-pgvector-setup.js`: Set up the pgvector extension
- `scripts/generate-business-embeddings.js`: Generate embeddings for businesses
- `scripts/seed-test-businesses.js`: Create test businesses for development
- `scripts/test-vector-search.js`: Test the vector search functionality

## Development Notes

- The search will fall back to mock data if the vector search fails
- You can use the debug panel to view search issues and fix them
- Add more test businesses through the seed script for better testing

## API Routes

- `/api/search/ai`: Main search API endpoint
- `/api/debug/vector-search`: Debug endpoint for testing vector search
