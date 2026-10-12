import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ysxcbvuaycvornlxgxrp.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeGNidnVheWN2b3JubHhneHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MTQyODcsImV4cCI6MjEwNzM5MDI4N30.QDiFeBi4PnjqPsc-nVHHELa9Jfr0-dobkzPoxPxAsNY";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes("your-project-id")
);

// Client Supabase yang aman jika variabel environment belum diisi
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Helper untuk login dengan Google OAuth via Supabase
 */
export async function signInWithGoogle() {
  if (!supabase) {
    throw new Error(
      "Supabase belum dikonfigurasi. Silakan isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local"
    );
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Helper untuk logout
 */
export async function signOut() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
