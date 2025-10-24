import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z.url({ error: "DATABASE_URL is required" }),
    },
    // For Next.js >= 13.4.4, we can use experimental__runtimeEnv
    experimental__runtimeEnv: process.env,
});
