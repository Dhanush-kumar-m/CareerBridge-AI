"use client";

import { useRouter } from "next/navigation";
import { useAuth as useAuthContext } from "../context/AuthContext";

export default function useAuth() {
  const auth = useAuthContext();
  const router = useRouter();

  const loginUser = (userData) => {
    auth?.login(userData);
  };

  const logoutUser = (redirectPath = "/login") => {
    auth?.logout(redirectPath);
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
    logoutUser,
    goToDashboard,
    goToLogin,
  };
}