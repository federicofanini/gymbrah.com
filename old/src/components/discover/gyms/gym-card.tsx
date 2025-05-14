import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Globe, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface GymCardProps {
  gym: {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    location: string;
    city: string;
    categories: string[];
    price: string;
    contact: string;
    website: string;
  };
}

export function GymCard({ gym }: GymCardProps) {
  return (
    <Card className="group overflow-hidden bg-background hover:bg-accent/5 transition-colors flex flex-col h-full">
      <Link href={`/gyms/${gym.id}`} className="flex-1">
        {/* Image Container */}
        <div className="relative aspect-video">
          <Image
            src={gym.image}
            alt={gym.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={gym.id <= 3}
          />
          <Badge
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
            variant="secondary"
          >
            {gym.price}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Header */}
          <div>
            <div className="inline-flex items-center">
              <h3 className="font-semibold tracking-tight group-hover:text-primary transition-colors">
                {gym.name}
              </h3>
              <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
            </div>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {gym.location}, {gym.city}
              </span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {gym.categories.slice(0, 2).map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="px-2 py-0 text-xs bg-transparent"
              >
                {category}
              </Badge>
            ))}
            {gym.categories.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{gym.categories.length - 2} more
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{gym.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({gym.reviews})
            </span>
          </div>
        </div>
      </Link>

      {/* Quick Actions */}
      <div className="flex gap-2 px-5 pb-5">
        <Button variant="outline" size="sm" asChild>
          <Link href={`tel:${gym.contact}`} className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={gym.website} target="_blank" className="flex-1">
            <Globe className="h-4 w-4 mr-2" />
            Visit
          </Link>
        </Button>
      </div>
    </Card>
  );
}
