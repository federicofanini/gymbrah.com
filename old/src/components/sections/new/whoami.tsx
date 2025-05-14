import Link from "next/link";
import { TwitterCard } from "./twitter";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Icons } from "@/components/icons";

export function WhoAmI() {
  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-16" id="about">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-balance mb-4">
          <span className="relative inline-block px-1">
            Hey, it&apos;s Federico 👋
            <span className="hidden md:block absolute -bottom-1 left-0 w-full h-2 md:h-3 bg-teal-400 -rotate-1 -z-10" />
          </span>
        </h2>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-400/20 via-transparent to-transparent opacity-30" />
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <div className="bg-teal-400/20 rounded-xl p-6 mb-8 border border-teal-400/50 relative">
          <Link
            href="https://x.com/FedericoFan"
            target="_blank"
            className="absolute top-4 right-4 bg-teal-600 text-white text-xs px-3 py-1 rounded-xl hover:bg-teal-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              Follow me on <Icons.twitter className="size-2.5" />
            </span>
          </Link>
          <TwitterCard />
        </div>

        <CardHeader>
          <CardTitle>My Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            I noticed two big challenges in fitness:{" "}
            <strong>staying motivated</strong> and{" "}
            <strong>helping fitness creators</strong> reach their audience
            effectively.
          </p>

          <p className="text-muted-foreground">
            That&apos;s why I created <strong>GymBrah</strong>, with three core
            missions in mind:
          </p>

          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            <li>
              <span className="font-semibold text-teal-600">
                Build Community
              </span>{" "}
              — Create a supportive space where fitness enthusiasts motivate
              each other.
            </li>
            <li>
              <span className="font-semibold text-teal-600">
                Boost Creators
              </span>{" "}
              — Help fitness creators share their skills and grow their impact.
            </li>
            <li>
              <span className="font-semibold text-teal-600">
                Drive Motivation
              </span>{" "}
              — Keep people committed to their fitness journey.
            </li>
          </ul>

          <p className="text-muted-foreground">
            My own fitness journey has taught me that staying motivated is
            easier when you&apos;re part of a community. Through Gymbrah,
            I&apos;ve found my own motivation grow stronger as I help others
            achieve their goals.
          </p>

          <p className="text-muted-foreground">
            Today, my goal is to connect thousands of athletes with amazing
            creators, building a community where everyone supports each
            other&apos;s success.
          </p>

          <p className="font-medium">See what our community have to say 👇</p>
        </CardContent>
      </div>
    </div>
  );
}
