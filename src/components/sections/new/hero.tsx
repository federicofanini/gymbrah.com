import Link from "next/link";
import OutlinedButton from "../../ui/outlined-button";
import { Check, Loader2, Plus, Search, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WordAnimation } from "./word-animation";
import AvatarCircles from "@/components/ui/avatar-circles";
import { paths } from "@/lib/path";
import { Suspense } from "react";
import { GithubStars } from "../github-stars";

export const avatars = [
  {
    imageUrl: "ff.jpg",
    profileUrl: "/federicofan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/6417038",
    profileUrl: "/profile/2",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/383994",
    profileUrl: "/profile/3",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/1500684",
    profileUrl: "/profile/4",
  },
];

function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mt-6 md:mt-10 max-w-[580px] text-primary leading-tight text-lg md:text-xl font-medium">
        Made for <WordAnimation />{" "}
      </div>
      <Carousel className="w-full mx-auto aspect-video sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px]">
        <CarouselContent>
          <CarouselItem>
            <video
              className="size-full overflow-hidden object-cover border border-primary border-t-2 border-b-2 rounded-t-[10px] rounded-b-[10px] shadow-lg"
              src="https://fuchsia-eldest-koi-370.mypinata.cloud/ipfs/bafybeidpq35tzzurokqwm2wtivng2i7h4b27ohbupflyqawpjn7v2vvody"
              autoPlay
              loop
              muted
              playsInline
            />
          </CarouselItem>
          <CarouselItem>
            <div className="size-full overflow-hidden object-cover border border-primary border-t-2 border-b-2 rounded-t-[10px] rounded-b-[10px] shadow-lg flex items-center justify-center">
              <span className="text-center text-muted-foreground">
                Athlete demo coming soon...
              </span>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function Members({
  members,
  gyms,
  pts,
}: {
  members: number;
  gyms: number;
  pts: number;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-2xl mx-auto">
      <div className="text-center flex flex-col items-center gap-2">
        <div className="text-2xl font-bold text-primary">{members}</div>
        <div className="text-sm text-muted-foreground">Members</div>
        <AvatarCircles avatarUrls={avatars} />
      </div>
      <div className="text-center flex flex-col items-center gap-2">
        <div className="text-2xl font-bold text-primary">{gyms}</div>
        <div className="text-sm text-muted-foreground">Gyms</div>
      </div>
      <div className="text-center flex flex-col items-center gap-2">
        <div className="text-2xl font-bold text-primary">{pts}</div>
        <div className="text-sm text-muted-foreground">Personal Trainers</div>
      </div>
    </div>
  );
}

export async function Hero({
  gyms,
  pts,
  members,
}: {
  gyms: number;
  pts: number;
  members: number;
}) {
  return (
    <div className="sm:mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
      <div className="py-12 md:py-28 flex flex-col sm:flex-row gap-12 justify-between items-center">
        <div className="lg:max-w-lg space-y-8 w-full">
          <h1 className="text-5xl mb-8 text-balance font-bold">
            The only Fitness Directory you{" "}
            <span className="relative inline-block">
              need.
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-red-400 -rotate-2 -z-10" />
            </span>
          </h1>
          <h2 className="text-primary font-medium">
            Discover top-rated gyms and personal trainers near you.
          </h2>

          <ul className="flex flex-col gap-2 text-muted-foreground max-w-lg mx-auto sm:text-lg sm:leading-normal text-balance">
            <li className="flex items-center gap-2">
              <X className="h-5 w-5 text-red-600" />
              <span>
                No{" "}
                <span className="font-semibold text-primary">memberships.</span>{" "}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <X className="h-5 w-5 text-red-600" />
              <span>
                No{" "}
                <span className="font-semibold text-primary">
                  booking hassle.
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span>
                Just{" "}
                <span className="font-semibold text-primary">
                  clear, verified fitness options.
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span>
                Compare{" "}
                <span className="font-semibold text-primary">
                  gyms, explore local trainers,
                </span>{" "}
                and get inspired to move.
              </span>
            </li>
          </ul>

          <div className="flex items-center gap-8">
            <div className="flex justify-center">
              <Link href={paths.discover}>
                <OutlinedButton
                  className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xl"
                  variant="secondary"
                >
                  <Search className="h-5 w-5" />
                  Explore listings
                </OutlinedButton>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link href={paths.discover}>
                <OutlinedButton
                  className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white text-xl"
                  variant="secondary"
                >
                  <Plus className="h-5 w-5" />
                  Add your business
                </OutlinedButton>
              </Link>
            </div>
          </div>
        </div>
        <Demo />
      </div>
      {/* <Members gyms={gyms} pts={pts} members={members} /> */}
    </div>
  );
}
