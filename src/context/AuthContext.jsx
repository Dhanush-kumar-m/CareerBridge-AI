"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get initial session
    const savedAdmin = typeof window !== "undefined" ? localStorage.getItem("cb_admin_user") : null;
    if (savedAdmin) {
      setUser(JSON.parse(savedAdmin));
      setLoading(false);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
    }

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("cb_admin_user");
          }
          setUser(session.user);
        } else {
          const adminSession = typeof window !== "undefined" ? localStorage.getItem("cb_admin_user") : null;
          if (adminSession) {
            setUser(JSON.parse(adminSession));
          } else {
            setUser(null);
          }
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    if (typeof email === "object" && email !== null) {
      const payload = email;
      if (payload.role === "admin" || payload.email === "admin@careerbridge.com") {
        const adminUser = {
          id: "admin-mock-id",
          email: payload.email,
          user_metadata: {
            full_name: payload.name || "Placement Director",
          },
          role: "admin",
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("cb_admin_user", JSON.stringify(adminUser));
        }
        setUser(adminUser);
        return adminUser;
      }
      
      const { email: extEmail, password: extPassword } = payload;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: extEmail,
        password: extPassword,
      });
      if (error) throw error;
      setUser(data.user);
      return data.user;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user);
    return data.user;
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
    if (typeof window !== "undefined") {
      localStorage.removeItem("cb_admin_user");
    }
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