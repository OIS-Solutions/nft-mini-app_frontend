/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL || "https://toucan-delicate-broadly.ngrok-free.app"

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    async rewrites() {
      return [
        {
          source: "/api/upload",
          destination: "https://www.imghippo.com/v1/upload",
        },
        {
          source: "/api/uri",
          destination: "https://api.jsonbin.io/v3/b",
        },
        {
          source: "/api/:path*",
          destination: `${API_URL}/:path*`,
          basePath: false,
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          hostname: 'api.telegram.org'
        },
        {
          hostname: 'i.imghippo.com'
        }
      ],
    },
  };

export default nextConfig;
