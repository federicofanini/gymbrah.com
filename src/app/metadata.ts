import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "SkyAgent",
    "AI",
    "Agent",
    "Magic UI",
    "Freelancer",
    "UI/UX",
    "Developer",
    "React Template",
    "Next.js Template",
    "Tailwind",
    "Shadcn",
    "Tailwind V4",
  ],
  authors: [
    {
      name: "Dillion Verma",
      url: "https://magicui.design",
    },
  ],
  creator: "dillionverma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@dillionverma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
