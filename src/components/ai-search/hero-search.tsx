"use client";

import { useState, type FormEventHandler } from "react";
import { SearchInput } from "./search-input";
import { SearchResults, type BusinessSearchResult } from "./search-results";
import { SearchStatus } from "./search-status";

export const HeroSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BusinessSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

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
        throw new Error(
          `Search failed: ${response.statusText || response.status}`
        );
      }

      const data = await response.json();
      setResults(data.results || []);
      setHasSearched(true);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to perform search. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <SearchInput onSubmit={handleSubmit} isLoading={isLoading} />

      <SearchStatus
        isLoading={isLoading}
        hasSearched={hasSearched}
        hasResults={results.length > 0}
        error={error}
      />

      {results.length > 0 && (
        <div className="space-y-4">
          <SearchResults results={results.slice(0, 4)} />
        </div>
      )}
    </div>
  );
};
