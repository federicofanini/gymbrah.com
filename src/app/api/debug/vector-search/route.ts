import { searchBusinessesAI } from "@/packages/ai/vector-search";
import { NextRequest, NextResponse } from "next/server";

type SearchResult = {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  distance: number;
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const results = (await searchBusinessesAI(query)) as SearchResult[];

    // Include information about mock vs real data
    const isMockData = results.length > 0 && results[0].id?.startsWith("mock");

    return NextResponse.json({
      success: true,
      results,
      isMockData,
      query,
      resultsCount: results.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Debug vector search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while performing vector search",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
