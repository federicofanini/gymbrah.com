import {
  Dumbbell,
  Weight,
  Apple,
  UserCog,
  Building2,
  Calendar,
  TrendingUp,
  Activity,
  AppleIcon,
} from "lucide-react";
import { OrbitingCircles } from "@/components/ui/orbiting-circle";
import Image from "next/image";

export function SecondBentoAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-background to-transparent z-20"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 size-16 bg-secondary p-2 rounded-full z-30 md:bottom-0 md:top-auto">
        <Image
          src="/logo/logo_black.png"
          alt="Logo"
          width={40}
          height={40}
          className="size-10"
        />
      </div>
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">
          <OrbitingCircles
            index={0}
            iconSize={60}
            radius={100}
            reverse
            speed={1}
          >
            <Dumbbell className="text-primary size-6" />
            <Activity className="text-primary size-6" />
            <AppleIcon className="text-primary size-6" />
          </OrbitingCircles>

          <OrbitingCircles index={1} iconSize={60} speed={0.5}>
            <Weight className="text-primary size-6" />
            <Apple className="text-primary size-6" />
            <UserCog className="text-primary size-6" />
          </OrbitingCircles>

          <OrbitingCircles
            index={2}
            iconSize={60}
            radius={230}
            reverse
            speed={0.5}
          >
            <Building2 className="size-6" />
            <Calendar className="size-6" />
            <TrendingUp className="size-6" />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}
