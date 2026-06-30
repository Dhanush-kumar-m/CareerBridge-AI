"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const { loginUser, loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || "Google Sign-in failed.");
    }
  };

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
      router.push("/");
    } catch (err) {
      setError(err.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">

      <form
        className="auth-card"
        onSubmit={handleLogin}
      >

        <h1>
          CareerBridge AI Login
        </h1>

        <p>
          Login to continue your placement preparation.
        </p>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button type="submit">
          Login
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "15px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border-color)", opacity: 0.5 }}></div>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-color)", opacity: 0.5 }}></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <div className="demo-login" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px", padding: "15px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", textAlign: "left" }}>
          <h4 style={{ margin: "0 0 5px", fontSize: "0.9rem", fontWeight: "700" }}>Demo Credentials</h4>
          <div>
            <span style={{ fontSize: "0.82rem", color: "var(--primary)", fontWeight: "bold", display: "block" }}>Student Account</span>
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>Email: student@careerbridge.com</span>
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>Password: 123456</span>
          </div>
        </div>

        <div style={{ marginTop: "20px", borderTop: "1px solid var(--border-color)", paddingTop: "15px", textAlign: "center", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>New user? </span>
            <Link href="/register" style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: "700", textDecoration: "none" }}>
              Create Account →
            </Link>
          </div>
          
          <Link href="/admin/login" style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: "700", textDecoration: "none" }}>
            🎓 Access Administrator Portal →
          </Link>
        </div>

      </form>

    </div>
  );
}