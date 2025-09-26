import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|mov|webm)$/,
      type: "asset/resource",
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.mp4": {
        loaders: ["file-loader"],
        as: "*.mp4",
      },
      "*.mov": {
        loaders: ["file-loader"],
        as: "*.mov",
      },
      "*.webm": {
        loaders: ["file-loader"],
        as: "*.webm",
      },
    },
  },
  images: {
    domains: [
      "localhost",
      "www.rioluxuryhomes.in",
      "rioluxuryhomes.in",
      "cdnjs.cloudflare.com",
      "unpkg.com",
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
