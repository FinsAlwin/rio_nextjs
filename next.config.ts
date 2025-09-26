import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Critical for Amplify deployment
  output: "standalone",

  // Disable ESLint and TypeScript errors during build for Amplify
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize images for Amplify
  images: {
    unoptimized: true,
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

  // Transpile packages that cause issues in Amplify deployment
  transpilePackages: [
    "framer-motion",
    "react-slick",
    "slick-carousel",
    "react-responsive-modal",
    "react-player",
    "react-toastify",
    "react-scroll",
    "react-intersection-observer",
    "react-loader-spinner",
    "react-icons",
    "react-helmet",
    "locomotive-scroll",
    "libphonenumber-js",
    "qs",
    "prop-types",
    "scroll-snap",
    "animate.css",
    "materialize-css",
  ],

  // Webpack configuration for Amplify compatibility
  webpack: (config, { isServer }) => {
    // Handle video files
    config.module.rules.push({
      test: /\.(mp4|mov|webm)$/,
      type: "asset/resource",
    });

    // Handle ES modules properly
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    // Client-side fallbacks for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  // Disable powered by header
  poweredByHeader: false,

  // Turbopack configuration (for development)
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
};

export default nextConfig;
