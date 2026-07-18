"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import {
  FiGrid,
  FiUser,
  FiBriefcase,
  FiMic,
  FiFileText,
  FiBell,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiAward,
  FiActivity
} from "react-icons/fi";

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, loading, logoutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname() || "";

  const isAdminLogin = pathname.startsWith("/admin/login");

  useEffect(() => {
    // Intercept and auto-fix any malformed object URL pathnames permanently
    if (pathname && (pathname.includes("[object") || pathname.includes("%5Bobject"))) {
      router.replace("/admin/login");
      return;
    }

    if (!loading && !isAdminLogin) {
      if (!isAuthenticated || user?.role !== "admin") {
        router.push("/admin/login");
      }
    }
  }, [isAuthenticated, user, loading, router, isAdminLogin]);

  if (isAdminLogin) {
    return children;
  }

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "var(--bg-body)" }}>
        <div className="spin-loader" style={{ width: "40px", height: "40px", border: "4px solid var(--border-color)", borderTop: "4px solid var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: FiGrid },
    { name: "Students", path: "/admin/students", icon: FiUser },
    { name: "User Activities", path: "/admin/new-users", icon: FiActivity },
    { name: "Companies", path: "/admin/companies", icon: FiBriefcase },
    { name: "Mock Interviews", path: "/admin/interviews", icon: FiMic },
    { name: "Resume Review", path: "/admin/resumes", icon: FiFileText },
    { name: "Notifications", path: "/admin/notifications", icon: FiBell },
    { name: "Reports", path: "/admin/reports", icon: FiTrendingUp },
    { name: "Settings", path: "/admin/settings", icon: FiSettings }
  ];

  return (
    <div className="admin-container" style={{ display: "flex", minHeight: "100vh", background: "var(--bg-body)", color: "var(--text-primary)" }}>
      
      {/* Sidebar Nav */}
      <aside className="admin-sidebar" style={{
        width: "280px",
        background: "var(--bg-card)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "30px 20px",
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 100
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
          
          {/* Logo Header */}
          <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--primary), #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}>
              <FiAward size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: "800", margin: 0, color: "var(--text-primary)" }}>CareerBridge AI</h2>
              <span style={{ fontSize: "0.75rem", color: "#ec4899", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Admin Portal</span>
            </div>
          </Link>

          {/* Links Menu */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "0.92rem",
                    fontWeight: "600",
                    transition: "all 0.25s ease",
                    background: isActive ? "rgba(59, 130, 246, 0.08)" : "transparent",
                    color: isActive ? "var(--primary)" : "var(--text-secondary)",
                    border: isActive ? "1px solid rgba(59, 130, 246, 0.15)" : "1px solid transparent"
                  }}
                  className="sidebar-link"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <FiChevronRight size={14} />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with Profile and Logout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* User Profile Card */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-color)"
          }}>
            <div style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#ec4899",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "white"
            }}>
              AD
            </div>
            <div>
              <span style={{ fontSize: "0.85rem", fontWeight: "700", display: "block" }}>{user?.name || "Admin"}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{user?.email || "admin@site.com"}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => logoutUser("/admin/login")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
              fontWeight: "600",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.25s ease"
            }}
            className="sidebar-logout"
          >
            <FiLogOut />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        
        {/* Top Header Bar */}
        <header style={{
          height: "75px",
          borderBottom: "1px solid var(--border-color)",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-card)",
          position: "sticky",
          top: 0,
          zIndex: 90
        }}>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600" }}>MANAGEMENT PANEL</span>
            <h1 style={{ fontSize: "1.2rem", fontWeight: "700", margin: "2px 0 0", textTransform: "capitalize" }}>
              {pathname.replace(/\/$/, "") === "/admin" ? "Dashboard" : pathname.split("/").pop().replace(/-/g, " ")}
            </h1>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ fontSize: "0.78rem", padding: "6px 12px", borderRadius: "30px", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", fontWeight: "700" }}>
                Active Session
              </span>
            </div>
          </div>
        </header>

        {/* Scrollable Children Scope */}
        <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.02) !important;
          color: var(--text-primary) !important;
        }
        .sidebar-logout:hover {
          background: rgba(239, 68, 68, 0.15) !important;
        }
      `}</style>
    </div>
  );
}
