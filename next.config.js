/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['cdn.sanity.io', 'via.placeholder.com'],
  },
};

module.exports = nextConfig;
