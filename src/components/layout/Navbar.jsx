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
      if (window.scrollY > 20) {
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

  // Dynamic Navigation Items
  const authenticatedItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Aptitude", path: "/aptitude" },
    { name: "Coding", path: "/coding" },
    { name: "Companies", path: "/companies" },
    { name: "Resume", path: "/resume/analyzer" },
    { name: "Interview", path: "/mock-interview" },
    { name: "Analytics", path: "/analytics" },
  ];

  const guestItems = [
    { name: "Practice", path: "/#practice-modules" },
    { name: "Companies", path: "/companies" },
    { name: "Resources", path: "/#journey" },
    { name: "About", path: "/#progress-analytics" },
  ];

  const activeItems = isAuthenticated ? authenticatedItems : guestItems;
  const isHome = pathname === "/";
  const headerPosition = isHome ? "fixed" : "sticky";
  
  // High polish dark navbar style configurations for home, light for elsewhere
  const headerBg = isHome 
    ? (scrolled ? "rgba(18, 24, 22, 0.94)" : "transparent")
    : (scrolled ? "rgba(248, 247, 243, 0.85)" : "transparent");
  const headerBorder = isHome
    ? (scrolled ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent")
    : (scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent");
  const headerBlur = scrolled ? "blur(16px)" : "none";

  return (
    <header 
      className="navbar" 
      style={{ 
        position: headerPosition,
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        background: headerBg,
        backdropFilter: headerBlur,
        borderBottom: headerBorder,
        padding: scrolled ? "14px 40px" : "20px 40px"
      }}
    >
      <div className="navbar-left">
        <Link href="/" className="logo" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <FiBriefcase className="logo-icon" style={{ color: isHome ? "var(--home-accent, #3157D5)" : "var(--accent)", fontSize: "1.2rem" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: "800", color: isHome ? "#ffffff" : "var(--text-primary)", letterSpacing: "-0.01em" }}>
            CareerBridge AI
          </span>
        </Link>
      </div>

      <nav className="nav-links" style={{ display: "flex", gap: "28px" }}>
        {activeItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={pathname === item.path ? "nav-link active" : "nav-link"}
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              color: pathname === item.path 
                ? (isHome ? "#ffffff" : "var(--accent)") 
                : (isHome ? "#B8C0BB" : "var(--text-secondary)"),
              transition: "color 0.2s ease"
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        
        {/* Notification Bell Section */}
        {isAuthenticated && (
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              onClick={handleBellClick}
              style={{
                background: "none",
                border: "none",
                color: isHome ? "#B8C0BB" : "var(--text-secondary)",
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
              <FiBell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  background: "var(--danger)",
                  borderRadius: "50%",
                  width: "7px",
                  height: "7px",
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
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(23, 32, 51, 0.08)",
                zIndex: 1000,
                overflow: "hidden"
              }}>
                <div style={{ padding: "12px 15px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "700", fontSize: "0.88rem", color: "var(--text-primary)" }}>Announcements</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                    style={{ 
                      background: "none", 
                      border: "none", 
                      color: "var(--accent)", 
                      fontSize: "0.75rem", 
                      fontWeight: "700", 
                      cursor: "pointer",
                      padding: "2px 6px",
                      borderRadius: "4px"
                    }}
                  >
                    Mark all as read
                  </button>
                </div>
                <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: "30px 15px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      No announcements
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        style={{ 
                          padding: "12px 15px", 
                          borderBottom: "1px solid var(--border-subtle)", 
                          background: notif.read ? "transparent" : "var(--bg-primary)",
                          transition: "background 0.2s"
                        }}
                      >
                        <p style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: notif.read ? "500" : "600", margin: "0 0 4px" }}>
                          {notif.title}
                        </p>
                        <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", margin: "0 0 6px", lineHeight: "1.4" }}>
                          {notif.message}
                        </p>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-faint)" }}>
                          {new Date(notif.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* User profile / Auth buttons */}
        {isAuthenticated ? (
          <div style={{ position: "relative" }} ref={profileDropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "none",
                color: isHome ? "#ffffff" : "var(--text-primary)",
                fontWeight: "600",
                fontSize: "0.88rem",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "8px",
                transition: "background 0.2s"
              }}
              className="user-profile-btn"
            >
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: isHome ? "var(--home-accent, #3157D5)" : "var(--accent)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "0.8rem"
              }}>
                {user?.email ? user.email.substring(0, 2).toUpperCase() : "U"}
              </div>
              <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email?.split('@')[0]}
              </span>
            </button>

            {showProfileDropdown && (
              <div style={{
                position: "absolute",
                top: "45px",
                right: "0",
                width: "180px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "10px",
                boxShadow: "0 10px 25px rgba(23, 32, 51, 0.08)",
                padding: "6px",
                zIndex: 1000
              }}>
                {user?.role === "admin" && (
                  <Link
                    href="/admin/students"
                    onClick={() => setShowProfileDropdown(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "var(--text-primary)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      textDecoration: "none"
                    }}
                  >
                    <span>🛡️ Admin</span>
                  </Link>
                )}
                
                <Link
                  href="/profile"
                  onClick={() => setShowProfileDropdown(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "var(--text-primary)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    textDecoration: "none"
                  }}
                >
                  <FiUser size={14} />
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
                    color: "var(--danger)",
                    cursor: "pointer",
                    padding: "10px 14px",
                    width: "100%",
                    textAlign: "left",
                    fontWeight: "600",
                    fontSize: "0.85rem"
                  }}
                >
                  <FiLogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          pathname !== "/login" && pathname !== "/register" && (
            <>
              <Link 
                href="/login" 
                style={{ 
                  fontSize: "0.88rem", 
                  fontWeight: "600", 
                  color: isHome ? "#B8C0BB" : "var(--text-secondary)", 
                  textDecoration: "none",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = isHome ? "#ffffff" : "var(--text-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = isHome ? "#B8C0BB" : "var(--text-secondary)"}
              >
                Login
              </Link>

              <Link 
                href="/register" 
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: isHome ? "var(--home-accent, #3157D5)" : "var(--accent)",
                  color: "#ffffff",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                  textDecoration: "none",
                  boxShadow: isHome ? "0 2px 8px rgba(49, 87, 213, 0.15)" : "0 2px 8px rgba(49, 87, 213, 0.15)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isHome ? "var(--home-accent-hover, #2448B7)" : "#2448b7";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isHome ? "var(--home-accent, #3157D5)" : "var(--accent)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Get Started
              </Link>
            </>
          )
        )}
      </div>
      
      <style jsx>{`
        .nav-link:hover {
          color: ${isHome ? '#ffffff' : 'var(--accent)'} !important;
        }
      `}</style>
    </header>
  );
}