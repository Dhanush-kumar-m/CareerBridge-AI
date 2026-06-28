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
  const [theme, setTheme] =
    useState("dark");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "careerbridge_theme"
      );

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "careerbridge_theme",
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    );
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