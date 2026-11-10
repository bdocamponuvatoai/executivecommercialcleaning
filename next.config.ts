import type { NextConfig } from "next";
import imageSizes from "./src/config/image-sizes.json";

const nextConfig: NextConfig = {
  // Static HTML export: every route is prerendered into `out/`.
  output: "export",
  // Keeps `/about/` -> `about/index.html`, which any static host can serve.
  trailingSlash: true,
  // The default optimizer needs a server. The custom loader maps each srcset
  // width to a pre-resized copy made by `npm run images` (same size list).
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: imageSizes.deviceSizes,
    imageSizes: imageSizes.imageSizes,
  },
};

export default nextConfig;
