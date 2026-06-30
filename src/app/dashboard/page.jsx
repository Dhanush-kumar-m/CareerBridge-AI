"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Link from "next/link";
import useAptitudeProgress from "../../hooks/useAptitudeProgress";
import useCodingProgress from "../../hooks/useCodingProgress";
import useCompanyInteractions from "../../hooks/useCompanyInteractions";
import useResumeAnalysis from "../../hooks/useResumeAnalysis";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  FiBookOpen,
  FiCode,
  FiFileText,
  FiMic,
  FiAward,
  FiZap,
  FiActivity,
  FiClock,
  FiStar,
  FiCheckCircle,
  FiCalendar,
  FiTrendingUp,
  FiBriefcase,
  FiUsers,
  FiChevronRight,
  FiPlusCircle,
  FiSettings,
  FiDatabase,
  FiTerminal,
  FiCpu,
  FiBell,
  FiInbox
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444"];

export default function Dashboard() {
  const [activeView, setActiveView] = useState("student"); // "student" or "admin"

  // User details
  const studentInfo = {
    name: "Dhanush",
    avatar: "👨‍💻",
    college: "State Engineering College",
    dept: "Computer Science & Engineering",
    gradYear: "2026",
    semester: "7th Semester",
    lastLogin: "Today, 10:45 AM"
  };

  // State values sync with Supabase Hooks
  const [xp, setXp] = useState(2450);
  const [solvedCount, setSolvedCount] = useState(245);
  const [aptitudeCount, setAptitudeCount] = useState(520);
  const [atsScore, setAtsScore] = useState(88);
  const [readinessScore, setReadinessScore] = useState(81);
  const [savedCompaniesCount, setSavedCompaniesCount] = useState(3);
  const [appliedDrivesCount, setAppliedDrivesCount] = useState(2);

  const { solvedList } = useAptitudeProgress();
  const { solvedIds } = useCodingProgress();
  const { getSavedAndAppliedCounts } = useCompanyInteractions();
  const { latestAnalysis } = useResumeAnalysis();
  const { savedCount, appliedCount } = getSavedAndAppliedCounts();

  useEffect(() => {
    if (solvedIds.length > 0) setSolvedCount(solvedIds.length);
  }, [solvedIds]);

  useEffect(() => {
    if (solvedList.length > 0) setAptitudeCount(solvedList.length);
  }, [solvedList]);

  useEffect(() => {
    if (latestAnalysis && latestAnalysis.score) setAtsScore(latestAnalysis.score);
  }, [latestAnalysis]);

  useEffect(() => {
    setSavedCompaniesCount(savedCount || 3);
    setAppliedDrivesCount(appliedCount || 2);
  }, [savedCount, appliedCount]);

  // Performance datasets for graphs
  const weeklyProgress = [
    { day: "Mon", coding: 2, aptitude: 10, interviews: 1 },
    { day: "Tue", coding: 4, aptitude: 15, interviews: 0 },
    { day: "Wed", coding: 3, aptitude: 12, interviews: 1 },
    { day: "Thu", coding: 6, aptitude: 20, interviews: 2 },
    { day: "Fri", coding: 5, aptitude: 18, interviews: 1 },
    { day: "Sat", coding: 8, aptitude: 25, interviews: 2 },
    { day: "Sun", coding: 5, aptitude: 15, interviews: 1 }
  ];

  const subjectData = [
    { name: "Data Structures", progress: 82, accuracy: 85 },
    { name: "Algorithms", progress: 75, accuracy: 78 },
    { name: "DBMS & SQL", progress: 90, accuracy: 92 },
    { name: "OS & Networks", progress: 68, accuracy: 70 },
    { name: "OOP Concepts", progress: 85, accuracy: 88 }
  ];

  return (
    <div className="dashboard-layout" style={{ display: "flex", minHeight: "100vh", background: "#090d16" }}>
      <Sidebar />

      <main className="dashboard-content" style={{ flex: 1, padding: "24px", overflowY: "auto", color: "#cbd5e1" }}>
        
        {/* Top Control Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
          <div>
            <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: "700" }}>Dashboard Access</span>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <button 
                onClick={() => setActiveView("student")} 
                className={`tab-link ${activeView === "student" ? "active" : ""}`}
                style={{ padding: "6px 14px", fontSize: "0.85rem", borderRadius: "6px" }}
              >
                Student Hub
              </button>
              <button 
                onClick={() => setActiveView("admin")} 
                className={`tab-link ${activeView === "admin" ? "active" : ""}`}
                style={{ padding: "6px 14px", fontSize: "0.85rem", borderRadius: "6px" }}
              >
                Admin Panel
              </button>
            </div>
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
            <span>Last sync: <strong>{studentInfo.lastLogin}</strong></span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* STUDENT DASHBOARD VIEW */}
        {/* ============================================================== */}
        {activeView === "student" && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Welcome Section */}
            <section className="dashboard-header" style={{ 
              borderRadius: "18px", 
              padding: "30px 40px", 
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(124, 58, 237, 0.12) 100%)", 
              border: "1px solid rgba(255, 255, 255, 0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px"
            }}>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "800", margin: 0, color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span>{studentInfo.avatar}</span>
                  <span>Welcome Back, {studentInfo.name}</span>
                </h1>
                <p style={{ marginTop: "8px", color: "var(--text-secondary)", fontSize: "0.96rem" }}>
                  {studentInfo.college} • {studentInfo.dept} ({studentInfo.semester})
                </p>
                <div style={{ display: "flex", gap: "15px", marginTop: "15px", fontSize: "0.84rem", color: "var(--text-secondary)" }}>
                  <span>Graduation: <strong>{studentInfo.gradYear}</strong></span>
                  <span>•</span>
                  <span>Date: <strong>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></span>
                </div>
              </div>

              {/* Placement readiness badge */}
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "var(--text-secondary)" }}>Readiness index</span>
                <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#6366f1", margin: "4px 0" }}>{readinessScore}%</h2>
                <span style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.76rem",
                  fontWeight: "700",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.3)"
                }}>
                  Placement Ready
                </span>
              </div>
            </section>

            {/* Quick Access panel */}
            <section style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px", display: "flex", alignItems: "center", gap: "6px" }}>
                <FiZap style={{ color: "#fbbf24" }} />
                <span>Quick Access Terminal</span>
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
                <Link href="/coding" className="start-practice-badge-btn" style={{ justifyContent: "center" }}><FiCode /> Coding compiler</Link>
                <Link href="/aptitude" className="start-practice-badge-btn" style={{ justifyContent: "center", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}><FiBookOpen /> Aptitude practice</Link>
                <Link href="/resume/analyzer" className="start-practice-badge-btn" style={{ justifyContent: "center", background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)" }}><FiFileText /> AI Resume Analyzer</Link>
                <Link href="/mock-interview" className="start-practice-badge-btn" style={{ justifyContent: "center", background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}><FiMic /> AI Mock Interview</Link>
                <Link href="/companies" className="start-practice-badge-btn" style={{ justifyContent: "center", background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)" }}><FiBriefcase /> Company Prep</Link>
                <Link href="/analytics" className="start-practice-badge-btn" style={{ justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff" }}><FiActivity /> View Analytics</Link>
              </div>
            </section>

            {/* Quick stats grid */}
            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Coding Solved</span>
                <span className="stat-value">{solvedCount} Problems</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px" }}>Easy: {Math.round(solvedCount * 0.5)} | Med: {Math.round(solvedCount * 0.38)} | Hard: {Math.round(solvedCount * 0.12)}</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Aptitude Attempted</span>
                <span className="stat-value">{aptitudeCount} Solved</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px" }}>Accuracy: 85% • Strong: Number System</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">ATS Resume Score</span>
                <span className="stat-value">{atsScore}% Score</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px" }}>Status: Approved • 2 Missing keywords</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Placement drives</span>
                <span className="stat-value">{appliedDrivesCount} Applied</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px" }}>Saved Companies: {savedCompaniesCount}</span>
              </div>
            </section>

            {/* Middle Grid: Daily Goals & AI Recommendations */}
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: "25px" }}>
              
              {/* Daily Goals Checklist */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                  <FiCheckCircle style={{ color: "#10b981" }} />
                  <span>Today's Target Checklists</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { label: "Complete 10 Quantitative Aptitude questions", done: true },
                    { label: "Solve 2 Medium Coding exercises", done: true },
                    { label: "Practice 1 AI HR mock interview session", done: false },
                    { label: "Optimize 2 missing resume keywords", done: false }
                  ].map((goal, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                      <span style={{ color: goal.done ? "#10b981" : "var(--text-secondary)" }}>{goal.done ? "✔" : "⏳"}</span>
                      <span style={{ fontSize: "0.88rem", textDecoration: goal.done ? "line-through" : "none", color: goal.done ? "var(--text-secondary)" : "#ffffff" }}>{goal.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendation Engine */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                  <FiCpu style={{ color: "#6366f1" }} />
                  <span>AI Recommended Placements Tips</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ padding: "10px", background: "rgba(99, 102, 241, 0.05)", border: "1px solid rgba(99, 102, 241, 0.12)", borderRadius: "8px", fontSize: "0.85rem" }}>
                    <strong style={{ color: "#a78bfa" }}>DSA Practice:</strong> Study sliding window problems to expand coding array speed.
                  </div>
                  <div style={{ padding: "10px", background: "rgba(16, 185, 129, 0.05)", border: "1px solid rgba(16, 185, 129, 0.12)", borderRadius: "8px", fontSize: "0.85rem" }}>
                    <strong style={{ color: "#34d399" }}>Resume Optimization:</strong> Add **Docker** or **AWS** to pass the Zoho/Amazon keywords cutoff.
                  </div>
                </div>
              </div>

            </div>

            {/* Academic Subject progress */}
            <section style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <FiBookOpen style={{ color: "#60a5fa" }} />
                <span>Technical Subjects Core Readiness</span>
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                {subjectData.map((sub, i) => (
                  <div key={i} style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <strong style={{ display: "block", fontSize: "0.92rem", marginBottom: "8px", color: "#ffffff" }}>{sub.name}</strong>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "4px" }}>
                      <span>Syllabus</span>
                      <span>{sub.progress}%</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}><div style={{ height: "100%", width: `${sub.progress}%`, background: COLORS[i % COLORS.length], borderRadius: "2px" }}></div></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Graphs & Charts Grid */}
            <section style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "25px" }}>
              
              {/* Daily / Weekly Progress Chart */}
              <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                  <FiTrendingUp style={{ color: "#6366f1" }} />
                  <span>Weekly Practice Activity Breakdown</span>
                </h3>
                <div style={{ width: "100%", height: 240 }}>
                  <ResponsiveContainer>
                    <BarChart data={weeklyProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "0.82rem", paddingTop: "10px" }} />
                      <Bar name="Aptitude solved Qs" dataKey="aptitude" fill="#6366f1" radius={[3, 3, 0, 0]} />
                      <Bar name="Coding solved Qs" dataKey="coding" fill="#10b981" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Upcoming drives & deadlines */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                  <FiBell style={{ color: "#fb7185" }} />
                  <span>Placement Drives & Events</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ padding: "10px 14px", background: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.15)", borderRadius: "8px" }}>
                    <strong style={{ color: "#f87171", fontSize: "0.85rem", display: "block" }}>TCS Drive Deadline</strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Ends in 3 days • Registration required</span>
                  </div>
                  <div style={{ padding: "10px 14px", background: "rgba(99, 102, 241, 0.06)", border: "1px solid rgba(99, 102, 241, 0.15)", borderRadius: "8px" }}>
                    <strong style={{ color: "#818cf8", fontSize: "0.85rem", display: "block" }}>Amazon Mock Interview</strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Scheduled: Tomorrow, 2:00 PM</span>
                  </div>
                </div>
              </div>

            </section>

            {/* Milestone badges (No certificates!) */}
            <section style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>
                <FiAward style={{ color: "#fb7185" }} />
                <span>Placement readiness badges</span>
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["Coding Excellence", "Aptitude Master", "Interview Ready", "Resume Excellence", "Placement Ready", "7-Day Streak"].map((badge, idx) => (
                  <span key={idx} style={{ padding: "8px 16px", borderRadius: "30px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "0.82rem", fontWeight: "700", color: "#cbd5e1", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span>🏅</span>
                    <span>{badge}</span>
                  </span>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ============================================================== */}
        {/* ADMIN DASHBOARD VIEW */}
        {/* ============================================================== */}
        {activeView === "admin" && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Admin Overview stats */}
            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Total Registered Students</span>
                <span className="stat-value">1,450 Students</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px", color: "#10b981" }}>Active Today: 420 (DAU)</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Placement Ready Count</span>
                <span className="stat-value">380 Students</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px", color: "#6366f1" }}>Readiness Score &gt; 80%</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Partner Recruiter Placements</span>
                <span className="stat-value">142 Selected</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px" }}>Highest Package: 45 LPA</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Portal Assets Summary</span>
                <span className="stat-value">100% Operational</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px", color: "#10b981" }}>API Status: Active • Database: Healthy</span>
              </div>
            </section>

            {/* Admin Reports & Analytics logs */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px" }}>
              
              {/* Monitoring logs */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                  <FiSettings style={{ color: "var(--primary)" }} />
                  <span>Administrative Monitoring Logs</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", fontFamily: "monospace", color: "#cbd5e1" }}>
                  <div style={{ padding: "8px", background: "rgba(0,0,0,0.2)", borderRadius: "4px" }}>[SYS] Server response time: 45ms</div>
                  <div style={{ padding: "8px", background: "rgba(0,0,0,0.2)", borderRadius: "4px" }}>[DB] Database health checks: 100% connected</div>
                  <div style={{ padding: "8px", background: "rgba(0,0,0,0.2)", borderRadius: "4px" }}>[API] ATS Resumes Parsing engine initialized</div>
                </div>
              </div>

              {/* Quick Administrative Reports downloads */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Export Institution logs</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button onClick={() => handleReportDownload("pdf")} className="start-practice-badge-btn" style={{ justifyContent: "center" }}><FiDownload style={{ marginRight: "6px" }} /> Export Students Performance PDF</button>
                  <button onClick={() => handleReportDownload("excel")} className="start-practice-badge-btn" style={{ justifyContent: "center", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}><FiDownload style={{ marginRight: "6px" }} /> Export Placements Excel Report</button>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}