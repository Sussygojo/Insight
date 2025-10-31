/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: true,
  },
  webpack: (config) => {
    config.infrastructureLogging = { level: "error" };
    return config;
  },
};

module.exports = nextConfig;
