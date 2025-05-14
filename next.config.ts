import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "cloudflare-ipfs.com", // Common domain for exercise images
      "v2.exercisedb.io", // Exercise database API hostname
      "cdn.muscleandstrength.com", // Another common exercise image domain
      "images.unsplash.com", // For placeholders
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
