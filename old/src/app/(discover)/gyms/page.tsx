import { Metadata } from "next";
import { Hero } from "@/components/discover/gyms/hero";
import { SearchFilters } from "@/components/discover/gyms/search-filters";
import { GymGrid } from "@/components/discover/gyms/gym-grid";

export const metadata: Metadata = {
  title: "Discover Gyms | GymBrah",
  description:
    "Find the perfect gym, fitness studio, or personal trainer in your area. Browse top-rated facilities, compare prices, and book your next workout.",
};

export default async function GymsPage() {
  return (
    <div className="min-h-screen">
      <div className="relative mx-auto max-w-screen-xl px-4 py-16">
        <Hero />
        <SearchFilters />
        <GymGrid />
      </div>
    </div>
  );
}
