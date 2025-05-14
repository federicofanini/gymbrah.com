import { siteConfig } from "@/lib/config";
import Link from "next/link";
import AiSearch from "./ai-search";

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="w-full relative">
      <div className="relative flex flex-col items-center w-full px-6">
        <div className="relative z-10 pt-32 max-w-3xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tighter text-balance text-center text-primary">
              {hero.title}
            </h1>
          </div>
          <div className="flex items-center mb-12 w-full">
            <AiSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
