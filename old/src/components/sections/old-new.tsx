import { Section } from "@/components/section";
import {
  AlertOctagon,
  Clock,
  Lock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export function OldNew() {
  return (
    <Section id="comparison" title="Old Way vs New Way">
      <div className="grid grid-cols-1 md:grid-cols-2 border-x border-t">
        {/* Old Way */}
        <div className="p-8 border-b md:border-r bg-red-500/10 hover:bg-red-500/40 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold font-mono">The old way</h3>
          </div>
          <ul className="space-y-6 text-muted-foreground">
            <li className="flex items-start gap-3">
              <AlertOctagon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <span className="leading-relaxed">
                Forget to track your progress, relying on{" "}
                <span className="font-semibold text-primary">memory</span> and
                losing sight of your achievements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <span className="leading-relaxed">
                Struggle with{" "}
                <span className="font-semibold text-primary">
                  inconsistent routines
                </span>
                , making it hard to build lasting fitness habits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
              <span className="leading-relaxed">
                Lack motivation and accountability, leading to{" "}
                <span className="font-semibold text-primary">
                  abandoned goals
                </span>
                .
              </span>
            </li>
          </ul>
        </div>

        {/* New Way */}
        <div className="p-8 border-b bg-green-500/10 hover:bg-green-500/40 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold font-mono">The new way</h3>
          </div>
          <ul className="space-y-6 text-muted-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="leading-relaxed">
                Track your workouts with{" "}
                <span className="font-semibold text-primary">
                  intelligent logs
                </span>{" "}
                that show your progress over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="leading-relaxed">
                Build{" "}
                <span className="font-semibold text-primary">
                  personalized routines
                </span>{" "}
                that fit your lifestyle and keep you consistent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <span className="leading-relaxed">
                Stay accountable with{" "}
                <span className="font-semibold text-primary">
                  AI-powered coaching
                </span>
                , keeping you motivated and on track.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
