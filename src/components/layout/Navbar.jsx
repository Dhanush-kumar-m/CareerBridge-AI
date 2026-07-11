"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import useNotifications from "../../hooks/useNotifications";
import { FiUser, FiLogOut, FiBriefcase, FiBell } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname() || "";
  const { isAuthenticated, logoutUser, user } = useAuth();

  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBellClick = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      markAllAsRead();
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

  const isHome = pathname === "/";
  const headerPosition = isHome ? "fixed" : "sticky";
  const headerBg = isHome 
    ? (scrolled ? "rgba(6, 8, 20, 0.8)" : "transparent") 
    : "rgba(17, 24, 39, 0.95)";
  const headerBorder = isHome
    ? (scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent")
    : "1px solid #1f2937";
  const headerBlur = isHome && scrolled ? "blur(12px)" : "none";

  return (
    <header 
      className="navbar" 
      style={{ 
        position: headerPosition,
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s, padding 0.3s",
        background: headerBg,
        backdropFilter: headerBlur,
        borderBottom: headerBorder,
        padding: isHome && !scrolled ? "20px 40px" : "14px 40px"
      }}
    >
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
          <div style={{ position: "relative", marginLeft: "10px" }} ref={profileDropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "20px",
                fontWeight: "600",
                fontSize: "0.9rem",
                transition: "all 0.2s"
              }}
              className="profile-trigger-btn"
            >
              <FiUser size={16} />
              <span>{user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Profile"}</span>
            </button>

            {showProfileDropdown && (
              <div style={{
                position: "absolute",
                top: "45px",
                right: "0",
                width: "280px",
                background: "linear-gradient(145deg, #1e293b, #0f172a)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
                padding: "16px",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                textAlign: "left"
              }} className="profile-dropdown-card">
                <div>
                  <h4 style={{ margin: "0", fontSize: "1.05rem", fontWeight: "700", color: "#ffffff" }}>
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User"}
                  </h4>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#94a3b8", wordBreak: "break-all" }}>
                    {user?.email}
                  </p>
                </div>
                
                <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)" }} />
                
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setShowProfileDropdown(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "rgba(59, 130, 246, 0.15)",
                      color: "#60a5fa",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      fontWeight: "700",
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      transition: "all 0.2s"
                    }}
                    className="admin-dashboard-link"
                  >
                    <span>🛡️ Admin dashboard</span>
                  </Link>
                )}
                
                <Link
                  href="/profile"
                  onClick={() => setShowProfileDropdown(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#e2e8f0",
                    borderRadius: "8px",
                    padding: "8px 10px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    textDecoration: "none"
                  }}
                  className="profile-link"
                >
                  <FiUser size={16} />
                  <span>My Profile</span>
                </Link>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    logoutUser();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    cursor: "pointer",
                    padding: "8px 10px",
                    width: "100%",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "0.9rem"
                  }}
                  className="profile-logout-btn"
                >
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
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
