"use client";

import { useRouter } from "next/navigation";
import { useAuth as useAuthContext } from "../context/AuthContext";

export default function useAuth() {
  const auth = useAuthContext();
  const router = useRouter();

  const loginUser = async (email, password) => {
    if (typeof email === "object") {
      return await auth?.login(email);
    }
    return await auth?.login(email, password);
  };

  const signupUser = async (email, password, name) => {
    return await auth?.signup(email, password, name);
  };

  const logoutUser = async (redirectPath = "/login") => {
    await auth?.logout(redirectPath);
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return {
    user: auth?.user || null,
    loading: auth?.loading || false,
    isAuthenticated: !!auth?.user,
    loginUser,
    signupUser,
    logoutUser,
    goToDashboard,
    goToLogin,
  };
}