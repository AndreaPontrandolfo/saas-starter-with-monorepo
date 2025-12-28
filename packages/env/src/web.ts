import { createEnv } from "@t3-oss/env-core";
// import { vite } from "@t3-oss/env-core/presets-zod";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_SUPABASE_URL: z.url(),
    VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().min(1),
  },
  // extends: [vite()],
  runtimeEnv: (import.meta as any).env,
  emptyStringAsUndefined: true,
});
