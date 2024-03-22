/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "keen-sheep-290.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
