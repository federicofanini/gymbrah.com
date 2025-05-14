import { InfoIcon, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { useState } from "react";

export const SearchInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-sm font-medium text-blue-700 hover:bg-blue-100"
      >
        <span className="flex items-center">
          <InfoIcon className="h-4 w-4 mr-2" />
          About AI Search
        </span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isExpanded && (
        <div className="p-3 border-t border-blue-200">
          <p className="text-sm text-blue-800 mb-2">
            Our AI search understands natural language queries to find the best
            matches based on meaning, not just keywords.
          </p>

          <div className="text-xs text-blue-700 space-y-2">
            <div>
              <strong>How it works:</strong> We use OpenAI embeddings to convert
              business information and your search into mathematical vectors,
              then find the closest matches using PostgreSQL pgvector.
            </div>

            <div>
              <strong>Key benefits:</strong>
              <ul className="list-disc pl-4 mt-1 space-y-1">
                <li>
                  Finds semantically relevant results even without exact keyword
                  matches
                </li>
                <li>
                  Understands synonyms and related concepts (e.g.,
                  &ldquo;strength training&rdquo; ≈ &ldquo;weight
                  lifting&rdquo;)
                </li>
                <li>
                  Ranks results by similarity score rather than just keyword
                  frequency
                </li>
              </ul>
            </div>

            <div className="bg-white p-2 rounded border border-blue-100 mt-2">
              <div className="flex items-center mb-1 text-blue-800">
                <Lightbulb className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                <strong>Try searching for:</strong>
              </div>
              <ul className="text-blue-600 pl-5 list-disc space-y-0.5">
                <li>&ldquo;Yoga studios with meditation classes&rdquo;</li>
                <li>
                  &ldquo;Personal trainers for weight loss in midtown&rdquo;
                </li>
                <li>
                  &ldquo;Gyms with free weights and cardio equipment&rdquo;
                </li>
                <li>&ldquo;Boxing or martial arts training&rdquo;</li>
              </ul>
            </div>

            <p className="text-xs text-blue-500 italic mt-2">
              This feature uses the same technology that powers AI chatbots to
              better understand your fitness needs.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
