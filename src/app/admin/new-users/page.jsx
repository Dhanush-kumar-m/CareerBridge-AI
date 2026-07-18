"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "../../../lib/supabase";
import { FiUsers, FiActivity, FiDownload, FiClock, FiCheckCircle, FiXCircle, FiLock, FiGlobe } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export default function NewUsersPage() {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("sessions"); // 'sessions', 'registrations', or 'activity'
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
          .order("timestamp", { ascending: true });

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

  // Compute per-user aggregated login/logout session status and total logged-in hours
  const userSessionsSummary = useMemo(() => {
    const userMap = {};

    // Group logs by email
    activities.forEach(a => {
      if (!a.email) return;
      const emailKey = a.email.toLowerCase();
      if (!userMap[emailKey]) {
        userMap[emailKey] = {
          email: a.email,
          displayName: "",
          logs: []
        };
      }
      userMap[emailKey].logs.push(a);
    });

    // Merge registered profiles
    users.forEach(u => {
      if (!u.email) return;
      const emailKey = u.email.toLowerCase();
      if (!userMap[emailKey]) {
        userMap[emailKey] = {
          email: u.email,
          displayName: u.display_name || "",
          logs: []
        };
      } else if (u.display_name) {
        userMap[emailKey].displayName = u.display_name;
      }
    });

    return Object.values(userMap).map(u => {
      // Sort logs chronologically
      const sortedLogs = [...u.logs].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      
      let isCurrentlyActive = false;
      let totalMs = 0;
      let currentLoginTime = null;
      let lastLoginTime = null;
      let lastLogoutTime = null;
      let loginCount = 0;

      sortedLogs.forEach(log => {
        const time = new Date(log.timestamp).getTime();
        if (log.activity_type === "login") {
          currentLoginTime = time;
          lastLoginTime = new Date(log.timestamp).toLocaleString();
          loginCount++;
        } else if (log.activity_type === "logout") {
          lastLogoutTime = new Date(log.timestamp).toLocaleString();
          if (currentLoginTime) {
            totalMs += Math.max(0, time - currentLoginTime);
            currentLoginTime = null;
          }
        }
      });

      if (sortedLogs.length > 0) {
        const latestLog = sortedLogs[sortedLogs.length - 1];
        isCurrentlyActive = latestLog.activity_type === "login";
      }

      // If active right now, add elapsed time from last login to now
      if (isCurrentlyActive && currentLoginTime) {
        totalMs += Math.max(0, Date.now() - currentLoginTime);
      }

      const totalMins = Math.floor(totalMs / (1000 * 60));
      const totalHoursNum = totalMs / (1000 * 60 * 60);
      let durationFormatted = "0 mins";

      if (totalMins < 60) {
        durationFormatted = `${totalMins} mins`;
      } else {
        durationFormatted = `${totalHoursNum.toFixed(1)} hrs (${totalMins} mins)`;
      }

      return {
        email: u.email,
        name: u.displayName || u.email.split("@")[0],
        status: isCurrentlyActive ? "Active" : "Inactive",
        totalMs,
        totalMins,
        totalHoursNum: parseFloat(totalHoursNum.toFixed(1)),
        durationFormatted,
        lastLogin: lastLoginTime || "Never",
        lastLogout: isCurrentlyActive ? "Currently Active" : (lastLogoutTime || "N/A"),
        loginCount
      };
    });
  }, [activities, users]);

  // Filter computations
  const filteredSessions = useMemo(() => {
    return userSessionsSummary.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [userSessionsSummary, searchQuery]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      (u.display_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const filteredActivities = useMemo(() => {
    return [...activities].reverse().filter(a => 
      (a.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.activity_type || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activities, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const totalUsers = userSessionsSummary.length;
    const activeUsers = userSessionsSummary.filter(s => s.status === "Active").length;
    const inactiveUsers = userSessionsSummary.filter(s => s.status === "Inactive").length;
    
    const totalMinsCombined = userSessionsSummary.reduce((acc, s) => acc + s.totalMins, 0);
    const totalHoursCombined = (totalMinsCombined / 60).toFixed(1);

    return { totalUsers, activeUsers, inactiveUsers, totalHoursCombined };
  }, [userSessionsSummary]);

  // Compute 7-day dynamic user growth and activity trends for chart visualization
  const chartData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toDateString());
    }

    return days.map(dayStr => {
      const label = new Date(dayStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
      const registrations = users.filter(u => new Date(u.created_at).toDateString() === dayStr).length;
      const logins = activities.filter(a => a.activity_type === "login" && new Date(a.timestamp).toDateString() === dayStr).length;
      const logouts = activities.filter(a => a.activity_type === "logout" && new Date(a.timestamp).toDateString() === dayStr).length;
      return { name: label, Registrations: registrations, Logins: logins, Logouts: logouts };
    });
  }, [users, activities]);

  // PDF Export utility using window.print() styled frame
  const handleExportPDF = () => {
    let reportTitle = "User Login/Logout Status & Active Duration Report";
    if (activeTab === "registrations") reportTitle = "New User Registrations Report";
    if (activeTab === "activity") reportTitle = "Daily User Activity Event Logs";

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to export the report PDF.");
      return;
    }

    const todayDate = new Date().toLocaleString();

    let tableHTML = "";
    if (activeTab === "sessions") {
      tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email Address</th>
              <th>Current Status</th>
              <th>Total Time Logged In</th>
              <th>Sessions Count</th>
              <th>Last Login</th>
              <th>Last Logout</th>
            </tr>
          </thead>
          <tbody>
            ${filteredSessions.map(s => `
              <tr>
                <td><strong>${s.name}</strong></td>
                <td>${s.email}</td>
                <td><span class="badge ${s.status === "Active" ? "active" : "inactive"}">${s.status.toUpperCase()}</span></td>
                <td><strong>${s.durationFormatted}</strong></td>
                <td>${s.loginCount} Logins</td>
                <td>${s.lastLogin}</td>
                <td>${s.lastLogout}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (activeTab === "registrations") {
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
            .badge.active {
              background-color: #dcfce7;
              color: #15803d;
            }
            .badge.inactive {
              background-color: #fee2e2;
              color: #b91c1c;
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
              Auditor Scope: Global User Session Activity
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="label">Total Registered Students</div>
              <div class="value">${stats.totalUsers}</div>
            </div>
            <div class="stat-card">
              <div class="label">Currently Active (Logged In)</div>
              <div class="value" style="color: #16a34a;">${stats.activeUsers} Active</div>
            </div>
            <div class="stat-card">
              <div class="label">Currently Inactive (Logged Out)</div>
              <div class="value" style="color: #dc2626;">${stats.inactiveUsers} Inactive</div>
            </div>
            <div class="stat-card">
              <div class="label">Total Combined Hours</div>
              <div class="value">${stats.totalHoursCombined} Hours</div>
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
            <span>User Activity & Login Session Console</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Real-time tracking of student login/logout status (Active/Inactive) and total logged in duration (Hours/Minutes).
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {/* Total Registered */}
        <div style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
        }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Student Accounts</span>
          <span style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff" }}>{stats.totalUsers} Students</span>
        </div>
        {/* Active Logged In Users */}
        <div style={{
          background: "rgba(16, 185, 129, 0.05)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
        }}>
          <span style={{ fontSize: "0.85rem", color: "#10b981", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}></span>
            Active Logged In Users
          </span>
          <span style={{ fontSize: "2rem", fontWeight: "800", color: "#10b981" }}>{stats.activeUsers} Active</span>
        </div>
        {/* Inactive Logged Out Users */}
        <div style={{
          background: "rgba(239, 68, 68, 0.05)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
        }}>
          <span style={{ fontSize: "0.85rem", color: "#ef4444", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }}></span>
            Inactive (Logged Out)
          </span>
          <span style={{ fontSize: "2rem", fontWeight: "800", color: "#ef4444" }}>{stats.inactiveUsers} Inactive</span>
        </div>
        {/* Total Hours Logged In */}
        <div style={{
          background: "rgba(99, 102, 241, 0.05)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
        }}>
          <span style={{ fontSize: "0.85rem", color: "#818cf8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Hours Logged In</span>
          <span style={{ fontSize: "2rem", fontWeight: "800", color: "#6366f1" }}>{stats.totalHoursCombined} Hours</span>
        </div>
      </div>

      {/* 7-Day Portal Engagement & Growth Trends */}
      <div style={{
        background: "rgba(255,255,255,0.01)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        padding: "24px"
      }}>
        <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: "0 0 15px 0", fontWeight: "700" }}>7-Day Portal Engagement & Activity Trends</h3>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLogouts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
              <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#ffffff" }} />
              <Legend wrapperStyle={{ fontSize: "0.85rem", marginTop: "10px" }} />
              <Area type="monotone" name="Logins" dataKey="Logins" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorLogins)" isAnimationActive={true} />
              <Area type="monotone" name="Logouts" dataKey="Logouts" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorLogouts)" isAnimationActive={true} />
              <Area type="monotone" name="Registrations" dataKey="Registrations" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorRegs)" isAnimationActive={true} />
            </AreaChart>
          </ResponsiveContainer>
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
            onClick={() => setActiveTab("sessions")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              fontSize: "0.88rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.2s",
              background: activeTab === "sessions" ? "rgba(99, 102, 241, 0.15)" : "transparent",
              color: activeTab === "sessions" ? "var(--primary)" : "var(--text-secondary)",
            }}
          >
            Live Status & Logged In Hours
          </button>
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
            Daily Login/Logout Audit Timeline
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
            placeholder="Search logs by email, name or status..."
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
        <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
          
          {/* Tab 1: Live Status & Logged In Hours */}
          {activeTab === "sessions" && (
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: "0 0 16px 0", fontWeight: "700" }}>Student Session Status & Logged In Hours Matrix</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Student Name</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>User Email</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Current Status</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Total Logged In Time</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Total Logins</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Last Login</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Last Logout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSessions.map((s) => (
                      <tr key={s.email} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "14px 16px", fontWeight: "600", color: "#ffffff" }}>{s.name}</td>
                        <td style={{ padding: "14px 16px" }}>{s.email}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            padding: "4px 12px",
                            borderRadius: "6px",
                            fontSize: "0.78rem",
                            fontWeight: "700",
                            letterSpacing: "0.5px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            background: s.status === "Active" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            color: s.status === "Active" ? "#10b981" : "#ef4444",
                            border: s.status === "Active" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)"
                          }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.status === "Active" ? "#10b981" : "#ef4444", boxShadow: s.status === "Active" ? "0 0 6px #10b981" : "none" }}></span>
                            {s.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", fontWeight: "800", color: "#6366f1" }}>
                          <FiClock style={{ marginRight: "6px", verticalAlign: "middle" }} />
                          {s.durationFormatted}
                        </td>
                        <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{s.loginCount} Sessions</td>
                        <td style={{ padding: "14px 16px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>{s.lastLogin}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>{s.lastLogout}</td>
                      </tr>
                    ))}
                    {filteredSessions.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>No student session records available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: New Registrations */}
          {activeTab === "registrations" && (
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: "0 0 16px 0", fontWeight: "700" }}>New User Registration Audits</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>UUID / Student ID</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Full Name</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Registered Email</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Date Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "14px 16px", color: "var(--text-secondary)", fontFamily: "monospace", fontSize: "0.8rem" }}>{u.id}</td>
                        <td style={{ padding: "14px 16px", fontWeight: "600", color: "#ffffff" }}>{u.display_name || "N/A"}</td>
                        <td style={{ padding: "14px 16px" }}>{u.email || "No Email"}</td>
                        <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{new Date(u.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>No new registration records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Daily Activity Log */}
          {activeTab === "activity" && (
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: "0 0 16px 0", fontWeight: "700" }}>Daily Login/Logout Timelines</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Log ID</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>User Email</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Activity Event</th>
                      <th style={{ padding: "14px 16px", fontWeight: "600" }}>Time Recorded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.map((a) => (
                      <tr key={a.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>#{a.id}</td>
                        <td style={{ padding: "14px 16px", fontWeight: "600", color: "#ffffff" }}>{a.email}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            padding: "4px 12px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            letterSpacing: "0.5px",
                            background: a.activity_type === "login" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            color: a.activity_type === "login" ? "#10b981" : "#ef4444",
                            border: a.activity_type === "login" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)"
                          }}>
                            {a.activity_type.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{new Date(a.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                    {filteredActivities.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>No daily activity logs recorded.</td>
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
