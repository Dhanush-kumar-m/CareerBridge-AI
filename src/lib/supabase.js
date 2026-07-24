import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url-for-build.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") ||
                      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("placeholder");

const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: null }, error: new Error("Offline Mock Mode") }),
    signUp: async () => ({ data: { user: null }, error: new Error("Offline Mock Mode") }),
    signOut: async () => ({ error: null }),
    signInWithOAuth: async () => ({ error: new Error("Offline Mock Mode") }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: async () => ({ data: [], error: null }),
      }),
      order: () => ({
        eq: async () => ({ data: [], error: null }),
      }),
    }),
    insert: async () => ({ data: null, error: null }),
    update: () => ({
      eq: async () => ({ data: null, error: null }),
    }),
  }),
};

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase credentials missing. Using placeholder values for compilation/build. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local file."
  );
}

export const supabase = isPlaceholder 
  ? mockSupabase 
  : createClient(supabaseUrl, supabaseAnonKey);
