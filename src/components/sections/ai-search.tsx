"use client";

import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
} from "@/components/ui/kibo-ui/ai/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SendIcon, SearchIcon, DumbbellIcon, UserIcon } from "lucide-react";
import { useState, type FormEventHandler } from "react";

type BusinessSearchResult = {
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

const AiSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BusinessSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("message") as string;

    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search/ai?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to perform search. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <AIInput onSubmit={handleSubmit}>
        <AIInputTextarea
          placeholder="Search for gyms, trainers, or fitness studios..."
          disabled={isLoading}
        />
        <AIInputToolbar className="justify-end">
          <AIInputSubmit disabled={isLoading}>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
            ) : (
              <SendIcon size={16} />
            )}
          </AIInputSubmit>
        </AIInputToolbar>
      </AIInput>

      {error && (
        <div className="text-red-500 text-sm font-medium p-3 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="w-full space-y-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((result) => (
              <Card key={result.id} className="w-full overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{result.name}</CardTitle>
                    <Badge className={getTypeColor(result.type)}>
                      <span className="flex items-center">
                        {getTypeIcon(result.type)}
                        {result.type.replace("_", " ")}
                      </span>
                    </Badge>
                  </div>
                  <CardDescription className="truncate">
                    {result.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">
                    Relevance score: {(1 - result.distance).toFixed(4)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiSearch;
