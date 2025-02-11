import { getAthleteById } from "@/actions/business/athletes/get-athlete-by-id";
import { AthletePage } from "@/components/private/b2b/athletes/athlete-page";
import {
  AssignedWorkout,
  getAssignedWorkouts,
} from "@/actions/workout/assigned-workout";

// Define the type for the dynamic route params
type PageParams = { athleteId: string } & Promise<any>;

export default async function AthleteIdPage({
  params,
}: {
  params: PageParams;
}) {
  const [athleteResponse, assignedWorkoutsResponse] = await Promise.all([
    getAthleteById({
      athleteId: params.athleteId,
    }),
    getAssignedWorkouts({
      athleteId: params.athleteId,
    }),
  ]);

  console.log("assignedWorkouts -->", assignedWorkoutsResponse);

  if (!athleteResponse?.data?.success || !athleteResponse?.data?.data) {
    return (
      <div className="container max-w-[1050px] py-12">
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Unable to load athlete details
          </p>
        </div>
      </div>
    );
  }

  const athleteData = athleteResponse.data.data;
  const [gender] = athleteData.gender_age.split(" - ");

  const formattedWorkouts = assignedWorkoutsResponse?.data?.success
    ? assignedWorkoutsResponse.data.data.map((workout: AssignedWorkout) => ({
        id: workout.id,
        name: workout.workout.name,
        date: new Date().toISOString(),
        status: "scheduled" as const,
        type: "Workout",
        duration: 45,
        created_at: new Date().toISOString(),
        exercises: workout.workout.exercises.map((ex) => ({
          id: ex.id,
          exercise: {
            id: ex.exercise.id,
            name: ex.exercise.name,
            body_part: ex.exercise.body_part,
            equipment: ex.exercise.equipment,
            target: ex.exercise.target,
            gif_url: ex.exercise.gif_url,
            secondary_muscles: ex.exercise.secondary_muscles,
            instructions: ex.exercise.instructions,
          },
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          duration: ex.duration,
          round: ex.round,
        })),
      }))
    : [];

  console.log("formattedWorkouts -->", formattedWorkouts);

  // Filter workouts for this athlete's view
  const athleteWorkouts = formattedWorkouts.filter((workout: any) =>
    assignedWorkoutsResponse?.data?.data.find(
      (assigned: AssignedWorkout) =>
        assigned.id === workout.id && assigned.athlete_id === params.athleteId
    )
  );

  const formattedAthleteData = {
    id: params.athleteId,
    fullName: athleteData.full_name,
    goal: athleteData.goal,
    gender,
    age: parseInt(athleteData.gender_age.split("y")[0].split(" - ")[1]),
    isActive: athleteData.status === "Active",
    stats: {
      workoutsCompleted: 156, // Mock data
      currentStreak: 5,
      bestStreak: 14,
      joinedDate: "2023-09-15",
    },
    recentWorkouts: athleteWorkouts,
    workouts: athleteWorkouts,
  };

  console.log("formattedAthleteData -->", formattedAthleteData);

  return <AthletePage athlete={formattedAthleteData} />;
}
