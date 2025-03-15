const createNextIntlPlugin = require('next-intl/plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination:`/en/home`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/plan_register",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/plan_register`,
      },
      {
        source: "/api/certificates_review",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/certificates-review`,
      },
      {
        source: "/api/contact_us/send-message",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/contact_us/send-message`,
      },
      {
        source: "/api/proxy",
        destination: "https://review-main.yorkacademy.uk/api/down_file",
      },
      {
        source: "/api/pdf/:path*",
        destination: "https://review-main.yorkacademy.uk/api/read_file?path=:path*",
      },
    ];
  },
  reactStrictMode: false,
  images: {
    domains: [
      "via.placeholder.com",
      "cms.yorkacademy.uk",
      "lh3.googleusercontent.com",
      "yorkbritishacademy.uk",
      "review-main.yorkacademy.uk",
      "picsum.photos",
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();


module.exports = withNextIntl(nextConfig);