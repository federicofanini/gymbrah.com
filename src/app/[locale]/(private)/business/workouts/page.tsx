import { Suspense } from "react";
import { WorkoutPage } from "@/components/private/workout";
import { getExercisesByBodyPart } from "@/actions/exercises/exercise-by-bodyPart";
import { getExercises } from "@/actions/exercises/exercises-list";
import { getWorkout } from "@/actions/workout/get-workout";
import { getBusinessId } from "@/actions/business/business-id";
import { getAthletes } from "@/actions/business/athletes/get-athletes";
import { getAssignedWorkouts } from "@/actions/workout/assigned-workout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchParams {
  bodyPart?: string;
  page?: string;
}

async function WorkoutsPageWrapper({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const selectedBodyPart = (await searchParams).bodyPart || "all";
  const currentPage = Number((await searchParams).page) || 1;
  const pageSize = 25;

  // Fetch exercises for selected body part
  const exercisesResponse = await getExercisesByBodyPart({
    bodyPart: selectedBodyPart,
    page: currentPage,
    limit: pageSize,
  });

  if (!exercisesResponse?.data?.success) {
    throw new Error(exercisesResponse?.data?.error as string);
  }

  // Fetch initial exercises for all body parts
  const initialExercisesResponse = await getExercises({
    page: 1,
    limit: 10, // Fetch more initial exercises to have a good base for filtering
  });

  if (!initialExercisesResponse?.data?.success) {
    throw new Error(initialExercisesResponse?.data?.error as string);
  }

  const businessIdResponse = await getBusinessId();

  if (!businessIdResponse?.data?.success) {
    throw new Error(businessIdResponse?.data?.error as string);
  }

  // Fetch workouts
  const workoutsResponse = await getWorkout({
    businessId: businessIdResponse.data.data,
  });

  if (!workoutsResponse?.data?.success) {
    throw new Error(workoutsResponse?.data?.error as string);
  }

  const athletesResponse = await getAthletes();

  if (!athletesResponse?.data?.success) {
    throw new Error(athletesResponse?.data?.error as string);
  }

  // Fetch assigned workouts
  const assignedWorkoutsResponse = await getAssignedWorkouts({
    athleteId: "1",
  });

  if (!assignedWorkoutsResponse?.data?.success) {
    console.log("assignedWorkoutsResponse", assignedWorkoutsResponse);
  }

  return (
    <div className="space-y-4">
      <WorkoutPage
        assignedWorkouts={assignedWorkoutsResponse?.data?.data}
        exercises={exercisesResponse.data.data}
        initialExercises={initialExercisesResponse.data.data.exercises}
        workouts={workoutsResponse.data.data}
        athletes={{
          athletes: athletesResponse.data.data,
          pagination: athletesResponse.data.data.pagination,
        }}
      />
    </div>
  );
}

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

export default function Workouts({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <WorkoutsPageWrapper searchParams={searchParams} />
    </Suspense>
  );
}
