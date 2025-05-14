import { Suspense } from "react";
import { WorkoutPage } from "./_components/workout";
import { Header } from "@/components/sections/new/header";
import { Footer } from "@/components/sections/footer";
import { CTA } from "@/components/sections/cta";
import { getSubscriberCount } from "@/actions/subscribe-action";
import { Loader2 } from "lucide-react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getExercisesByBodyPart } from "@/actions/exercises/exercise-by-bodyPart";
import { getExercises } from "@/actions/exercises/exercises-list";

export const revalidate = 3600; // Revalidate GIF URLs every hour

export async function generateStaticParams() {
  const exercisesResponse = await getExercises({ page: 1, limit: 1000 });
  if (!exercisesResponse?.data?.success) {
    return [];
  }

  const exercises = exercisesResponse.data.data.exercises;
  const bodyParts = [
    ...new Set(exercises.map((exercise: any) => exercise.body_part)),
  ] as string[];

  return bodyParts.map((bodyPart) => ({
    searchParams: { bodyPart },
  }));
}

export const metadata: Metadata = constructMetadata({
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
      "Browse our comprehensive collection of exercises with detailed instructions and animations. Find exercises by body part, target muscle, and equipment.",
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
});

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

function generateStructuredData(exercises: any[]) {
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

async function ExercisesPageWrapper({
  searchParams,
}: {
  searchParams: {
    page?: string;
    bodyPart?: string;
    search?: string;
    target?: string;
    equipment?: string;
  } & Promise<any>;
}) {
  const subscriberCountResponse = await getSubscriberCount();
  const subscriberCount = subscriberCountResponse.success ? (
    subscriberCountResponse.data.count
  ) : (
    <Loader2 className="w-4 h-4 animate-spin" />
  );

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
        <Header />
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-4">Exercise Library</h1>
          <p className="text-muted-foreground">Failed to load exercises.</p>
        </div>
        <CTA subscriberCount={subscriberCount} />
        <Footer />
      </>
    );
  }

  const initialExercisesResponse = await getExercises({
    page: 1,
    limit: 10,
  });

  if (!initialExercisesResponse?.data?.success) {
    throw new Error(initialExercisesResponse?.data?.error as string);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateStructuredData(exercisesResponse.data.data.exercises)
          ),
        }}
      />
      <Header />
      <div className="py-8 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 px-4">Exercise Library</h1>
        <p className="text-lg text-muted-foreground mb-8 px-4">
          Browse our comprehensive collection of exercises with detailed
          instructions and animations
        </p>

        <WorkoutPage
          exercises={exercisesResponse.data.data}
          initialExercises={initialExercisesResponse.data.data.exercises}
          workouts={[]}
          assignedWorkouts={[]}
        />
      </div>
      <CTA subscriberCount={subscriberCount} />
      <Footer />
    </>
  );
}

export default function ExercisesPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    bodyPart?: string;
    search?: string;
    target?: string;
    equipment?: string;
  } & Promise<any>;
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ExercisesPageWrapper searchParams={searchParams} />
    </Suspense>
  );
}
