"use client";

import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { HeroSearch } from "@/components/ai-search/hero-search";
import { Search, Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="w-full relative">
      <div className="absolute top-18 left-1/2 transform -translate-x-1/2 z-20">
        <Badge
          variant="destructive"
          className="py-1.5 px-3 text-sm font-medium flex items-center gap-1.5 rounded-full"
        >
          <Construction className="h-3.5 w-3.5" />
          Under Development
        </Badge>
      </div>

      <div className="relative flex flex-col items-center w-full px-6 mb-10">
        <div className="relative z-10 pt-32 max-w-4xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tighter text-balance text-center text-primary">
              {hero.title}
            </h1>
            <p className="text-lg text-center text-gray-600 max-w-2xl mt-4">
              Discover gyms, trainers, and studios tailored to your exact needs.
            </p>
          </div>

          <div className="w-full bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <div className="w-full space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="sm:text-xl text-lg font-semibold text-gray-800 flex items-center">
                  <span className="sm:hidden">Find fitness</span>
                  <span className="hidden sm:block">
                    Search for a gym, trainer, or studio
                  </span>
                </h2>

                <Link
                  href="/search"
                  className="text-sm text-primary hover:text-primary/80 font-medium flex items-center"
                >
                  <span className="hidden sm:block">Advanced search</span>
                  <Search className="h-4 w-4 ml-1.5" />
                </Link>
              </div>
              <HeroSearch />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
    </section>
  );
}
