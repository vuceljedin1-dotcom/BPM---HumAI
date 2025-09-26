// lib/auth.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnon = process.env.SUPABASE_ANON_KEY!;

/**
 * Server-only Supabase klijent BEZ @supabase/ssr.
 * Ne koristi cookies storage; dovoljno za .auth.getUser() na serveru.
 */
export function getSupabaseServer() {
  if (!supabaseUrl || !supabaseAnon) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars.");
  }
  return createClient(supabaseUrl, supabaseAnon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
