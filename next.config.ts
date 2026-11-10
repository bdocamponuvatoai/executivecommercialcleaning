import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: every route is prerendered into `out/`.
  output: "export",
  // Keeps `/about/` -> `about/index.html`, which any static host can serve.
  trailingSlash: true,
  // The default optimizer needs a server. A custom loader points srcset entries at
  // pre-resized files that scripts/resize-images.mjs writes after the build.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [96, 256],
  },
};

export default nextConfig;
