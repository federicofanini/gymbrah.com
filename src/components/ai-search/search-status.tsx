import { AlertCircle, Loader2 } from "lucide-react";

interface SearchStatusProps {
  isLoading: boolean;
  hasSearched: boolean;
  hasResults: boolean;
  error: string | null;
}

export const SearchStatus = ({
  isLoading,
  hasSearched,
  hasResults,
  error,
}: SearchStatusProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-500">Searching...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-red-500 text-sm font-medium p-4 bg-red-50 rounded-md">
        <AlertCircle className="h-5 w-5 mr-2" />
        <div>
          <p className="font-semibold">Search Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (hasSearched && !hasResults) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No results found. Try a different search query.</p>
      </div>
    );
  }

  return null;
};
