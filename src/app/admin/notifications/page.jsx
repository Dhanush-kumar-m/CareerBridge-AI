"use client";

import { useState, useEffect } from "react";
import {
  FiBell,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiEye,
  FiDownload,
  FiCheckCircle,
  FiUsers,
  FiBookOpen,
  FiCode,
  FiCpu,
  FiSettings,
  FiActivity,
  FiClock,
  FiPlay,
  FiCheck,
  FiAlertTriangle,
  FiMail,
  FiMessageSquare,
  FiSend
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function AdminNotificationsPage() {
  const [activeTab, setActiveTab] = useState("history");
  const [notifications, setNotifications] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form States
  const [newNotif, setNewNotif] = useState({
    title: "",
    message: "",
    category: "Placement Drive",
    priority: "Medium",
    target: "All Students",
    method: "In-App Notification",
    schedule: "Immediately"
  });

  // Load from localStorage or defaults
  useEffect(() => {
    const stored = localStorage.getItem("system_notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      const defaultNotifs = [
        {
          id: 1,
          title: "TCS Placement Drive registration",
          message: "TCS is conducting a placement drive for engineering graduates. Register by 30th June.",
          date: "2026-06-22",
          status: "Sent",
          category: "Placement Drive",
          target: "All Students",
          method: "Email & In-App",
          recipients: 1200,
          readCount: 850
        },
        {
          id: 2,
          title: "Resume Submission Reminder",
          message: "Please upload your updated resume to the ATS analyzer to clear internal placement audits.",
          date: "2026-06-20",
          status: "Sent",
          category: "Resume Review",
          target: "All Students",
          method: "In-App",
          recipients: 1200,
          readCount: 940
        },
        {
          id: 3,
          title: "Mock Interview slots open",
          message: "HR mock interview slots are now open. Choose your timing in the mock interview tab.",
          date: "2026-06-18",
          status: "Sent",
          category: "Mock Interview",
          target: "All Students",
          method: "Email",
          recipients: 500,
          readCount: 420
        }
      ];
      localStorage.setItem("system_notifications", JSON.stringify(defaultNotifs));
      setNotifications(defaultNotifs);
    }
  }, []);

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!newNotif.title || !newNotif.message) return;

    const formattedDate = new Date().toISOString().split("T")[0];

    const added = {
      id: Date.now(),
      title: newNotif.title,
      message: newNotif.message,
      date: formattedDate,
      status: newNotif.schedule === "Immediately" ? "Sent" : "Scheduled",
      category: newNotif.category,
      target: newNotif.target,
      method: newNotif.method,
      recipients: newNotif.target === "All Students" ? 1200 : 350,
      readCount: 0
    };

    const updated = [added, ...notifications];
    setNotifications(updated);
    localStorage.setItem("system_notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("notifications_updated"));

    // Reset Form
    setNewNotif({
      title: "",
      message: "",
      category: "Placement Drive",
      priority: "Medium",
      target: "All Students",
      method: "In-App Notification",
      schedule: "Immediately"
    });
    setShowAddForm(false);
  };

  const handleDeleteNotif = (id) => {
    if (confirm("Are you sure you want to delete this notification record?")) {
      const updated = notifications.filter(n => n.id !== id);
      setNotifications(updated);
      localStorage.setItem("system_notifications", JSON.stringify(updated));
      window.dispatchEvent(new Event("notifications_updated"));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px", animation: "fadeIn 0.5s ease" }}>
      
      {/* Header Banner */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 30px",
        borderRadius: "16px"
      }}>
        <div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", margin: 0, color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
            <FiBell style={{ color: "var(--primary)" }} />
            <span>Notification & Broadcasts</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Push email alerts, In-App placement drive alerts, and automate interview reminders.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => { setActiveTab("history"); setShowAddForm(true); }} className="start-practice-badge-btn" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FiPlus />
            <span>Create New Announcement</span>
          </button>
        </div>
      </div>

      {/* Dashboard quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Total Pushed</span>
          <span className="stat-value">{notifications.length} Broadcasts</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Sent Today</span>
          <span className="stat-value">2 Broadcasts</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Active Audience</span>
          <span className="stat-value">1,420 Students</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Delivery Success</span>
          <span className="stat-value">100% Rate</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "5px" }}>
        <button onClick={() => setActiveTab("history")} className={`tab-link ${activeTab === "history" ? "active" : ""}`}>
          <FiClock />
          <span>Notification History</span>
        </button>
        <button onClick={() => setActiveTab("templates")} className={`tab-link ${activeTab === "templates" ? "active" : ""}`}>
          <FiBookOpen />
          <span>Broadcast Templates</span>
        </button>
        <button onClick={() => setActiveTab("automation")} className={`tab-link ${activeTab === "automation" ? "active" : ""}`}>
          <FiSettings />
          <span>Automation Rules</span>
        </button>
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Broadcast History */}
        {activeTab === "history" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Create Announcement Form */}
            {showAddForm && (
              <form onSubmit={handleSendNotification} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", padding: "24px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Create New Broadcast</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
                  <input 
                    type="text" 
                    placeholder="Notification Title" 
                    value={newNotif.title} 
                    onChange={e => setNewNotif({...newNotif, title: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <select 
                    value={newNotif.category} 
                    onChange={e => setNewNotif({...newNotif, category: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  >
                    <option value="Placement Drive">Placement Drive</option>
                    <option value="Resume Review">Resume Review</option>
                    <option value="Coding Contest">Coding Contest</option>
                    <option value="Mock Interview">Mock Interview</option>
                    <option value="System Update">System Update</option>
                  </select>
                  <select 
                    value={newNotif.target} 
                    onChange={e => setNewNotif({...newNotif, target: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  >
                    <option value="All Students">All Students</option>
                    <option value="CSE Department">CSE Department</option>
                    <option value="ECE Department">ECE Department</option>
                    <option value="Batch 2026">Batch 2026</option>
                  </select>
                  <select 
                    value={newNotif.method} 
                    onChange={e => setNewNotif({...newNotif, method: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  >
                    <option value="In-App Notification">In-App Notification</option>
                    <option value="Email Broadcast">Email Broadcast</option>
                    <option value="Push Notification">Push Notification</option>
                  </select>
                </div>
                <textarea 
                  placeholder="Notification Message Content" 
                  value={newNotif.message} 
                  onChange={e => setNewNotif({...newNotif, message: e.target.value})}
                  rows={4}
                  style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px", resize: "none" }}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="submit" className="solve-btn" style={{ padding: "8px 20px" }}>Send Immediately</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff", padding: "8px 20px" }}>Cancel</button>
                </div>
              </form>
            )}

            {/* History Table */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: "0 0 15px 0" }}>Broadcast History Logs</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Broadcast Title</th>
                      <th style={{ padding: "12px" }}>Category</th>
                      <th style={{ padding: "12px" }}>Target Audience</th>
                      <th style={{ padding: "12px" }}>Channel</th>
                      <th style={{ padding: "12px" }}>Date</th>
                      <th style={{ padding: "12px" }}>Delivery Status</th>
                      <th style={{ padding: "12px" }}>Recipients</th>
                      <th style={{ padding: "12px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((n) => (
                      <tr key={n.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{n.title}</strong></td>
                        <td style={{ padding: "12px" }}>{n.category}</td>
                        <td style={{ padding: "12px" }}>{n.target}</td>
                        <td style={{ padding: "12px" }}>{n.method}</td>
                        <td style={{ padding: "12px" }}>{n.date}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            background: n.status === "Sent" ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                            color: n.status === "Sent" ? "#10b981" : "#f59e0b",
                            fontWeight: "700"
                          }}>{n.status}</span>
                        </td>
                        <td style={{ padding: "12px", color: "#60a5fa" }}>{n.recipients} Students</td>
                        <td style={{ padding: "12px" }}>
                          <button onClick={() => handleDeleteNotif(n.id)} style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }}><FiTrash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* Tab 2: Broadcast Templates */}
        {activeTab === "templates" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
            {[
              { name: "New Placement Campaign Template", desc: "Push notification alert telling students that recruiter registration is open.", method: "In-App & Email" },
              { name: "Mock Test Scheduled Reminder", desc: "Fires 24 hours before a mock assessment to advise students to test compiler setups.", method: "Email & SMS" },
              { name: "ATS Resume Check Pending Review", desc: "Notification alert warning student that changes are requested to pass filters.", method: "In-App Only" },
              { name: "General Exam Announcement Template", desc: "Standard header and body formatting for academic schedules.", method: "All Channels" }
            ].map((t, i) => (
              <div key={i} style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
                <strong style={{ color: "#ffffff", fontSize: "0.95rem", display: "block", marginBottom: "8px" }}>{t.name}</strong>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "0 0 15px 0", lineHeight: "1.4" }}>{t.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78rem", color: "#6366f1" }}>Channel: {t.method}</span>
                  <button className="solve-btn" style={{ padding: "4px 10px", fontSize: "0.76rem" }}>Use Template</button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Tab 3: Automation Rules */}
        {activeTab === "automation" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Auto Rules Toggles */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Auto Broadcast Rules</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {[
                  { label: "Announce when new company registration opens", status: "Active" },
                  { label: "Alert when resume review status is updated", status: "Active" },
                  { label: "Push email reminders for scheduled mock interviews", status: "Active" },
                  { label: "Push login alerts for new student device connections", status: "Inactive" }
                ].map((rule, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.88rem", color: "#ffffff" }}>{rule.label}</span>
                    <span style={{
                      fontSize: "0.75rem",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: rule.status === "Active" ? "rgba(16, 185, 129, 0.12)" : "rgba(255,255,255,0.08)",
                      color: rule.status === "Active" ? "#10b981" : "var(--text-secondary)",
                      fontWeight: "700"
                    }}>{rule.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Email server configs */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>SMTP & Channel Configurations</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>SMTP Server Host</span>
                  <strong>smtp.careerbridge.ai</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>SMS Gateway Provider</span>
                  <strong>Twilio API Service</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Push Service Gateway</span>
                  <strong>Firebase Cloud Messaging</strong>
                </div>
              </div>
            </div>

          </section>
        )}

      </main>
    </div>
  );
}
