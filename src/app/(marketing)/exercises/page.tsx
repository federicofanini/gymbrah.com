import { Suspense } from "react";
import { WorkoutPage } from "./_components/workout";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getExercisesByBodyPart } from "@/packages/database/exercises/exercise-by-bodyPart";
import { getExercises } from "@/packages/database/exercises/exercises-list";

export const revalidate = 3600; // Revalidate GIF URLs every hour

interface Exercise {
  id: string;
  name: string | null;
  body_part: string | null;
  equipment: string | null;
  gif_url: string | null;
  target: string | null;
  secondary_muscles: string[];
  instructions: string[];
}

export async function generateStaticParams() {
  const exercisesResponse = await getExercises({ page: 1, limit: 1000 });
  if (!exercisesResponse?.data?.success) {
    return [];
  }

  const exercises = exercisesResponse.data.data?.exercises || [];
  const bodyParts = [
    ...new Set(
      exercises
        .map((exercise: Exercise) => exercise.body_part || "")
        .filter(Boolean)
    ),
  ] as string[];

  return bodyParts.map((bodyPart) => ({
    searchParams: { bodyPart },
  }));
}

export const metadata: Metadata = {
  title: "Exercise Library - Browse Exercises with Instructions & Animations",
  description:
    "Browse our comprehensive collection of exercises with detailed instructions and animations. Find exercises by body part, target muscle, and equipment.",
  keywords: [
    "exercises",
    "workout",
    "fitness",
    "exercise library",
    "exercise animations",
    "exercise instructions",
  ],
  alternates: {
    canonical: "/exercises",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Exercise Library - Browse Exercises with Instructions & Animations",
    description:
      "Browse our collection of exercises with detailed instructions and animations. Find exercises by body part, target muscle, and equipment.",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Exercise Library",
      },
    ],
  },
};

function LoadingSkeleton() {
  return (
    <div className="w-full px-4 md:px-8 py-4">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function generateStructuredData(exercises: Exercise[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: exercises.map((exercise, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Exercise",
        name: exercise.name,
        description: `${exercise.name} targeting ${exercise.target} using ${exercise.equipment}`,
        image: exercise.gif_url,
      },
    })),
  };
}

type SearchParams = {
  page?: string;
  bodyPart?: string;
  search?: string;
  target?: string;
  equipment?: string;
};

type PageProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, never> & Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: SearchParams & Promise<any>;
};

export default async function ExercisesPage(props: PageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ExercisesPageWrapper searchParams={props.searchParams} />
    </Suspense>
  );
}

async function ExercisesPageWrapper({
  searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: SearchParams & Promise<any>;
}) {
  // Just use searchParams directly without awaiting for backward compatibility
  const selectedBodyPart = searchParams.bodyPart || "all";
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 10;

  const exercisesResponse = await getExercisesByBodyPart({
    bodyPart: selectedBodyPart,
    page: currentPage,
    limit: pageSize,
  });

  if (!exercisesResponse?.data?.success) {
    return (
      <>
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-4">Exercise Library</h1>
          <p className="text-muted-foreground">Failed to load exercises.</p>
        </div>
      </>
    );
  }

  const initialExercisesResponse = await getExercises({
    page: 1,
    limit: 10,
  });

  if (!initialExercisesResponse?.data?.success) {
    throw new Error(
      initialExercisesResponse?.data?.error || "Failed to fetch exercises"
    );
  }

  const exercisesData = exercisesResponse.data.data || {
    exercises: [],
    pagination: { total: 0, pages: 0, currentPage: 1, limit: 10 },
  };

  // Convert potentially nullable fields to non-nullable for component props
  const sanitizedExercises = {
    exercises: exercisesData.exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name || "",
      body_part: exercise.body_part || "",
      equipment: exercise.equipment || "",
      target: exercise.target || "",
      gif_url: exercise.gif_url || "",
      secondary_muscles: exercise.secondary_muscles || [],
      instructions: exercise.instructions || [],
    })),
    pagination: exercisesData.pagination,
  };

  const initialExercisesData =
    initialExercisesResponse.data.data?.exercises?.map((exercise) => ({
      id: exercise.id,
      name: exercise.name || "",
      body_part: exercise.body_part || "",
      equipment: exercise.equipment || "",
      target: exercise.target || "",
      gif_url: exercise.gif_url || "",
      secondary_muscles: exercise.secondary_muscles || [],
      instructions: exercise.instructions || [],
    })) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateStructuredData(exercisesData.exercises)
          ),
        }}
      />
      <div className="py-12 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 px-4">Exercise Library</h1>
        <p className="text-lg text-muted-foreground mb-8 px-4">
          Browse our comprehensive collection of exercises with detailed
          instructions and animations
        </p>

        <WorkoutPage
          exercises={sanitizedExercises}
          initialExercises={initialExercisesData}
          workouts={[]}
          assignedWorkouts={[]}
        />
      </div>
    </>
  );
}
