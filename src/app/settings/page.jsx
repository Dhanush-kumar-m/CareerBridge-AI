"use client";

import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import { useXP } from "../../context/XPContext";
import useProgress from "../../hooks/useProgress";
import {
  FiSettings,
  FiUser,
  FiSliders,
  FiBell,
  FiTarget,
  FiLock,
  FiTrendingUp,
  FiLogOut,
  FiAward
} from "react-icons/fi";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user, logoutUser } = useAuth();
  const { xp } = useXP();
  const { progress, placementReadiness } = useProgress();
  const darkMode = theme === "dark";

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [placementAlerts, setPlacementAlerts] = useState(true);

  return (
    <div className="settings-page" style={{ padding: "10px" }}>
      {/* Header */}
      <div className="settings-header" style={{ marginBottom: "35px" }}>
        <h1 style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "2rem" }}>
          <FiSettings style={{ color: "var(--primary)" }} />
          <span>Settings</span>
        </h1>
        <p style={{ marginTop: "8px", color: "var(--text-secondary)" }}>
          Manage your account preferences, configurations, and security.
        </p>
      </div>

      {/* Profile */}
      <div className="settings-card" style={{ padding: "25px", marginBottom: "25px" }}>
        <h2 style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "1.25rem", marginBottom: "20px" }}>
          <FiUser style={{ color: "#3b82f6" }} />
          <span>Profile Settings</span>
        </h2>

        <div className="settings-group">
          <label>Full Name</label>
          <input
            type="text"
            defaultValue={user?.name || "Dhanush Kumar"}
          />
        </div>

        <div className="settings-group">
          <label>Email Address</label>
          <input
            type="email"
            defaultValue={user?.email || "dhanush@example.com"}
          />
        </div>

        <div className="settings-group">
          <label>Phone Number</label>
          <input
            type="text"
            defaultValue="+91 9876543210"
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="settings-card" style={{ padding: "25px", marginBottom: "25px" }}>
        <h2 style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "1.25rem", marginBottom: "20px" }}>
          <FiSliders style={{ color: "#10b981" }} />
          <span>Appearance</span>
        </h2>

        <div className="toggle-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Dark Mode (High Contrast Dark Theme)</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
            disabled={true}
            title="Dark theme is enabled and locked by preference"
            style={{ width: "auto", cursor: "not-allowed" }}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-card" style={{ padding: "25px", marginBottom: "25px" }}>
        <h2 style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "1.25rem", marginBottom: "20px" }}>
          <FiBell style={{ color: "#ec4899" }} />
          <span>Notifications</span>
        </h2>

        <div className="toggle-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            style={{ width: "auto" }}
          />
        </div>

        <div className="toggle-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <span>Interview Reminders</span>
          <input
            type="checkbox"
            checked={interviewReminders}
            onChange={() => setInterviewReminders(!interviewReminders)}
            style={{ width: "auto" }}
          />
        </div>

        <div className="toggle-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Placement Alerts</span>
          <input
            type="checkbox"
            checked={placementAlerts}
            onChange={() => setPlacementAlerts(!placementAlerts)}
            style={{ width: "auto" }}
          />
        </div>
      </div>

      {/* Placement Preferences */}
      <div className="settings-card" style={{ padding: "25px", marginBottom: "25px" }}>
        <h2 style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "1.25rem", marginBottom: "20px" }}>
          <FiTarget style={{ color: "#f59e0b" }} />
          <span>Placement Preferences</span>
        </h2>

        <div className="settings-group">
          <label>Target Company</label>
          <select>
            <option>Amazon</option>
            <option>Zoho</option>
            <option>Infosys</option>
            <option>TCS</option>
            <option>Accenture</option>
          </select>
        </div>
      </div>

      {/* Security */}
      <div className="settings-card" style={{ padding: "25px", marginBottom: "25px" }}>
        <h2 style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "1.25rem", marginBottom: "20px" }}>
          <FiLock style={{ color: "#ef4444" }} />
          <span>Security</span>
        </h2>

        <div className="settings-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
          />
        </div>

        <div className="settings-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
          />
        </div>
      </div>

      {/* Account Stats */}
      <div className="settings-card" style={{ padding: "25px", marginBottom: "35px" }}>
        <h2 style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "1.25rem", marginBottom: "20px" }}>
          <FiTrendingUp style={{ color: "#06b6d4" }} />
          <span>Account Statistics</span>
        </h2>

        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
          <div className="stat-card" style={{ padding: "15px", textAlign: "center" }}>
            <h3 style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>Total XP</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "800", color: "#eab308", margin: "5px 0 0" }}>{xp}</p>
          </div>

          <div className="stat-card" style={{ padding: "15px", textAlign: "center" }}>
            <h3 style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>Rank</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "800", color: "#3b82f6", margin: "5px 0 0" }}>#{xp >= 4000 ? "1" : xp >= 2000 ? "12" : "45"}</p>
          </div>

          <div className="stat-card" style={{ padding: "15px", textAlign: "center" }}>
            <h3 style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>Resume ATS</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ec4899", margin: "5px 0 0" }}>{progress.resume}%</p>
          </div>

          <div className="stat-card" style={{ padding: "15px", textAlign: "center" }}>
            <h3 style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>Readiness Score</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "800", color: "#f59e0b", margin: "5px 0 0" }}>{placementReadiness}%</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="settings-actions" style={{ display: "flex", gap: "15px" }}>
        <button className="save-btn" style={{ padding: "12px 24px", borderRadius: "10px", border: "none", background: "var(--primary-gradient)", color: "white", fontWeight: "600", cursor: "pointer" }}>
          Save Changes
        </button>

        <button
          className="logout-btn"
          onClick={logoutUser}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.4)", background: "rgba(239, 68, 68, 0.05)", color: "#ef4444", fontWeight: "600", cursor: "pointer" }}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}