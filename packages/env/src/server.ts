import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

let envResult;
try {
  envResult = createEnv({
    server: {
      DATABASE_URL: z.string().min(1),
      CORS_ORIGIN: z.url(),
      NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
  });
} catch (error) {
  throw new Error(
    `Environment validation failed: ${
      error instanceof Error ? error.message : String(error)
    }`
  );
}

export const env = envResult;
