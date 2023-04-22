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
  output: "standalone",
};

module.exports = nextConfig;
