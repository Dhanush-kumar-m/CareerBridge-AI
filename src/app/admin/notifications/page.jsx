
"use client";

import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newGroup, setNewGroup] = useState("All Students");

  // Load notifications from localStorage or fallback to defaults
  useEffect(() => {
    const stored = localStorage.getItem("system_notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      const defaultNotifs = [
        {
          id: 1,
          title: "TCS Placement Drive",
          content: "TCS is conducting a placement drive for engineering graduates. Register by 30th June.",
          date: "22 June 2026",
          status: "Sent",
          target: "All Students"
        },
        {
          id: 2,
          title: "Resume Submission Reminder",
          content: "Please upload your updated resume to the ATS analyzer to clear internal placement audits.",
          date: "20 June 2026",
          status: "Sent",
          target: "All Students"
        },
        {
          id: 3,
          title: "Mock Interview Schedule",
          content: "HR mock interview slots are now open. Choose your timing in the mock interview tab.",
          date: "18 June 2026",
          status: "Sent",
          target: "All Students"
        },
      ];
      localStorage.setItem("system_notifications", JSON.stringify(defaultNotifs));
      setNotifications(defaultNotifs);
    }
  }, []);

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const formattedDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const newNotification = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      date: formattedDate,
      status: "Sent",
      target: newGroup,
    };

    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    localStorage.setItem("system_notifications", JSON.stringify(updated));
    
    // Also trigger custom event so other open tabs or listeners know (in React SPA)
    window.dispatchEvent(new Event("notifications_updated"));

    // Reset form
    setNewTitle("");
    setNewContent("");
    setShowModal(false);
  };

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>🔔 Notifications Center</h1>
        <p>
          Manage announcements, placement updates and student notifications.
        </p>
      </div>

      <div className="notification-stats">
        <div className="notification-stat-card">
          <h2>{notifications.length}</h2>
          <p>Total Notifications</p>
        </div>
        <div className="notification-stat-card">
          <h2>{notifications.filter(n => n.date.includes("2026")).length}</h2>
          <p>Sent Recently</p>
        </div>
        <div className="notification-stat-card">
          <h2>5200</h2>
          <p>Students Reached</p>
        </div>
      </div>

      <div className="notification-actions" style={{ marginBottom: "30px" }}>
        <button className="admin-btn" onClick={() => setShowModal(true)}>
          ➕ Send Notification
        </button>
      </div>

      <div className="notifications-list">
        <h2>Recent Notifications</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          {notifications.map((notification) => (
            <div key={notification.id || notification.title} className="notification-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
              <div style={{ flex: 1, marginRight: "20px" }}>
                <h3 style={{ margin: "0 0 5px", fontSize: "1.1rem" }}>{notification.title}</h3>
                <p style={{ margin: "0 0 10px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{notification.content}</p>
                <div style={{ display: "flex", gap: "15px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <span>📅 {notification.date}</span>
                  <span>👥 Target: {notification.target || "All Students"}</span>
                </div>
              </div>
              <span className="notification-status" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", padding: "4px 10px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "bold" }}>
                {notification.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for creating a new notification - High Visibility Design */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(8, 12, 24, 0.85)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <form onSubmit={handleSendNotification} style={{
            background: "linear-gradient(145deg, #1e293b, #0f172a)",
            color: "#f8fafc",
            padding: "25px",
            borderRadius: "14px",
            border: "1.5px solid #3b82f6",
            width: "90%",
            maxWidth: "480px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 12px rgba(59, 130, 246, 0.2)"
          }}>
            <h2 style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "10px", fontSize: "1.25rem", color: "#ffffff" }}>
              <span>🔔 Send New Notification</span>
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
              >
                &times;
              </button>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: "600", color: "#cbd5e1" }}>Notification Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. TCS Placement Drive" 
                  required
                  style={{
                    padding: "10px",
                    background: "rgba(0, 0, 0, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.9rem"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: "600", color: "#cbd5e1" }}>Notification Content</label>
                <textarea 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Provide details about the placement announcement..." 
                  required
                  rows={4}
                  style={{
                    padding: "10px",
                    background: "rgba(0, 0, 0, 0.2)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    resize: "none"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: "600", color: "#cbd5e1" }}>Target Group</label>
                <select 
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                  style={{
                    padding: "10px",
                    background: "#0f172a",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    cursor: "pointer"
                  }}
                >
                  <option>All Students</option>
                  <option>Final Year Students</option>
                  <option>Third Year Students</option>
                  <option>Aptitude Only Students</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button 
                type="button" 
                onClick={() => setShowModal(false)}
                style={{ 
                  padding: "10px 18px", 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.15)", 
                  borderRadius: "8px", 
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "0.88rem",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                style={{ 
                  padding: "10px 18px", 
                  background: "#3b82f6", 
                  border: "none", 
                  borderRadius: "8px", 
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "0.88rem",
                  cursor: "pointer"
                }}
              >
                Send Notification
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


