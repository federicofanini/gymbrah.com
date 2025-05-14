import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { getExerciseById } from "@/actions/exercises/exercise-id";
import { getExercises } from "@/actions/exercises/exercises-list";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/new/header";
import { Footer } from "@/components/sections/footer";
import { CTA } from "@/components/sections/cta";
import { getSubscriberCount } from "@/actions/subscribe-action";

export const revalidate = 3600; // Revalidate GIF URLs every hour

interface Props {
  params: { exerciseId: string } & Promise<any>;
}

export async function generateStaticParams() {
  const exercisesResponse = await getExercises({ page: 1, limit: 1000 });
  if (!exercisesResponse?.data?.success) {
    return [];
  }

  return exercisesResponse.data.data.exercises.map((exercise: any) => ({
    exerciseId: `${exercise.id}-${exercise.name
      .toLowerCase()
      .replace(/\s+/g, "-")}`,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const exerciseId = params.exerciseId.split("-")[0];
  const result = await getExerciseById({ id: exerciseId });

  if (!result?.data?.success || !result?.data?.data) {
    return {
      title: "Exercise Not Found",
      description: "The requested exercise could not be found.",
    };
  }

  const exercise = result.data.data;
  const exerciseUrl = `/exercises/${params.exerciseId}`;

  return {
    title: `${exercise.name} - Exercise Guide & Instructions`,
    description: `Learn how to properly perform the ${exercise.name}. Target muscle: ${exercise.target}. Equipment needed: ${exercise.equipment}. Complete guide with instructions and tips.`,
    alternates: {
      canonical: exerciseUrl,
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
      title: `${exercise.name} - Exercise Guide`,
      description: `Detailed guide for ${exercise.name} targeting ${exercise.target}. Equipment: ${exercise.equipment}`,
      images: [{ url: exercise.gif_url }],
      type: "article",
      url: exerciseUrl,
    },
  };
}

function generateExerciseStructuredData(exercise: any) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: exercise.name,
    description: `How to perform the ${exercise.name} exercise targeting ${exercise.target} using ${exercise.equipment}`,
    image: exercise.gif_url,
    supply: [
      {
        "@type": "HowToSupply",
        name: exercise.equipment,
      },
    ],
    step: exercise.instructions.map((instruction: string, index: number) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: instruction,
    })),
    totalTime: "PT5M",
    tool: [
      {
        "@type": "HowToTool",
        name: exercise.equipment,
      },
    ],
  };
}

async function ExercisePageContent({ exerciseId }: { exerciseId: string }) {
  // Extract the exercise ID from the URL parameter
  const id = exerciseId.split("-")[0];
  const result = await getExerciseById({ id });
  const subscriberCountResponse = await getSubscriberCount();
  const subscriberCount = subscriberCountResponse.success ? (
    subscriberCountResponse.data.count
  ) : (
    <Loader2 className="w-4 h-4 animate-spin" />
  );

  if (!result?.data?.success || !result?.data?.data) {
    notFound();
  }

  const exercise = result.data.data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateExerciseStructuredData(exercise)),
        }}
      />
      <Header />
      <div className="container max-w-4xl py-8">
        <article>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl capitalize">
                    {exercise.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="capitalize">
                        {exercise.body_part}
                      </Badge>
                      <Badge variant="secondary" className="capitalize">
                        {exercise.target}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {exercise.equipment}
                      </Badge>
                    </div>
                  </CardDescription>
                </div>
                <div className="w-full md:w-auto">
                  <img
                    src={exercise.gif_url}
                    alt={`${exercise.name} demonstration`}
                    className="rounded-lg w-full md:w-[300px] h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-3">Instructions</h2>
                  <ol className="list-decimal list-inside space-y-2">
                    {exercise.instructions.map(
                      (instruction: string, index: number) => (
                        <li key={index} className="text-muted-foreground">
                          {instruction}
                        </li>
                      )
                    )}
                  </ol>
                </section>

                <Separator />

                <section>
                  <h2 className="text-xl font-semibold mb-3">
                    Secondary Muscles
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {exercise.secondary_muscles.map(
                      (muscle: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="capitalize"
                        >
                          {muscle}
                        </Badge>
                      )
                    )}
                  </div>
                </section>

                <section className="prose prose-sm max-w-none">
                  <h2 className="text-xl font-semibold mb-3">
                    Additional Information
                  </h2>
                  <p>
                    The {exercise.name} is a {exercise.equipment}-based exercise
                    that primarily targets the {exercise.target}. This exercise
                    is particularly effective for {exercise.body_part}{" "}
                    development and can be incorporated into various workout
                    routines.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
      <CTA subscriberCount={subscriberCount} />
      <Footer />
    </>
  );
}

export default async function ExercisePage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="container max-w-4xl py-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <ExercisePageContent exerciseId={params.exerciseId} />
    </Suspense>
  );
}
