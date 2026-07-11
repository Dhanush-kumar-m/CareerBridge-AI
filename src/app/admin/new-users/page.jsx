"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "../../../lib/supabase";
import { FiUsers, FiActivity, FiDownload, FiClock } from "react-icons/fi";

export default function NewUsersPage() {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("registrations"); // 'registrations' or 'activity'
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // 1. Load newly registered users (profiles)
        const { data: profiles, error: err1 } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (!err1 && profiles) {
          setUsers(profiles.filter(p => p.role !== "admin"));
        }

        // 2. Load user activity logs
        const { data: logs, error: err2 } = await supabase
          .from("user_activity")
          .select("*")
          .order("timestamp", { ascending: false });

        if (!err2 && logs) {
          setActivities(logs);
        }
      } catch (err) {
        console.error("Failed to load user logs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter computation
  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      (u.display_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const filteredActivities = useMemo(() => {
    return activities.filter(a => 
      (a.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.activity_type || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activities, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const today = new Date().toDateString();
    
    // Unique users who logged in today
    const loginsToday = new Set(
      activities
        .filter(a => a.activity_type === "login" && new Date(a.timestamp).toDateString() === today)
        .map(a => a.email)
    ).size;

    const totalLogins = activities.filter(a => a.activity_type === "login").length;
    const totalLogouts = activities.filter(a => a.activity_type === "logout").length;

    return { totalUsers, loginsToday, totalLogins, totalLogouts };
  }, [users, activities]);

  // PDF Export utility using window.print() styled frame
  const handleExportPDF = () => {
    const reportTitle = activeTab === "registrations" ? "New User Registrations Report" : "Daily User Activity Report";
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to export the report PDF.");
      return;
    }

    const todayDate = new Date().toLocaleString();

    let tableHTML = "";
    if (activeTab === "registrations") {
      tableHTML = `
        <table>
          <thead>
            <tr>
              <th>ID / UUID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Date Joined</th>
            </tr>
          </thead>
          <tbody>
            ${filteredUsers.map(u => `
              <tr>
                <td>${u.id}</td>
                <td>${u.display_name || "N/A"}</td>
                <td>${u.email || "N/A"}</td>
                <td>${new Date(u.created_at).toLocaleString()}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else {
      tableHTML = `
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email Address</th>
              <th>Activity Event</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            ${filteredActivities.map(a => `
              <tr>
                <td>#${a.id}</td>
                <td>${a.email}</td>
                <td><span class="badge ${a.activity_type}">${a.activity_type.toUpperCase()}</span></td>
                <td>${new Date(a.timestamp).toLocaleString()}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${reportTitle}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #1e293b;
              padding: 40px;
              margin: 0;
            }
            .header {
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 20px;
              margin-bottom: 30px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              color: #0f172a;
            }
            .header p {
              margin: 5px 0 0 0;
              font-size: 14px;
              color: #64748b;
            }
            .meta {
              font-size: 12px;
              color: #64748b;
              text-align: right;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 20px;
              margin-bottom: 30px;
            }
            .stat-card {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 15px;
              text-align: center;
            }
            .stat-card .label {
              font-size: 12px;
              color: #64748b;
              text-transform: uppercase;
              font-weight: bold;
            }
            .stat-card .value {
              font-size: 20px;
              font-weight: 800;
              color: #0f172a;
              margin-top: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
              font-size: 13px;
            }
            th, td {
              border: 1px solid #e2e8f0;
              padding: 12px 14px;
              text-align: left;
            }
            th {
              background-color: #f1f5f9;
              font-weight: bold;
              color: #334155;
            }
            tr:nth-child(even) {
              background-color: #f8fafc;
            }
            .badge {
              padding: 3px 8px;
              font-size: 11px;
              font-weight: bold;
              border-radius: 4px;
            }
            .badge.login {
              background-color: #dcfce7;
              color: #15803d;
            }
            .badge.logout {
              background-color: #fee2e2;
              color: #b91c1c;
            }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>CareerBridge AI Portal Audit Report</h1>
              <p>${reportTitle}</p>
            </div>
            <div class="meta">
              Report Generated: <strong>${todayDate}</strong><br>
              Auditor Scope: Global Portal Activity
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="label">Total Users Registered</div>
              <div class="value">${stats.totalUsers}</div>
            </div>
            <div class="stat-card">
              <div class="label">Active Sessions (Today)</div>
              <div class="value">${stats.loginsToday}</div>
            </div>
            <div class="stat-card">
              <div class="label">Total Logins Pushed</div>
              <div class="value">${stats.totalLogins}</div>
            </div>
            <div class="stat-card">
              <div class="label">Total Logouts Logged</div>
              <div class="value">${stats.totalLogouts}</div>
            </div>
          </div>

          ${tableHTML}

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
            <FiActivity style={{ color: "var(--primary)" }} />
            <span>User Activity & Registrations Console</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Inspect newly registered students, monitor login/logout audit timelines, and download PDF activity records.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleExportPDF} className="start-practice-badge-btn" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FiDownload />
            <span>Export Report PDF</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Total Registered Students</span>
          <span className="stat-value">{stats.totalUsers} Users</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Logins Today (Unique)</span>
          <span className="stat-value">{stats.loginsToday} Active</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Total Login Audits</span>
          <span className="stat-value">{stats.totalLogins} Logins</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Total Logout Audits</span>
          <span className="stat-value">{stats.totalLogouts} Logouts</span>
        </div>
      </div>

      {/* Filters & Tabs Controller */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        background: "rgba(255,255,255,0.01)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 20px",
        borderRadius: "12px"
      }}>
        {/* Tabs switcher */}
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={() => setActiveTab("registrations")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              fontSize: "0.88rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s",
              background: activeTab === "registrations" ? "rgba(99, 102, 241, 0.15)" : "transparent",
              color: activeTab === "registrations" ? "var(--primary)" : "var(--text-secondary)",
            }}
          >
            New Registrations
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              fontSize: "0.88rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s",
              background: activeTab === "activity" ? "rgba(99, 102, 241, 0.15)" : "transparent",
              color: activeTab === "activity" ? "var(--primary)" : "var(--text-secondary)",
            }}
          >
            Daily Login/Logout Activity
          </button>
        </div>

        {/* Search query input */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "8px 16px",
          borderRadius: "8px",
          width: "300px"
        }}>
          <FiUsers size={16} style={{ color: "var(--text-secondary)" }} />
          <input
            type="text"
            placeholder="Search logs by email or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "0.88rem",
              outline: "none",
              width: "100%"
            }}
          />
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px" }}>
          <div className="spin-loader" style={{ width: "35px", height: "35px", border: "3px solid rgba(255,255,255,0.05)", borderTop: "3px solid var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </div>
      ) : (
        <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
          {activeTab === "registrations" ? (
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: "0 0 15px 0" }}>New User Registration Audits</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                      <th style={{ padding: "12px" }}>UUID / Student ID</th>
                      <th style={{ padding: "12px" }}>Full Name</th>
                      <th style={{ padding: "12px" }}>Registered Email</th>
                      <th style={{ padding: "12px" }}>Date Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px", color: "var(--text-secondary)", fontFamily: "monospace", fontSize: "0.8rem" }}>{u.id}</td>
                        <td style={{ padding: "12px", fontWeight: "700", color: "#ffffff" }}>{u.display_name || "N/A"}</td>
                        <td style={{ padding: "12px" }}>{u.email || "No Email"}</td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{new Date(u.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "var(--text-secondary)" }}>No new registration records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: "0 0 15px 0" }}>Daily Login/Logout Timelines</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                      <th style={{ padding: "12px" }}>Log ID</th>
                      <th style={{ padding: "12px" }}>User Email</th>
                      <th style={{ padding: "12px" }}>Activity Event</th>
                      <th style={{ padding: "12px" }}>Time Recorded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.map((a) => (
                      <tr key={a.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>#{a.id}</td>
                        <td style={{ padding: "12px", fontWeight: "700", color: "#ffffff" }}>{a.email}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            background: a.activity_type === "login" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                            color: a.activity_type === "login" ? "#10b981" : "#ef4444",
                          }}>
                            {a.activity_type.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{new Date(a.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                    {filteredActivities.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "var(--text-secondary)" }}>No daily activity logs recorded.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
