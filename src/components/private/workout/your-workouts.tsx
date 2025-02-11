"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { useTranslations } from "next-intl";

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

interface YourWorkoutsProps {
  workouts: {
    success: boolean;
    data: Workout[];
  };
}

export function YourWorkouts({ workouts }: YourWorkoutsProps) {
  const t = useTranslations("private-business.workouts-page");

  if (!workouts.success || !workouts.data?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("your-workouts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t("no-workouts")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("your-workouts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("workout-name")}</TableHead>
                  <TableHead>{t("created-at")}</TableHead>
                  <TableHead>{t("exercises")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workouts.data.map((workout) => (
                  <TableRow key={workout.id}>
                    <TableCell className="font-medium">
                      {workout.name}
                    </TableCell>
                    <TableCell>
                      {new Date(workout.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {workout.exercises.length} exercises
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <InfoIcon className="h-4 w-4 mr-2" />
                            {t("details")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{workout.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>{t("exercise")}</TableHead>
                                  <TableHead>{t("sets")}</TableHead>
                                  <TableHead>{t("reps")}</TableHead>
                                  <TableHead>{t("weight")}</TableHead>
                                  <TableHead>{t("duration")}</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {workout.exercises.map((exercise) => (
                                  <TableRow key={exercise.id}>
                                    <TableCell className="font-medium capitalize flex items-center gap-2">
                                      <img
                                        src={exercise.exercise.gif_url}
                                        alt={exercise.exercise.name}
                                        className="size-10"
                                      />
                                      {exercise.exercise.name}
                                    </TableCell>
                                    <TableCell>
                                      {exercise.sets || "-"}
                                    </TableCell>
                                    <TableCell>
                                      {exercise.reps || "-"}
                                    </TableCell>
                                    <TableCell>
                                      {exercise.weight
                                        ? `${exercise.weight}kg`
                                        : "-"}
                                    </TableCell>
                                    <TableCell>
                                      {exercise.duration
                                        ? `${exercise.duration}s`
                                        : "-"}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
