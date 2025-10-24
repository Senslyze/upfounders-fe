import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";
import type { NextConfig } from "next";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti.import("./src/env").catch((error) => {
  console.error("❌ Environment validation failed during build:");
  console.error(error.message);
  process.exit(1);
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
