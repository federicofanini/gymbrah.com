"use client";

import { useState, type FormEventHandler } from "react";
import { SearchInput } from "./search-input";
import { SearchResults, type BusinessSearchResult } from "./search-results";
import { SearchStatus } from "./search-status";
import { DebugPanel } from "./debug-panel";
import { SearchLayout, SearchSection } from "./search-layout";

const AiSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<BusinessSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | undefined>(
    undefined
  );
  const [rawError, setRawError] = useState<Error | unknown | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("message") as string;

    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setRawError(null);
    setLastQuery(query);

    const startTime = performance.now();

    try {
      const response = await fetch(
        `/api/search/ai?query=${encodeURIComponent(query)}`
      );

      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));

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
      setError(
        "Failed to perform search. There might be an issue with the search backend."
      );
      setRawError(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SearchLayout>
      <SearchSection>
        <SearchInput onSubmit={handleSubmit} isLoading={isLoading} />
      </SearchSection>

      <SearchSection>
        <SearchStatus
          isLoading={isLoading}
          hasSearched={hasSearched}
          hasResults={results.length > 0}
          error={error}
        />
        {results.length > 0 && <SearchResults results={results} />}
      </SearchSection>

      {(error || lastQuery) && (
        <SearchSection className="bg-gray-50 rounded-b-lg">
          <DebugPanel
            lastQuery={lastQuery}
            error={rawError}
            responseTime={responseTime}
          />
        </SearchSection>
      )}
    </SearchLayout>
  );
};

export default AiSearch;
