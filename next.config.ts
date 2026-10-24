import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Images are served straight from Cloudinary / Unsplash. Routing them
    // through Vercel's Image Optimization API bills one "image transformation"
    // per source/width/quality combination, which is what exhausted the Hobby
    // quota. The custom loader keeps <Image> responsive without Vercel's
    // optimizer in the path.
    loader: "custom",
    loaderFile: "./image-loader.js",
    // Fewer candidate widths = fewer CDN variants generated per image.
    deviceSizes: [640, 1080, 1920],
    imageSizes: [96, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
