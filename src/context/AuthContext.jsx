"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );
  };

  const logout = (redirectPath = "/login") => {
    setUser(null);

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );

    if (redirectPath) {
      window.location.href = redirectPath;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);