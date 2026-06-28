"use client";

import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { XPProvider } from "../context/XPContext";
import AuthGuard from "../components/common/AuthGuard";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <XPProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </XPProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
