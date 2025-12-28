import { createEnv } from "@t3-oss/env-core";
import { vite } from "@t3-oss/env-core/presets-zod";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {},
  extends: [vite()],
  runtimeEnv: (import.meta as any).env,
  emptyStringAsUndefined: true,
});
