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
    domains: ["localhost"],
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
