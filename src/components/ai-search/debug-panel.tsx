"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Bug,
  Terminal,
  ExternalLink,
  Database,
  ArrowDownUp,
  BarChart,
} from "lucide-react";

interface DebugPanelProps {
  lastQuery: string | null;
  error: any;
  responseTime?: number;
}

export const DebugPanel = ({
  lastQuery,
  error,
  responseTime,
}: DebugPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showVectorDetails, setShowVectorDetails] = useState(false);
  const [showScoringDetails, setShowScoringDetails] = useState(false);

  if (!lastQuery && !error) return null;

  // Check for specific error types related to pgvector
  const errorStr = error ? String(error) : "";
  const isPgVectorError =
    errorStr.includes("operator does not exist") ||
    errorStr.includes("vector") ||
    errorStr.includes("42883");

  const isPrismaAccelerateError =
    errorStr.includes("prisma") && errorStr.includes("accelerate");

  return (
    <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        <span className="flex items-center">
          <Bug className="h-4 w-4 mr-2" />
          Debug Information
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <div className="space-y-2">
            {lastQuery && (
              <div>
                <h4 className="text-xs font-semibold text-gray-500">
                  Last Query:
                </h4>
                <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {lastQuery}
                </pre>
              </div>
            )}

            {responseTime && (
              <div>
                <h4 className="text-xs font-semibold text-gray-500">
                  Response Time:
                </h4>
                <p className="text-xs">{responseTime}ms</p>
              </div>
            )}

            {error && (
              <div>
                <h4 className="text-xs font-semibold text-gray-500">Error:</h4>
                <pre className="mt-1 text-xs bg-red-50 text-red-800 p-2 rounded overflow-auto">
                  {typeof error === "object"
                    ? JSON.stringify(error, null, 2)
                    : String(error)}
                </pre>
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold text-gray-500">
                Backend Status:
              </h4>
              <p className="text-xs">
                {isPgVectorError
                  ? "Vector search is encountering issues with the PgVector extension."
                  : isPrismaAccelerateError
                  ? "Vector search might be limited by Prisma Accelerate compatibility."
                  : "Vector search is operational."}
              </p>
            </div>

            <button
              onClick={() => setShowVectorDetails(!showVectorDetails)}
              className="text-xs text-blue-600 flex items-center mt-2 hover:underline"
            >
              <ArrowDownUp className="h-3 w-3 mr-1" />
              {showVectorDetails ? "Hide" : "Show"} vector search details
            </button>

            {showVectorDetails && (
              <div className="mt-2 p-3 bg-gray-100 rounded-md text-xs space-y-2">
                <h4 className="font-medium">Vector Search Implementation:</h4>
                <p>
                  Our implementation uses OpenAI embeddings with PostgreSQL
                  pgvector for efficient similarity search.
                </p>

                <h4 className="font-medium mt-2">Distance Metrics:</h4>
                <p>
                  We use the cosine distance operator (<code>&lt;#&gt;</code>)
                  which measures angular distance between vectors.
                </p>
                <ul className="list-disc pl-4 space-y-1 mt-2">
                  <li>
                    <span className="font-medium">-1.0</span>: Vectors are
                    identical (100% similar)
                  </li>
                  <li>
                    <span className="font-medium">-0.5</span>: Strong similarity
                    (50% match)
                  </li>
                  <li>
                    <span className="font-medium">0.0</span>: Neutral/orthogonal
                    vectors
                  </li>
                  <li>
                    <span className="font-medium">+1.0</span>: Completely
                    dissimilar/opposite
                  </li>
                </ul>

                <h4 className="font-medium mt-2">Query Execution:</h4>
                <pre className="bg-gray-800 text-gray-200 p-2 rounded-md text-xs whitespace-pre-wrap mt-1">
                  {`SELECT b.id, b.name, b.slug, b.type, b.description, 
       be.embedding::vector <#> queryEmbedding::vector AS distance
FROM "Business" b
JOIN "BusinessEmbedding" be ON b.id = be."businessId"
ORDER BY distance ASC
LIMIT 10;`}
                </pre>
              </div>
            )}

            <button
              onClick={() => setShowScoringDetails(!showScoringDetails)}
              className="text-xs text-blue-600 flex items-center mt-2 hover:underline"
            >
              <BarChart className="h-3 w-3 mr-1" />
              {showScoringDetails ? "Hide" : "Show"} scoring algorithm details
            </button>

            {showScoringDetails && (
              <div className="mt-2 p-3 bg-gray-100 rounded-md text-xs space-y-2">
                <h4 className="font-medium">Score Calculation Algorithm:</h4>
                <p>
                  We transform the raw cosine distance into an intuitive
                  percentage score:
                </p>

                <div className="mt-2 bg-white p-2 rounded border border-gray-200">
                  <p className="font-mono text-xs">
                    1. Convert distance to similarity: <br />
                    <span className="ml-3">
                      rawSimilarity = (-distance + 1) / 2
                    </span>
                  </p>
                  <p className="font-mono text-xs mt-1">
                    2. Apply sigmoid-like scaling: <br />
                    <span className="ml-3">
                      enhancedSimilarity = Math.pow(rawSimilarity, 0.7)
                    </span>
                  </p>
                  <p className="font-mono text-xs mt-1">
                    3. Boost very relevant results: <br />
                    <span className="ml-3">
                      if (rawSimilarity &gt; 0.7) {"{"}
                    </span>
                    <br />
                    <span className="ml-5">
                      finalSimilarity = rawSimilarity * 1.2
                    </span>
                    <br />
                    <span className="ml-3">{"}"}</span>
                  </p>
                  <p className="font-mono text-xs mt-1">
                    4. Convert to percentage and clamp to 0-100 range
                  </p>
                </div>

                <p className="mt-2">
                  This approach enhances contrast between good and mediocre
                  matches, making the most relevant results stand out more
                  clearly.
                </p>
              </div>
            )}

            {isPgVectorError && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <h4 className="text-xs font-semibold text-amber-800 flex items-center">
                  <Database className="h-3 w-3 mr-1" />
                  Supabase PgVector Setup
                </h4>
                <div className="mt-2 text-xs text-amber-700 space-y-1">
                  <p>
                    The error indicates a problem with the PgVector extension on
                    Supabase. To enable pgvector on Supabase:
                  </p>
                  <ol className="list-decimal list-inside pl-2 space-y-1">
                    <li>Log in to your Supabase dashboard</li>
                    <li>Select your project</li>
                    <li>Go to the SQL Editor</li>
                    <li>
                      Run: <code>CREATE EXTENSION vector;</code>
                    </li>
                  </ol>
                  <div className="flex items-center mt-2">
                    <a
                      href="https://supabase.com/docs/guides/database/extensions/pgvector"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Supabase PgVector Guide
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
