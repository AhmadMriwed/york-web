/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/plan_register', 
        destination: 'https://sleepy-tereshkova.212-227-199-24.plesk.page/api/plan_register',
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
      "picsum.photos"
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;
