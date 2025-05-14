import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DumbbellIcon,
  SearchIcon,
  UserIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

export type BusinessSearchResult = {
  id: string;
  name: string;
  slug: string;
  type: "GYM" | "STUDIO" | "PERSONAL_TRAINER";
  description: string;
  distance: number;
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "GYM":
    case "STUDIO":
      return <DumbbellIcon className="h-4 w-4 mr-2" />;
    case "PERSONAL_TRAINER":
      return <UserIcon className="h-4 w-4 mr-2" />;
    default:
      return <SearchIcon className="h-4 w-4 mr-2" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "GYM":
      return "bg-blue-100 text-blue-800";
    case "STUDIO":
      return "bg-purple-100 text-purple-800";
    case "PERSONAL_TRAINER":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Enhanced similarity score calculation
// For PostgreSQL pgvector with cosine distance:
// Values range from -1 (identical) to 1 (opposite)
const calculateSimilarityScore = (distance: number): number => {
  // Check if the distance is positive (unlikely but possible due to rounding errors)
  if (distance >= 0) return 0;

  // Convert distance to a 0-1 similarity value
  // -1 (perfect match) becomes 1, 0 (orthogonal) becomes 0.5
  const rawSimilarity = (-distance + 1) / 2;

  // Apply a sigmoid-like scaling to emphasize differences in the middle range
  // This makes "good" matches appear more clearly better than "mediocre" matches
  const enhancedSimilarity = Math.pow(rawSimilarity, 0.7);

  // Apply a bonus to very relevant results (above 0.7)
  let finalSimilarity = enhancedSimilarity;
  if (rawSimilarity > 0.7) {
    finalSimilarity = rawSimilarity * 1.2;
  }

  // Clamp to 0-1 range and convert to percentage
  return Math.min(100, Math.max(0, Math.round(finalSimilarity * 100)));
};

const getRelevanceColor = (score: number) => {
  if (score > 85) return "text-green-600";
  if (score > 70) return "text-blue-600";
  if (score > 50) return "text-amber-600";
  return "text-gray-600";
};

interface SearchResultsProps {
  results: BusinessSearchResult[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  if (results.length === 0) return null;

  return (
    <div className="w-full space-y-6 mt-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Search Results</h3>
        <span className="text-sm text-gray-500">
          Found {results.length} result{results.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((result) => {
          const similarityScore = calculateSimilarityScore(result.distance);

          return (
            <Card
              key={result.id}
              className="w-full overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    <a
                      href={`/business/${result.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {result.name}
                    </a>
                  </CardTitle>
                  <Badge className={getTypeColor(result.type)}>
                    <span className="flex items-center">
                      {getTypeIcon(result.type)}
                      {result.type.replace("_", " ")}
                    </span>
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {result.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">New York</span>
                  </div>

                  <div
                    className="flex items-center"
                    title={`Match score: ${similarityScore}% (distance: ${result.distance.toFixed(
                      4
                    )})`}
                  >
                    <StarIcon
                      className={`h-4 w-4 mr-1 ${getRelevanceColor(
                        similarityScore
                      )}`}
                    />
                    <span
                      className={`text-xs font-medium ${getRelevanceColor(
                        similarityScore
                      )}`}
                    >
                      {similarityScore}% match
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
