"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBookOpen,
  FiCode,
  FiClipboard,
  FiBriefcase,
  FiFileText,
  FiLayers,
  FiMic,
  FiTrendingUp,
  FiAward,
  FiStar,
  FiTarget,
  FiUser,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "Aptitude",
      path: "/aptitude",
      icon: FiBookOpen,
    },
    {
      name: "Coding",
      path: "/coding",
      icon: FiCode,
    },
    {
      name: "Submissions",
      path: "/coding/submissions",
      icon: FiClipboard,
    },
    {
      name: "Companies",
      path: "/companies",
      icon: FiBriefcase,
    },
    {
      name: "Resume Analyzer",
      path: "/resume/analyzer",
      icon: FiFileText,
    },
    {
      name: "Resume Templates",
      path: "/resume/templates",
      icon: FiLayers,
    },
    {
      name: "Mock Interview",
      path: "/mock-interview",
      icon: FiMic,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: FiTrendingUp,
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: FiAward,
    },
    {
      name: "Achievements",
      path: "/achievements",
      icon: FiStar,
    },
    {
      name: "Challenges",
      path: "/challenges",
      icon: FiTarget,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FiUser,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: FiSettings,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.2rem", fontWeight: "700", marginBottom: "25px", color: "var(--primary)" }}>
        <FiBriefcase size={20} />
        <span>CareerBridge AI</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={
                pathname === item.path
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <IconComponent size={18} className="sidebar-icon" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer" style={{ marginTop: "20px" }}>
        <button
          className="sidebar-logout"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
          }}
          style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 15px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "10px", color: "#ef4444", cursor: "pointer", transition: "all 0.3s" }}
        >
          <FiLogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}