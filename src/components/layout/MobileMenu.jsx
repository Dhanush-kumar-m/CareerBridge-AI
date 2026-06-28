"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiHome,
  FiBookOpen,
  FiCode,
  FiBriefcase,
  FiFileText,
  FiMic,
  FiTrendingUp,
  FiAward,
  FiUser,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut
} from "react-icons/fi";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: FiHome },
    { name: "Aptitude", path: "/aptitude", icon: FiBookOpen },
    { name: "Coding", path: "/coding", icon: FiCode },
    { name: "Companies", path: "/companies", icon: FiBriefcase },
    { name: "Resume", path: "/resume/analyzer", icon: FiFileText },
    { name: "Interview", path: "/mock-interview", icon: FiMic },
    { name: "Analytics", path: "/analytics", icon: FiTrendingUp },
    { name: "Leaderboard", path: "/leaderboard", icon: FiAward },
    { name: "Profile", path: "/profile", icon: FiUser },
    { name: "Settings", path: "/settings", icon: FiSettings },
  ];

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(true)}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <FiMenu size={20} />
      </button>

      {isOpen && (
        <>
          <div
            className="mobile-overlay"
            onClick={() => setIsOpen(false)}
          />

          <aside className="mobile-sidebar">
            <div className="mobile-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "1.2rem", color: "var(--primary)" }}>
                  <FiBriefcase />
                  <span>CareerBridge AI</span>
                </h2>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>
                  Placement Preparation Portal
                </p>
              </div>

              <button
                className="close-mobile"
                onClick={() => setIsOpen(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mobile-profile" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="mobile-avatar" style={{ background: "var(--primary-gradient)", color: "white" }}>
                D
              </div>

              <div>
                <h4 style={{ margin: 0, fontSize: "0.95rem" }}>
                  Dhanush Kumar
                </h4>
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  Placement Ready
                </span>
              </div>
            </div>

            <nav className="mobile-nav">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="mobile-link"
                    onClick={() => setIsOpen(false)}
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <IconComponent size={18} className="mobile-icon" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-footer">
              <button
                className="mobile-logout"
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
        </>
      )}
    </>
  );
}