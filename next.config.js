/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "via.placeholder.com",
      "cms.yorkacademy.uk",
      "lh3.googleusercontent.com",
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  distDir: "build",
};

module.exports = nextConfig;
