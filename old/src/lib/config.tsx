import { Icons } from "@/components/icons";
import {
  AudioLines,
  BrainIcon,
  CodeIcon,
  Dumbbell,
  GlobeIcon,
  Handshake,
  Loader,
  PlugIcon,
  SmilePlus,
  Timer,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import { paths } from "./path";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "GymBrah",
  description: "Build better tiny habits to get fit and healthy.",
  cta: "Start now",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "tiny habits",
    "fitness",
    "health",
    "habits",
    "AI",
    "health coach",
    "AI health coach",
    "AI fitness coach",
    "AI health coach",
    "AI fitness coach",
    "gym",
    "exercise",
    "workout",
    "health",
  ],
  links: {
    email: "fedef@gymbrah.com",
    twitter: "https://twitter.com/gymbrah",
    discord: "https://discord.gg/gymbrah",
    github: "https://github.com/gymbrah",
    instagram: "https://instagram.com/gymbrah",
  },
  hero: {
    title: "Build your dream body with habits that last",
    description:
      "Transform your fitness journey with GymBrah's intelligent workout tracking, personalized habit building, and AI-powered accountability coaching. Join thousands building sustainable fitness habits that last.",
    cta: "Start your fitness journey",
    ctaDescription: "10+ founders are building tiny habits",
  },
  features: [
    {
      name: "Fitness Tracking",
      description: (
        <span>
          Track your{" "}
          <span className="font-semibold text-primary">workouts</span>, set{" "}
          <span className="font-semibold text-primary">goals</span>, and monitor
          your <span className="font-semibold text-primary">progress</span>{" "}
          across multiple metrics — whether it&apos;s{" "}
          <span className="font-semibold text-primary">strength</span>,{" "}
          <span className="font-semibold text-primary">endurance</span>, or
          overall fitness.
        </span>
      ),
      icon: <AudioLines className="h-6 w-6" />,
    },
    {
      name: "Progress Insights",
      description: (
        <span>
          Set{" "}
          <span className="font-semibold text-primary">
            personalized fitness goals
          </span>{" "}
          and get insights into your performance. Celebrate{" "}
          <span className="font-semibold text-primary">milestones</span> in your
          fitness journey to stay{" "}
          <span className="font-semibold text-primary">motivated</span> and on
          track.
        </span>
      ),
      icon: <Loader className="h-6 w-6" />,
    },
    {
      name: "Customizable Workouts",
      description: (
        <span>
          Create your own{" "}
          <span className="font-semibold text-primary">workouts</span>, follow
          predefined{" "}
          <span className="font-semibold text-primary">fitness plans</span>, or
          customize routines to fit your needs. Adapts to your{" "}
          <span className="font-semibold text-primary">
            personal fitness level
          </span>{" "}
          and evolves with your goals.
        </span>
      ),
      icon: <Dumbbell className="h-6 w-6" />,
    },
    {
      name: "Real-Time Accountability",
      description: (
        <span>
          Stay <span className="font-semibold text-primary">accountable</span>{" "}
          to your fitness goals with regular{" "}
          <span className="font-semibold text-primary">updates</span>,
          <span className="font-semibold text-primary">reminders</span>, and{" "}
          <span className="font-semibold text-primary">progress tracking</span>.
          Gymbrah ensures you&apos;re always moving forward with encouragement
          at every step.
        </span>
      ),
      icon: <Timer className="h-6 w-6" />,
    },
    {
      name: "Community Support",
      description: (
        <span>
          Connect with{" "}
          <span className="font-semibold text-primary">
            like-minded individuals
          </span>{" "}
          in the Gymbrah community. Share your progress,{" "}
          <span className="font-semibold text-primary">cheer on others</span>,
          and get inspired to push harder as you grow alongside a{" "}
          <span className="font-semibold text-primary">supportive network</span>
          .
        </span>
      ),
      icon: <Handshake className="h-6 w-6" />,
    },
    {
      name: "Community Driven",
      description: (
        <span>
          Gymbrah is built with{" "}
          <span className="font-semibold text-primary">transparency</span> in
          mind. Share your experience with the growing{" "}
          <span className="font-semibold text-primary">Gymbrah community</span>.
        </span>
      ),
      icon: <SmilePlus className="h-6 w-6" />,
    },
  ],
  pricing: [
    {
      name: "Athletes",
      price: 0, // beta price
      currency: "$",
      anchor: 95,
      description: "Find and connect with the perfect gym or trainer.",
      features: [
        "Smart location-based search",
        "Category & service filtering",
        "View pricing & contact details",
        "Save favorite gyms & trainers",
        "Leave reviews & ratings",
        "Mobile responsive experience",
      ],
      cta: "Join Beta",
      link: paths.users.dashboard,
    },
    {
      name: "Fitness Businesses",
      price: 0, // beta price
      currency: "$",
      anchor: 495,
      description: "Grow your fitness business with our platform.",
      features: [
        "Create compelling business profiles",
        "Manage bookings & payments",
        "Handle reviews & reputation",
        "Premium listing features",
        "Analytics dashboard",
        "Priority support",
      ],
      cta: "Join Beta",
      popular: true,
      link: paths.business.dashboard,
    },
  ],
  footer: {
    socialLinks: [
      {
        icon: <Icons.twitter className="size-4" />,
        url: "https://x.com/GymBrah_com",
      },
      {
        icon: <Icons.bsky className="h-5 w-5" />,
        url: "https://bsky.app/profile/gymbrah.com",
      },
      {
        icon: <Icons.discord className="h-5 w-5" />,
        url: "https://discord.gg/f7fSp6vQcK",
      },
      {
        icon: <Icons.github className="h-5 w-5" />,
        url: "https://github.com/federicofanini/gymbrah.com",
      },
    ],
    links: [
      { text: "Terms", url: "/terms" },
      { text: "Privacy", url: "/privacy" },
      { text: "fed.fan", url: "https://fed.fan" },
    ],
    bottomText: "All rights reserved.",
    brandText: "GYMBRAH",
  },

  testimonials: [
    {
      id: 1,
      text: "The AI Agent SDK has revolutionized how we build intelligent systems. It's incredibly intuitive and powerful.",
      name: "Alice Johnson",
      company: "OpenMind Labs",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      text: "We've significantly reduced development time for our AI projects using this SDK. The multi-agent feature is a game-changer.",
      name: "Bob Brown",
      company: "NeuralForge",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      text: "The cross-language support allowed us to seamlessly integrate AI agents into our existing tech stack.",
      name: "Charlie Davis",
      company: "CodeHarbor",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 4,
      text: "The AI Agent SDK's tool integration feature has streamlined our workflow automation processes.",
      name: "Diana Evans",
      company: "AutomateX",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 5,
      text: "The customizable agent behaviors have allowed us to create highly specialized AI solutions for our clients.",
      name: "Ethan Ford",
      company: "AICore",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 6,
      text: "The AI Agent SDK's efficiency features have significantly improved our system's performance and scalability.",
      name: "Fiona Grant",
      company: "ScaleAI",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 7,
      text: "The SDK's intuitive APIs have made it easy for our team to quickly prototype and deploy AI agent systems.",
      name: "George Harris",
      company: "RapidAI",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 8,
      text: "The AI Agent SDK's multi-agent system has enabled us to build complex, collaborative AI solutions with ease.",
      name: "Hannah Irving",
      company: "CollabAI",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 9,
      text: "The SDK's flexibility in integrating external tools has expanded our AI agents' capabilities tremendously.",
      name: "Ian Johnson",
      company: "FlexAI",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 10,
      text: "The AI Agent SDK's documentation and support have made our learning curve much smoother.",
      name: "Julia Kim",
      company: "DevAI",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 11,
      text: "We've seen a significant boost in our AI's decision-making capabilities thanks to the AI Agent SDK.",
      name: "Kevin Lee",
      company: "DecisionTech",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 12,
      text: "The SDK's multi-agent system has revolutionized our approach to complex problem-solving.",
      name: "Laura Martinez",
      company: "SolveX",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 13,
      text: "The customization options in the AI Agent SDK have allowed us to create truly unique AI solutions.",
      name: "Michael Chen",
      company: "UniqueAI",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 14,
      text: "The efficiency of the AI Agent SDK has significantly reduced our development time and costs.",
      name: "Natalie Wong",
      company: "FastTrackAI",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
    {
      id: 15,
      text: "The cross-language support has made it easy for our diverse team to collaborate on AI projects.",
      name: "Oliver Smith",
      company: "GlobalAI",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
