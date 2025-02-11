import { Section } from "@/components/section";
import { Dumbbell, Target, Trophy, Flame } from "lucide-react";
import { MdBarChart, MdSportsGymnastics } from "react-icons/md";
import { useTranslations } from "next-intl";

const businessFeatures = [
  {
    name: "business_features.member_management",
    description: "business_features.member_management_description",
    icon: <MdSportsGymnastics className="w-8 h-8 text-cyan-600" />,
  },
  {
    name: "business_features.performance_analytics",
    description: "business_features.performance_analytics_description",
    icon: <MdBarChart className="w-8 h-8 text-cyan-600" />,
  },
  {
    name: "business_features.workouts_routines",
    description: "business_features.workouts_routines_description",
    icon: <Dumbbell className="w-8 h-8 text-cyan-600" />,
  },
];

const athleteFeatures = [
  {
    name: "athlete_features.no_more_workout_notes",
    description: "athlete_features.no_more_workout_notes_description",
    icon: <Target className="w-8 h-8 text-cyan-600" />,
  },
  {
    name: "athlete_features.achievement_tracking",
    description: "athlete_features.achievement_tracking_description",
    icon: <Trophy className="w-8 h-8 text-cyan-600" />,
  },
  {
    name: "athlete_features.workout_tracking",
    description: "athlete_features.workout_tracking_description",
    icon: <Flame className="w-8 h-8 text-cyan-600" />,
  },
];

const FeatureCard = ({
  name,
  description,
  icon: Icon,
  index,
}: (typeof businessFeatures)[0] & { index: number }) => {
  const t = useTranslations();

  return (
    <div
      key={index}
      className="group relative flex py-12 w-full flex-col items-center justify-center overflow-hidden border bg-background shadow-sm transition-all hover:shadow-lg"
    >
      {/* Content */}
      <div className="flex flex-col items-center gap-6 relative z-10 px-6">
        <div className="rounded-xl bg-cyan-500/10 p-4 w-fit ring-1 ring-cyan-500 shadow-sm transition-transform duration-300 group-hover:scale-110">
          {Icon}
        </div>

        <div className="space-y-2 text-center">
          <h3 className="font-semibold text-2xl tracking-tight">{t(name)}</h3>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
            {t(description)}
          </p>
        </div>
      </div>
    </div>
  );
};

export function Features() {
  return (
    <>
      <Section
        id="business"
        title="For Gyms"
        subtitle="Same business, smarter gym"
      >
        <div className="gap-4 mx-auto p-6 border-x border-t grid sm:grid-cols-3">
          {businessFeatures.map(({ name, description, icon: Icon }, index) => (
            <FeatureCard
              key={index}
              name={name}
              description={description}
              icon={Icon}
              index={index}
            />
          ))}
        </div>
      </Section>

      <Section
        id="athletes"
        title="For Athletes"
        subtitle="Best workouts, better results"
      >
        <div className="gap-4 mx-auto p-6 border-x border-t grid sm:grid-cols-3">
          {athleteFeatures.map(({ name, description, icon: Icon }, index) => (
            <FeatureCard
              key={index}
              name={name}
              description={description}
              icon={Icon}
              index={index}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
