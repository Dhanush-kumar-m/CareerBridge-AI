"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext();

export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Force dark theme on load
    setTheme("dark");
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("careerbridge_theme", "dark");
  }, []);

  useEffect(() => {
    // Keep theme attribute locked to dark
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("careerbridge_theme", "dark");
  }, [theme]);

  const toggleTheme = () => {
    // No-op to remove support for light theme
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () =>
  useContext(ThemeContext);