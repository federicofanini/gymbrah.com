import { AuroraText } from "@/components/aurora-text";
import { Section } from "@/components/section";
import Link from "next/link";
import AvatarCircles from "../ui/avatar-circles";
import { Check } from "lucide-react";
import Image from "next/image";
import { Icons } from "../icons";
import { SubscribeInput } from "../ui/subscribe-input";

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}

// Mock avatar URLs matching the structure from avatars-urls.ts
const AvatarUrls: Avatar[] = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    profileUrl: "#",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/2?v=4",
    profileUrl: "#",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/3?v=4",
    profileUrl: "#",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/4?v=4",
    profileUrl: "#",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/5?v=4",
    profileUrl: "#",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/6?v=4",
    profileUrl: "#",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/7?v=4",
    profileUrl: "#",
  },
];

function HeroPill() {
  return (
    <Link
      href="#"
      className="flex items-center space-x-2 border border-secondary rounded-full px-4 py-1"
    >
      <p className="text-xs font-mono text-primary">Introducing GymBrah</p>
      <svg
        width="12"
        height="12"
        className="ml-1"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
          fill="hsl(var(--primary))"
        />
      </svg>
    </Link>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full flex-col overflow-hidden pt-8 text-center">
      <h1 className="text-center text-4xl font-semibold leading-tighter text-foreground sm:text-7xl tracking-tighter mb-8">
        <span className="inline-block text-balance">
          <AuroraText className="leading-normal">
            Build small habits to make a big difference.
          </AuroraText>
        </span>
      </h1>
      <div className="flex justify-center w-full mb-8 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600">🚧</span>
            <span className="font-medium text-sm sm:text-base">
              UNDER CONSTRUCTION
            </span>
            <span className="text-yellow-600">🚧</span>
          </div>
          <div className="hidden sm:block mx-2 h-4 w-px bg-yellow-200" />
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm">Follow on:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://x.com/FedericoFan"
                className="p-1.5 hover:bg-yellow-100 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Icons.twitter className="size-3 sm:size-4 text-yellow-700" />
              </a>
              <a
                href="https://github.com/federicofanini/gymbrah.com"
                className="p-1.5 hover:bg-yellow-100 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Icons.github className="size-3 sm:size-4 text-yellow-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-2 text-muted-foreground max-w-lg mx-auto sm:text-lg sm:leading-normal text-balance">
        <li className="grid items-center gap-2 text-center w-full mb-8">
          <span className="text-center justify-center">
            The best solution for{" "}
            <span className="font-semibold text-cyan-600">gyms</span> and{" "}
            <span className="font-semibold text-cyan-600">athletes 🏆</span>
          </span>
        </li>

        <li className="flex items-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          <span>
            Every{" "}
            <span className="font-semibold text-primary">
              achievement counts
            </span>
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          <span>
            Keep yourself{" "}
            <span className="font-semibold text-primary">accountable</span>
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          <span>
            Stay <span className="font-semibold text-primary">motivated</span>{" "}
            every step of the way
          </span>
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          <span>
            Build{" "}
            <span className="font-semibold text-primary">habits that last</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

async function HeroCTA() {
  return (
    <div className="relative mt-6 w-full flex justify-center">
      <SubscribeInput />

      {/* 
      <div className="flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row  sm:space-y-0">
        <Link href="/login" className="text-sm text-secondary underline">
          <OutlinedButton variant="secondary" className="bg-primary text-white">
            Join <span className="font-semibold text-white">{count}+</span>{" "}
            members
          </OutlinedButton>
        </Link> 
        </div> */}
    </div>
  );
}

async function Avatars() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <AvatarCircles numPeople={50} avatarUrls={AvatarUrls} />
      <p className="mt-4 text-xs text-muted-foreground text-center font-mono">
        <span className="font-semibold text-primary">Free </span>during beta.
      </p>
    </div>
  );
}

const AppScreenshot = () => {
  return (
    <div className="relative mt-8 w-full max-w-[1200px] mx-auto">
      <div className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden border">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src="/business.png"
              alt="GymBrah Business"
              fill
              className="object-center rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
              quality={90}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function Hero() {
  return (
    <Section id="hero">
      <div className="relative w-full p-6 border-x overflow-hidden flex justify-center items-center">
        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
          <HeroTitles />
          <HeroCTA />
          <Avatars />
          <AppScreenshot />
        </div>
      </div>
    </Section>
  );
}
