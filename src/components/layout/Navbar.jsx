"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import useAuth from "../../hooks/useAuth";
import { FiUser, FiLogOut, FiBriefcase, FiBell } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname() || "";
  const { isAuthenticated, logoutUser } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const loadNotifications = () => {
    const stored = localStorage.getItem("system_notifications");
    let list = [];
    if (stored) {
      list = JSON.parse(stored);
    } else {
      list = [
        {
          id: 1,
          title: "TCS Placement Drive",
          content: "TCS is conducting a placement drive for engineering graduates. Register by 30th June.",
          date: "22 June 2026",
          status: "Sent"
        },
        {
          id: 2,
          title: "Resume Submission Reminder",
          content: "Please upload your updated resume to the ATS analyzer to clear internal placement audits.",
          date: "20 June 2026",
          status: "Sent"
        },
        {
          id: 3,
          title: "Mock Interview Schedule",
          content: "HR mock interview slots are now open. Choose your timing in the mock interview tab.",
          date: "18 June 2026",
          status: "Sent"
        }
      ];
      localStorage.setItem("system_notifications", JSON.stringify(list));
    }
    setNotifications(list);

    const readIds = JSON.parse(localStorage.getItem("read_notifications") || "[]");
    const unread = list.filter(n => !readIds.includes(n.id)).length;
    setUnreadCount(unread);
  };

  useEffect(() => {
    loadNotifications();

    const handleUpdate = () => {
      loadNotifications();
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("notifications_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("notifications_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      const ids = notifications.map(n => n.id);
      localStorage.setItem("read_notifications", JSON.stringify(ids));
      setUnreadCount(0);
    }
  };

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Aptitude", path: "/aptitude" },
    { name: "Coding", path: "/coding" },
    { name: "Companies", path: "/companies" },
    { name: "Resume", path: "/resume/analyzer" },
    { name: "Interview", path: "/mock-interview" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <header className="navbar" style={{ position: "relative" }}>
      <div className="navbar-left">
        <Link href="/" className="logo" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <FiBriefcase className="logo-icon" style={{ color: "var(--primary)", fontSize: "1.2rem" }} />
          <span>CareerBridge AI</span>
        </Link>
      </div>

      {isAuthenticated && (
        <nav className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={
                pathname === item.path
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}

      <div className="nav-actions" style={{ display: "flex", alignItems: "center" }}>
        
        {/* Notification Bell Section - Only visible if logged in */}
        {isAuthenticated && (
          <div style={{ position: "relative", marginRight: "15px" }} ref={dropdownRef}>
            <button
              onClick={handleBellClick}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                borderRadius: "50%",
                transition: "background 0.2s"
              }}
              className="bell-btn"
            >
              <FiBell size={20} />
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  width: "8px",
                  height: "8px",
                  display: "block"
                }} />
              )}
            </button>

            {showDropdown && (
              <div style={{
                position: "absolute",
                top: "45px",
                right: "0",
                width: "320px",
                background: "linear-gradient(145deg, #1e293b, #0f172a)",
                border: "1.5px solid #3b82f6",
                borderRadius: "12px",
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5), 0 0 10px rgba(59, 130, 246, 0.15)",
                zIndex: 1000,
                overflow: "hidden"
              }}>
                <div style={{ padding: "12px 15px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "700", fontSize: "0.92rem", color: "#ffffff" }}>Announcements</span>
                  <span style={{ fontSize: "0.75rem", color: "#60a5fa", fontWeight: "600" }}>Recent Updates</span>
                </div>
                <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: "20px", textAlign: "center", color: "#94a3b8", fontSize: "0.85rem" }}>
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((n, idx) => (
                      <div key={idx} style={{ padding: "12px 15px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", transition: "background 0.2s" }} className="notif-item">
                        <h4 style={{ margin: "0 0 4px", fontSize: "0.88rem", fontWeight: "600", color: "#ffffff" }}>{n.title}</h4>
                        <p style={{ margin: "0 0 6px", fontSize: "0.78rem", color: "#cbd5e1", lineHeight: "1.4" }}>{n.content}</p>
                        <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{n.date}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {isAuthenticated ? (
          <>
            <Link href="/profile" className="profile-btn" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FiUser size={16} />
              <span>Profile</span>
            </Link>

            <button
              onClick={logoutUser}
              className="logout-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          // If on Login/Register page, don't show Login/Get Started actions to keep it clean and focus on the page form.
          // Otherwise, on the main home page/guest pages, show the authentication options.
          pathname !== "/login" && pathname !== "/register" && (
            <>
              <Link href="/admin/login" style={{ display: "inline-flex", alignItems: "center", marginRight: "15px", fontSize: "0.9rem", fontWeight: "700", color: "var(--text-secondary)" }}>
                Admin
              </Link>

              <Link href="/login" className="login-btn">
                Login
              </Link>

              <Link href="/register" className="register-btn">
                Get Started
              </Link>
            </>
          )
        )}
      </div>

      {isAuthenticated && pathname !== "/" && (
        <div className="mobile-menu-wrapper">
          <MobileMenu />
        </div>
      )}
      
      <style jsx>{`
        .bell-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .notif-item:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </header>
  );
}
