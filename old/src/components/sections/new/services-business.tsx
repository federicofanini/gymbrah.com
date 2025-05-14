"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MdTrendingUp,
  MdPerson,
  MdFitnessCenter,
  MdCalendarToday,
} from "react-icons/md";
import { CheckCheck, Timer, Loader2 } from "lucide-react";
import Link from "next/link";
import OutlinedButton from "@/components/ui/outlined-button";
import AvatarCircles from "@/components/ui/avatar-circles";
import { avatars } from "./hero";
import { getSubscriberCount } from "@/actions/subscribe-action";
import { useEffect, useState as useStateEffect } from "react";

const features = [
  {
    id: "profile-management",
    title: "Profile Management",
    description:
      "Create and manage your business profile with comprehensive tools for showcasing your services.",
    videoUrl: "/video/demo-business.mp4",
    benefits: [
      "Business Category & Services Tagging",
      "Custom Profile URL & Branding",
      "Image & Video Gallery Management",
      "Location & Map Integration",
    ],
    hrs: "Save 10 hours per month",
    icon: <MdTrendingUp className="w-8 h-8 text-cyan-600" />,
  },
  {
    id: "business-connect",
    title: "Business Connect",
    description:
      "Connect with your audience through multiple channels and manage your online presence.",
    videoUrl: "/video/demo-business.mp4",
    benefits: [
      "Contact Links (Email, Phone, WhatsApp)",
      "Social Media Integration",
      "External Booking URL Setup",
      "Email Notification System",
    ],
    hrs: "Save 8 hours per month",
    icon: <MdPerson className="w-8 h-8 text-cyan-600" />,
  },
  {
    id: "premium-features",
    title: "Premium Features",
    description:
      "Enhance your visibility and reach with premium listing options and advanced features.",
    videoUrl: "/video/demo-business.mp4",
    benefits: [
      "Featured Listing Badge",
      "Top Search Placement",
      "Advanced Analytics Dashboard",
      "Profile Views & Interactions",
    ],
    hrs: "Save 12 hours per month",
    icon: <MdFitnessCenter className="w-8 h-8 text-cyan-600" />,
  },
  {
    id: "reviews-management",
    title: "Reviews & Payments",
    description:
      "Manage your reputation and handle payments seamlessly with integrated tools.",
    videoUrl: "/video/demo-business.mp4",
    benefits: [
      "Public Ratings & Reviews System",
      "Review Response & Reporting",
      "Stripe Payment Integration",
      "Subscription Management",
    ],
    hrs: "Save 6 hours per month",
    icon: <MdCalendarToday className="w-8 h-8 text-cyan-600" />,
  },
];

export function ServicesBusiness({
  subscriberCount,
}: {
  subscriberCount: number;
}) {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-16" id="business">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.2] text-balance mb-4">
          <span className="relative inline-block px-1">
            Meet your fitness business partner
            <span className="hidden md:block absolute -bottom-1 left-0 w-full h-2 md:h-3 bg-cyan-400 -rotate-1 -z-10" />
          </span>
          <br />
          <span className="text-sm md:text-md text-muted-foreground font-medium tracking-normal">
            Available 24/7. Ready to do everything.
          </span>
        </h2>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent opacity-30" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {features.map((feature) => (
            <Button
              key={feature.id}
              variant={selectedFeature.id === feature.id ? "outline" : "ghost"}
              onClick={() => setSelectedFeature(feature)}
              className="min-w-[140px] rounded-xl"
            >
              {feature.icon}
              {feature.title}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="">
            <CardHeader>
              <CardTitle>{selectedFeature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                {selectedFeature.description}
              </p>
              <ul className="space-y-3">
                {selectedFeature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-cyan-500/10 rounded-full p-1">
                      <CheckCheck className="h-4 w-4 rounded-full text-cyan-600" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="text-green-600 font-medium flex items-center gap-2 text-start">
                <Timer className="h-4 w-4 rounded-full text-green-600" />
                {selectedFeature.hrs}
              </div>
              <div className="flex items-center gap-8">
                <div className="flex justify-center">
                  <Link href="/access">
                    <OutlinedButton
                      className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xl"
                      variant="secondary"
                    >
                      Join {subscriberCount} members
                      <AvatarCircles
                        avatarUrls={avatars}
                        className="hidden md:flex"
                      />
                    </OutlinedButton>
                  </Link>
                </div>
              </div>
            </CardFooter>
          </div>

          <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
            <video
              className="size-full overflow-hidden object-cover border border-primary border-t-2 border-b-2 rounded-t-[10px] rounded-b-[10px] shadow-lg"
              src="https://fuchsia-eldest-koi-370.mypinata.cloud/ipfs/bafybeidpq35tzzurokqwm2wtivng2i7h4b27ohbupflyqawpjn7v2vvody"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </div>
  );
}
