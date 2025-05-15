import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com", // Common domain for exercise images
      },
      {
        protocol: "https",
        hostname: "v2.exercisedb.io", // Exercise database API hostname
      },
      {
        protocol: "https",
        hostname: "cdn.muscleandstrength.com", // Another common exercise image domain
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // For placeholders
      },
    ],
  },
};

export default nextConfig;
