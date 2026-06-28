"use client";

import { useTheme as useThemeContext } from "../context/ThemeContext";

export default function useTheme() {
  const {
    theme,
    toggleTheme,
  } = useThemeContext();

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}