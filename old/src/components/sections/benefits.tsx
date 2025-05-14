import { Section } from "@/components/section";
import { HeartPulse, TrendingUp, CheckCircle, Clock } from "lucide-react";

export function Benefits() {
  return (
    <Section id="benefits" title="Why founders choose us?">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-x border-t">
        <div className="flex flex-col p-4 border-b md:border-r bg-muted/10 hover:bg-muted/40 transition-colors">
          <h3 className="text-lg font-medium mb-1 flex items-center gap-2 mb-4">
            <HeartPulse className="size-6 text-primary" />
            Track Progress
          </h3>
          <p className="text-sm text-muted-foreground">
            Monitor your{" "}
            <span className="font-semibold text-primary">workouts</span> and{" "}
            <span className="font-semibold text-primary">achievements</span>{" "}
            with intelligent progress tracking.
          </p>
        </div>

        <div className="flex flex-col p-4 border-b md:border-r border-l bg-muted/10 hover:bg-muted/40 transition-colors">
          <h3 className="text-lg font-medium mb-1 flex items-center gap-2 mb-4">
            <TrendingUp className="size-6 text-primary" />
            Build Habits
          </h3>
          <p className="text-sm text-muted-foreground">
            Create{" "}
            <span className="font-semibold text-primary">
              personalized routines
            </span>{" "}
            that fit your lifestyle and build
            <span className="font-semibold text-primary"> lasting habits</span>.
          </p>
        </div>

        <div className="flex flex-col p-4 border-b md:border-r border-l bg-muted/10 hover:bg-muted/40 transition-colors">
          <h3 className="text-lg font-medium mb-1 flex items-center gap-2 mb-4">
            <CheckCircle className="size-6 text-primary" />
            Stay Accountable
          </h3>
          <p className="text-sm text-muted-foreground">
            Get{" "}
            <span className="font-semibold text-primary">
              AI-powered coaching
            </span>{" "}
            and reminders to stay on track with your
            <span className="font-semibold text-primary"> goals</span>.
          </p>
        </div>

        <div className="flex flex-col p-4 border-b md:border-r border-l bg-muted/10 hover:bg-muted/40 transition-colors">
          <h3 className="text-lg font-medium mb-1 flex items-center gap-2 mb-4">
            <Clock className="size-6 text-primary" />
            Save Time
          </h3>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Automate</span> and
            simplify your fitness journey to focus on what matters.
          </p>
        </div>
      </div>
    </Section>
  );
}
