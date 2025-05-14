/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "randomuser.me" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "v2.exercisedb.io" },
      { hostname: "pbs.twimg.com" },
    ],
  },
  transpilePackages: ["geist"],
};

export default nextConfig;
