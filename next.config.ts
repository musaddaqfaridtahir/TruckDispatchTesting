import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '10.71.214.143',
    '10.71.214.*',
    '192.168.*',
    'localhost',
    '127.0.0.1',
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
