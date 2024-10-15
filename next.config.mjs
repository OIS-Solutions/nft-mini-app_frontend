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
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
          rule.test?.test?.('.svg'),
      )

      config.module.rules.push(
          // Reapply the existing rule, but only for svg imports ending in ?url
          {
              ...fileLoaderRule,
              test: /\.svg$/i,
              resourceQuery: /url/, // *.svg?url
          },
          // Convert all other *.svg imports to React components
          {
              test: /\.svg$/i,
              issuer: fileLoaderRule.issuer,
              resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
              use: ['@svgr/webpack'],
          },
      )

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i

      return config
  },
  };

export default nextConfig;
