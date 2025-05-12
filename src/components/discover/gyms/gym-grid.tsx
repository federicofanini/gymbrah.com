import { GymCard } from "./gym-card";

// This would come from your database
const mockGyms = [
  {
    id: 1,
    name: "CrossFit Central",
    description:
      "Premier CrossFit facility with expert coaches and modern equipment.",
    image: "/og.png",
    rating: 4.8,
    reviews: 124,
    location: "Downtown",
    city: "New York",
    categories: ["CrossFit", "Strength Training"],
    price: "$$",
    contact: "+1 234 567 890",
    website: "https://crossfitcentral.com",
  },
  // Add more mock gyms...
];

export function GymGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockGyms.map((gym) => (
        <GymCard key={gym.id} gym={gym} />
      ))}
    </div>
  );
}
