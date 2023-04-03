/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/organizer-requests",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
