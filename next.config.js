/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.clerk.dev"],
  },
};

module.exports = nextConfig;
