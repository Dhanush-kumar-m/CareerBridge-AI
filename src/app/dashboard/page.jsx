"use client";

import Sidebar from "../../components/layout/Sidebar";
import { useXP } from "../../context/XPContext";
import useProgress from "../../hooks/useProgress";
import Link from "next/link";
import {
  FiBookOpen,
  FiCode,
  FiFileText,
  FiMic,
  FiAward,
  FiTrendingUp,
  FiZap,
  FiActivity,
  FiClock,
  FiStar,
  FiCheckCircle
} from "react-icons/fi";

export default function Dashboard() {
  const { xp } = useXP();
  const { progress, placementReadiness } = useProgress();

  const primaryStats = [
    {
      title: "Placement Readiness",
      value: `${placementReadiness}%`,
      icon: FiAward,
      iconColor: "#f59e0b",
      progress: placementReadiness,
      desc: "Based on overall scores"
    },
    {
      title: "Total Experience Points",
      value: `${xp} XP`,
      icon: FiZap,
      iconColor: "#eab308",
      desc: "Earned from tests & coding"
    },
    {
      title: "Weekly Solved",
      value: "168 Questions",
      icon: FiClock,
      iconColor: "#3b82f6",
      desc: "7 active days streak"
    }
  ];

  const learningTracks = [
    {
      title: "Aptitude Training",
      value: `${progress.aptitude}%`,
      progress: progress.aptitude,
      icon: FiBookOpen,
      iconColor: "#3b82f6",
      path: "/aptitude"
    },
    {
      title: "Coding Practice",
      value: `${progress.coding}%`,
      progress: progress.coding,
      icon: FiCode,
      iconColor: "#10b981",
      path: "/coding"
    },
    {
      title: "Resume ATS Score",
      value: `${progress.resume}%`,
      progress: progress.resume,
      icon: FiFileText,
      iconColor: "#ec4899",
      path: "/resume/analyzer"
    },
    {
      title: "Interview Confidence",
      value: `${progress.interview}%`,
      progress: progress.interview,
      icon: FiMic,
      iconColor: "#8b5cf6",
      path: "/mock-interview"
    }
  ];

  const quickActions = [
    {
      title: "Practice Aptitude",
      desc: "Quantitative, verbal & reasoning sets",
      icon: FiBookOpen,
      color: "#3b82f6",
      path: "/aptitude"
    },
    {
      title: "Solve Coding",
      desc: "Open compiler & DSA challenges",
      icon: FiCode,
      color: "#10b981",
      path: "/coding"
    },
    {
      title: "Resume Analysis",
      desc: "Upload resume for real-time ATS audit",
      icon: FiFileText,
      color: "#ec4899",
      path: "/resume/analyzer"
    },
    {
      title: "Mock Interview",
      desc: "Practice with AI feedback",
      icon: FiMic,
      color: "#8b5cf6",
      path: "/mock-interview"
    }
  ];

  return (
    <div className="dashboard" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main className="dashboard-content" style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        {/* Welcome Banner */}
        <section className="dashboard-header" style={{ borderRadius: "18px", padding: "40px", marginBottom: "30px", background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.8rem" }}>👋</span>
            <h1 style={{ fontSize: "2rem", fontWeight: "800", margin: 0 }}>Welcome Back</h1>
          </div>
          <p style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "600px", lineHeight: "1.5" }}>
            Here is your daily snapshot. Complete recommended goals and verify your preparation scores.
          </p>
        </section>

        {/* Primary Stats Grid */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "35px" }}>
          {primaryStats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="stat-card" style={{ padding: "25px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: "600" }}>{item.title}</span>
                  <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", color: item.iconColor }}>
                    <Icon size={20} />
                  </div>
                </div>
                <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "var(--text-primary)" }}>
                  {item.value}
                </div>
                {item.progress !== undefined ? (
                  <div style={{ width: "100%" }}>
                    <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden", marginBottom: "8px" }}>
                      <div style={{ height: "100%", width: `${item.progress}%`, background: "var(--primary-gradient)", borderRadius: "10px" }} />
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{item.desc}</span>
                  </div>
                ) : (
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{item.desc}</span>
                )}
              </div>
            );
          })}
        </section>

        {/* Quick Actions Grid */}
        <section className="dashboard-section" style={{ marginBottom: "35px" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FiZap style={{ color: "#eab308" }} />
            <span>Quick Start Actions</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link href={action.path} key={action.title} className="stat-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", textDecoration: "none", cursor: "pointer", transition: "transform 0.2s" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `rgba(${action.color === "#3b82f6" ? "59, 130, 246" : action.color === "#10b981" ? "16, 185, 129" : action.color === "#ec4899" ? "236, 72, 153" : "139, 92, 246"}, 0.12)`, display: "flex", alignItems: "center", justifyContent: "center", color: action.color }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>{action.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>{action.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Learning Tracks Grid */}
        <section className="dashboard-section" style={{ marginBottom: "35px" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FiActivity style={{ color: "#3b82f6" }} />
            <span>Preparation Tracks Progress</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {learningTracks.map((track) => {
              const Icon = track.icon;
              return (
                <Link href={track.path} key={track.title} className="stat-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "15px", textDecoration: "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: "700", margin: 0 }}>{track.title}</h3>
                    <Icon size={18} style={{ color: track.iconColor }} />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "0.9rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Completion</span>
                      <span style={{ fontWeight: "bold" }}>{track.value}</span>
                    </div>
                    <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${track.progress}%`, background: track.iconColor, borderRadius: "10px" }} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Two Columns: Goal & Recent Activity */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
          {/* Daily Goal */}
          <section className="dashboard-section">
            <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiStar style={{ color: "#eab308" }} />
              <span>Today's Target</span>
            </h2>
            <div className="goal-card" style={{ padding: "25px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>Complete 10 Aptitude Questions</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600" }}>70% Done</span>
              </div>
              <div style={{ height: "8px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "70%", background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", borderRadius: "10px" }} />
              </div>
              <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>7 / 10 Completed. Keep going!</span>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="dashboard-section">
            <h2 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiActivity style={{ color: "#06b6d4" }} />
              <span>Recent Activity Feed</span>
            </h2>
            <div className="activity-card" style={{ padding: "25px" }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }}>
                  <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
                  <span style={{ color: "var(--text-primary)" }}>Solved 15 Coding Problems</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }}>
                  <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
                  <span style={{ color: "var(--text-primary)" }}>Completed Aptitude Test (Quantitative)</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }}>
                  <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
                  <span style={{ color: "var(--text-primary)" }}>Updated resume details for ATS evaluation</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }}>
                  <FiCheckCircle style={{ color: "#10b981", flexShrink: 0 }} />
                  <span style={{ color: "var(--text-primary)" }}>Attended HR Mock Interview Session</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}