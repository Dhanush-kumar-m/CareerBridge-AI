import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

/**
 * Validates the authenticated user and checks if they have the 'admin' role.
 * Redirects or throws an error if unauthorized.
 * 
 * @returns {Promise<{user: any, profile: any}>}
 */
export async function requireAdmin() {
  let token = null;

  try {
    const cookieStore = await cookies();
    // Parse the Supabase auth token from cookies
    for (const cookie of cookieStore.getAll()) {
      if (cookie.name.includes("-auth-token")) {
        try {
          const parsed = JSON.parse(cookie.value);
          token = parsed?.access_token || parsed?.[0];
        } catch (e) {
          token = cookie.value;
        }
        break;
      }
    }
  } catch (err) {
    console.warn("Cookies check failed (possibly not in server component context):", err.message);
  }

  if (!token) {
    redirect("/admin/login");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Configuration unavailable");
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  // Retrieve trusted role column from profiles table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || profile.role !== "admin") {
    // If authenticated but not admin, return 403 response or redirect to dashboard
    redirect("/");
  }

  return { user, profile };
}
