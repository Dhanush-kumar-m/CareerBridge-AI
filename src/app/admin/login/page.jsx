"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "../../../hooks/useAuth";
import { FiAward, FiAlertCircle } from "react-icons/fi";

export default function AdminLoginPage() {
  const { loginUser, logoutUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(email, password);
      if (user && user.role === "admin") {
        window.location.href = "/admin";
      } else {
        await logoutUser("/admin/login");
        setError("Unauthorized: Access restricted to administrators only.");
      }
    } catch (err) {
      setError(err.message || "Invalid Admin Credentials or Sign-in failed.");
    }
  };

  return (
    <div className="auth-container" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "var(--bg-body)",
      padding: "20px"
    }}>
      <form
        className="auth-card"
        onSubmit={handleLogin}
        style={{
          width: "420px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          padding: "40px 30px",
          borderRadius: "20px",
          boxShadow: "var(--shadow-glow)",
          textAlign: "center"
        }}
      >
        <div style={{
          width: "50px",
          height: "50px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, var(--primary), #ec4899)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          margin: "0 auto 20px"
        }}>
          <FiAward size={26} />
        </div>

        <h1 style={{ fontSize: "1.45rem", fontWeight: "800", margin: "0 0 5px" }}>Admin Portal Login</h1>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "25px" }}>
          Authorized personnel only. Please sign in to access portal management.
        </p>

        {error && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            color: "#ef4444",
            padding: "12px",
            borderRadius: "10px",
            fontSize: "0.85rem",
            marginBottom: "20px",
            textAlign: "left"
          }}>
            <FiAlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600", display: "block", marginBottom: "6px" }}>Admin Email</label>
            <input
              type="email"
              placeholder="admin@careerbridge.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ margin: 0 }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600", display: "block", marginBottom: "6px" }}>Security Password</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ margin: 0 }}
            />
          </div>
        </div>

        <button type="submit" className="primary-btn" style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(135deg, var(--primary), #ec4899)",
          color: "white",
          fontWeight: "700",
          cursor: "pointer",
          fontSize: "0.95rem"
        }}>
          Sign In as Administrator
        </button>

        <div className="demo-login" style={{
          marginTop: "25px",
          padding: "15px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid var(--border-color)",
          textAlign: "left"
        }}>
          <h4 style={{ margin: "0 0 5px", fontSize: "0.85rem", fontWeight: "700" }}>Demo Credentials</h4>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>Email: admin@careerbridge.com</span>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>Password: 123456</span>
        </div>

        <div style={{ marginTop: "20px", borderTop: "1px solid var(--border-color)", paddingTop: "15px", textAlign: "center" }}>
          <Link href="/login" style={{ fontSize: "0.85rem", color: "#ec4899", fontWeight: "700", textDecoration: "none" }}>
            👨‍🎓 Access Student Portal →
          </Link>
        </div>
      </form>
    </div>
  );
}
