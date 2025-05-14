import AiSearch from "@/components/ai-search";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "AI-Powered Search | GymBrah",
  description:
    "Search for gyms, trainers, and fitness studios using natural language queries.",
};

export default function SearchPage() {
  return (
    <main className="flex flex-col min-h-screen py-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI-Powered Search</h1>
            <p className="text-gray-600 mb-4">
              Find the perfect fitness match using our semantic search
              technology. Our AI understands natural language and finds results
              based on meaning, not just keywords.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <AiSearch />
          </div>
        </div>
      </Container>
    </main>
  );
}
