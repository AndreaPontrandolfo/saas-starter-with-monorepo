import { createClient } from "@supabase/supabase-js";
import { env } from "@saas-starter-with-monorepo/env/web";
import type { Database } from "@/database.types";

export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
);
