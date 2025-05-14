"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";
import { ExerciseTable } from "./exercise-table";

interface Exercise {
  id: string;
  name: string;
  body_part: string;
  equipment: string;
  target: string;
  gif_url: string;
  secondary_muscles: string[];
  instructions: string[];
}

interface WorkoutExercise {
  id: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  round?: string;
  exercise: Exercise;
}

interface Workout {
  id: string;
  name: string;
  created_at: string;
  exercises: WorkoutExercise[];
}

interface Athlete {
  id: string;
  full_name: string;
  goal: string;
  gender_age: string;
  status: string;
}

interface PaginatedResponse {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

interface AssignedWorkout {
  id: string;
  workout: {
    id: string;
    name: string;
    exercises: {
      exercise: {
        id: string;
        name: string;
      };
    }[];
  };
  athlete_id: string;
}

interface WorkoutPageProps {
  exercises: {
    exercises: Exercise[];
    pagination: PaginatedResponse;
  };
  initialExercises: Exercise[];
  workouts: Workout[];
  assignedWorkouts: AssignedWorkout[];
}

export function WorkoutPage({ exercises, initialExercises }: WorkoutPageProps) {
  return (
    <div className="w-full px-4">
      <ExerciseTable
        exercises={exercises}
        initialExercises={initialExercises}
      />
    </div>
  );
}
