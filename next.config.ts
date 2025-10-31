import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // ensure turbopack mode is explicitly used
      rules: {},
    },
    // disable potentially unstable async storage features
    serverActions: false,
  },
  reactStrictMode: false, // reduce RSC strictness for some environments
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    config.infrastructureLogging = { level: "error" };

    // optional: isolate async storage context for webpack fallback
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
