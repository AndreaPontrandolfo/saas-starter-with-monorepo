import { createClient } from "@supabase/supabase-js";
import { env } from "@saas-starter-with-monorepo/env/web";

export const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);
