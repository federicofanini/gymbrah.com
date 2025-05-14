import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const cities = [
  "All Cities",
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "San Francisco",
  "Charlotte",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Boston",
];

const categories = [
  "All",
  "CrossFit",
  "Yoga",
  "Strength Training",
  "HIIT",
  "Boxing",
  "Swimming",
  "Personal Training",
];

const priceRanges = [
  { value: "All", label: "All Prices" },
  { value: "$", label: "Budget ($)" },
  { value: "$$", label: "Moderate ($$)" },
  { value: "$$$", label: "Premium ($$$)" },
];

export function SearchFilters() {
  return (
    <>
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-4">
        <form className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search gyms by name, location, or category..."
              name="search"
              className="pl-10"
            />
          </div>
          <Select name="city" defaultValue="All Cities">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="category" defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select name="price" defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="md:max-w-[200px]">
            Search
          </Button>
        </form>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 my-4">
        <Badge variant="secondary" className="gap-1">
          New York
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
            <X className="h-3 w-3" />
          </Button>
        </Badge>
        <Badge variant="secondary" className="gap-1">
          CrossFit
          <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      </div>
    </>
  );
}
