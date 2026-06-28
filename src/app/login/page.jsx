"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "student@careerbridge.com" &&
      password === "123456"
    ) {
      loginUser({
        email,
        name: "Dhanush Kumar",
        role: "student",
      });

      router.push("/");
      return;
    }

    const registered = JSON.parse(localStorage.getItem("registered_users") || "[]");
    const user = registered.find((u) => u.email === email && u.password === password);

    if (user) {
      loginUser({
        email: user.email,
        name: user.name,
        role: "student",
      });

      router.push("/");
    } else {
      setError("Invalid Email or Password");
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