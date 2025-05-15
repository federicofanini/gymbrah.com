import { MetadataRoute } from "next";
import { getExercises } from "@/packages/database/exercises/exercises-list";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment variable or default
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://gymbrah.com";

  // Static routes
  const staticRoutes = [
    "/",
    "/exercises",
    "/pricing",
    "/search",
    "/sponsor",
    "/listing",
    "/pts",
    "/gyms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch all exercises for dynamic routes
  const exercisesResponse = await getExercises({ page: 1, limit: 1000 });
  const exerciseRoutes = exercisesResponse?.data?.success
    ? exercisesResponse.data.data?.exercises.map((exercise) => ({
        url: `${baseUrl}/exercises/${exercise.id}-${
          exercise.name?.toLowerCase().replace(/\s+/g, "-") || "exercise"
        }`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })) || []
    : [];

  return [...staticRoutes, ...exerciseRoutes];
}
