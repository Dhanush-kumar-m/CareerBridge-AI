"use client";

import { useState, useEffect, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from "recharts";
import {
  FiActivity,
  FiZap,
  FiAward,
  FiTrendingUp,
  FiCode,
  FiCheckCircle,
  FiBookOpen,
  FiFileText,
  FiCompass,
  FiTarget,
  FiBriefcase,
  FiMessageSquare,
  FiLayers,
  FiCpu,
  FiDownload,
  FiChevronRight,
  FiCalendar
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#a78bfa", "#f59e0b", "#ec4899", "#06b6d4"];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Dynamic user data states loaded from localStorage
  const [solvedCount, setSolvedCount] = useState(245);
  const [aptitudeCount, setAptitudeCount] = useState(520);
  const [atsScore, setAtsScore] = useState(88);
  const [readinessScore, setReadinessScore] = useState(81);
  const [currentStreak, setCurrentStreak] = useState(5);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const solvedList = JSON.parse(localStorage.getItem("careerbridge_solved_coding") || "[]");
      if (solvedList.length > 0) setSolvedCount(solvedList.length);

      const solvedApt = JSON.parse(localStorage.getItem("careerbridge_solved_aptitude") || "[]");
      if (solvedApt.length > 0) setAptitudeCount(solvedApt.length);

      const savedResume = JSON.parse(localStorage.getItem("low_score_resume_analysis") || "null");
      if (savedResume && savedResume.score) setAtsScore(savedResume.score);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  // ==========================================
  // CHART DATASETS
  // ==========================================

  // 1. Overview Progress
  const progressData = [
    { month: "Jan", aptitude: 40, coding: 25, mock: 30 },
    { month: "Feb", aptitude: 55, coding: 40, mock: 48 },
    { month: "Mar", aptitude: 65, coding: 55, mock: 50 },
    { month: "Apr", aptitude: 75, coding: 65, mock: 68 },
    { month: "May", aptitude: 85, coding: 78, mock: 74 },
    { month: "Jun", aptitude: 92, coding: 88, mock: 81 }
  ];

  // 2. Aptitude Correct vs Wrong Ratio
  const aptPieData = [
    { name: "Correct Solved", value: aptitudeCount, fill: "#10b981" },
    { name: "Incorrect Answers", value: Math.round(aptitudeCount * 0.18), fill: "#ef4444" }
  ];

  // 3. Aptitude Topic Performance
  const aptTopicData = [
    { topic: "Number System", accuracy: 88 },
    { topic: "Simplification", accuracy: 92 },
    { topic: "Percentage", accuracy: 85 },
    { topic: "Profit & Loss", accuracy: 78 },
    { topic: "Simple Interest", accuracy: 82 },
    { topic: "Speed & Time", accuracy: 74 },
    { topic: "Ratio/Proportion", accuracy: 80 }
  ];

  // 4. Aptitude Difficulty Accuracy
  const aptDifficultyData = [
    { name: "Easy Level", accuracy: 94, fill: "#10b981" },
    { name: "Medium Level", accuracy: 78, fill: "#fbbf24" },
    { name: "Hard Level", accuracy: 56, fill: "#ef4444" }
  ];

  // 5. Coding Problems Solved by Difficulty
  const codingDiffData = [
    { name: "Easy Solved", value: Math.round(solvedCount * 0.50), fill: "#10b981" },
    { name: "Medium Solved", value: Math.round(solvedCount * 0.38), fill: "#fbbf24" },
    { name: "Hard Solved", value: Math.round(solvedCount * 0.12), fill: "#ef4444" }
  ];

  // 6. Language-wise Performance
  const languageData = [
    { language: "Java", solved: Math.round(solvedCount * 0.35), accuracy: 82 },
    { language: "Python", solved: Math.round(solvedCount * 0.30), accuracy: 78 },
    { language: "C++", solved: Math.round(solvedCount * 0.15), accuracy: 85 },
    { language: "C", solved: Math.round(solvedCount * 0.10), accuracy: 70 },
    { language: "JavaScript", solved: Math.round(solvedCount * 0.10), accuracy: 80 }
  ];

  // 7. Coding Contest Rating History
  const contestHistoryData = [
    { name: "Contest 1", rating: 1500 },
    { name: "Contest 2", rating: 1540 },
    { name: "Contest 3", rating: 1520 },
    { name: "Contest 4", rating: 1580 },
    { name: "Contest 5", rating: 1610 },
    { name: "Contest 6", rating: 1684 }
  ];

  // 8. Interview Score Breakdown
  const interviewRadarData = [
    { metric: "Technical", score: 82 },
    { metric: "HR Fit", score: 85 },
    { metric: "Coding Logic", score: 75 },
    { metric: "Communication", score: 88 },
    { metric: "Confidence", score: 80 },
    { metric: "Fluency", score: 78 }
  ];

  // 9. Subject-wise Academics
  const subjectsData = [
    { subject: "Data Structures", score: 82 },
    { subject: "Algorithms", score: 78 },
    { subject: "DBMS", score: 88 },
    { subject: "Operating Systems", score: 70 },
    { subject: "Computer Networks", score: 65 },
    { subject: "OOP Concepts", score: 85 },
    { subject: "SQL Queries", score: 90 }
  ];

  // 10. Resume Section Completeness
  const resumeSectionData = [
    { section: "Summary", complete: 100 },
    { section: "Education", complete: 100 },
    { section: "Skills", complete: 85 },
    { section: "Projects", complete: 90 },
    { section: "Certificates", complete: 75 }
  ];

  // 11. Mock Test Percentile History
  const mockHistoryData = [
    { test: "Mock 1", percentile: 82 },
    { test: "Mock 2", percentile: 85 },
    { test: "Mock 3", percentile: 88 },
    { test: "Mock 4", percentile: 91 }
  ];

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: "rgba(15, 23, 42, 0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "12px 16px",
          borderRadius: "8px",
          color: "#ffffff",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
          fontSize: "0.85rem"
        }}>
          <p style={{ margin: "0 0 8px 0", fontWeight: "700", color: "#94a3b8" }}>{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} style={{ margin: "4px 0", color: p.color, display: "flex", gap: "8px", justifyContent: "space-between" }}>
              <span>{p.name}:</span>
              <strong>{p.value}%</strong>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleReportDownload = (format) => {
    const text = `CAREERBRIDGE AI - PLACEMENT PERFORMANCE REPORT (${format.toUpperCase()})
============================================================
Generated: ${new Date().toLocaleDateString()}
Readiness Index: ${readinessScore}%
Placement Readiness Status: ${readinessScore >= 80 ? "Placement Ready" : "Intermediate"}

SUMMARY METRICS:
---------------
* Aptitude Questions Attempted: ${aptitudeCount}
* Coding Problems Solved: ${solvedCount}
* ATS Resume Compatibility: ${atsScore}%
* Current Activity Streak: ${currentStreak} Days
* Overall Global Rank: #142
`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `CareerBridge_Performance_Report.${format}`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="analytics-portal-container" style={{ padding: "10px" }}>
      
      {/* Header Banner */}
      <header className="aptitude-portal-header" style={{ marginBottom: "35px" }}>
        <div className="portal-header-info">
          <span className="badge-glow">
            <FiActivity style={{ marginRight: "6px" }} />
            ANALYTICS ENGINE
          </span>
          <h1>Student Analytics Center</h1>
          <p>
            Review custom chart visual analytics of your aptitude accuracy, compiler language performance, 
            interview parameters, resume completeness, and mock percentiles.
          </p>
        </div>

        {/* Dashboard Quick Stats */}
        <div className="portal-header-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "15px", width: "100%" }}>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Readiness Index</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#6366f1" }}>{readinessScore}%</span>
            <div className="mini-progress-bar" style={{ marginTop: "8px" }}><div className="fill" style={{ width: `${readinessScore}%` }}></div></div>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Problems Solved</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#10b981" }}>{solvedCount} Qs</span>
            <div className="mini-progress-bar" style={{ marginTop: "8px" }}><div className="fill" style={{ width: "65%", background: "#10b981" }}></div></div>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Current Streak</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#f59e0b" }}>{currentStreak} Days 🔥</span>
            <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px" }}>Longest: 28 Days</span>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Global Rank</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#a78bfa" }}>#142</span>
            <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px" }}>Dept: #18 | College: #45</span>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "25px" }}>
        <button onClick={() => setActiveTab("overview")} className={`tab-link ${activeTab === "overview" ? "active" : ""}`}>
          <FiCompass />
          <span>Overview & Heatmaps</span>
        </button>
        <button onClick={() => setActiveTab("aptitude")} className={`tab-link ${activeTab === "aptitude" ? "active" : ""}`}>
          <FiBookOpen />
          <span>Aptitude Analytics</span>
        </button>
        <button onClick={() => setActiveTab("coding")} className={`tab-link ${activeTab === "coding" ? "active" : ""}`}>
          <FiCode />
          <span>Coding Analytics</span>
        </button>
        <button onClick={() => setActiveTab("recruiters")} className={`tab-link ${activeTab === "recruiters" ? "active" : ""}`}>
          <FiBriefcase />
          <span>Resume & Interview</span>
        </button>
        <button onClick={() => setActiveTab("assessment")} className={`tab-link ${activeTab === "assessment" ? "active" : ""}`}>
          <FiTarget />
          <span>Mocks & Contests</span>
        </button>
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Overview & Contribution Heatmap */}
        {activeTab === "overview" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "25px", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* Line Area Progress */}
              <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem", fontWeight: "700", marginBottom: "20px", color: "#ffffff" }}>
                  <FiTrendingUp style={{ color: "#6366f1" }} />
                  <span>Preparation Growth curve</span>
                </h3>
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorApt" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCod" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                      <YAxis stroke="rgba(255,255,255,0.3)" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" name="Aptitude Accuracy" dataKey="aptitude" stroke="#6366f1" strokeWidth={3} fill="url(#colorApt)" />
                      <Area type="monotone" name="Coding Score" dataKey="coding" stroke="#10b981" strokeWidth={3} fill="url(#colorCod)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* GitHub Style daily activity contribution calendar */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                  <FiCalendar style={{ color: "#10b981" }} />
                  <span>Daily coding Activity heatmap</span>
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(24, 1fr)", gap: "4px", margin: "10px 0" }}>
                  {Array.from({ length: 120 }).map((_, idx) => {
                    const intensities = ["rgba(255,255,255,0.03)", "rgba(16, 185, 129, 0.15)", "rgba(16, 185, 129, 0.4)", "rgba(16, 185, 129, 0.7)", "#10b981"];
                    const intensity = intensities[Math.floor(Math.sin(idx * 0.15) * 2 + 2)];
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          height: "12px", 
                          background: intensity, 
                          borderRadius: "2px", 
                          border: "1px solid rgba(0,0,0,0.15)"
                        }}
                        title={`Activity index: ${idx}`}
                      />
                    );
                  })}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "10px" }}>
                  <span>Past 4 Months</span>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <span>Less</span>
                    <span style={{ width: "8px", height: "8px", background: "rgba(255,255,255,0.03)" }}></span>
                    <span style={{ width: "8px", height: "8px", background: "rgba(16, 185, 129, 0.15)" }}></span>
                    <span style={{ width: "8px", height: "8px", background: "rgba(16, 185, 129, 0.4)" }}></span>
                    <span style={{ width: "8px", height: "8px", background: "rgba(16, 185, 129, 0.7)" }}></span>
                    <span style={{ width: "8px", height: "8px", background: "#10b981" }}></span>
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Predictions & Reports */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
                <h4 style={{ margin: "0 0 10px 0", color: "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Overall Status</h4>
                <div style={{
                  display: "inline-block",
                  padding: "6px 20px",
                  borderRadius: "30px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  fontWeight: "700",
                  fontSize: "1.1rem"
                }}>
                  PLACEMENT READY 🚀
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Reports Exporter</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button onClick={() => handleReportDownload("pdf")} className="start-practice-badge-btn" style={{ justifyContent: "center" }}><FiDownload style={{ marginRight: "6px" }} /> PDF Performance Report</button>
                  <button onClick={() => handleReportDownload("xlsx")} className="start-practice-badge-btn" style={{ justifyContent: "center", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}><FiDownload style={{ marginRight: "6px" }} /> Excel Performance Report</button>
                  <button onClick={() => handleReportDownload("csv")} className="start-practice-badge-btn" style={{ justifyContent: "center", background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)" }}><FiDownload style={{ marginRight: "6px" }} /> CSV Performance Report</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Aptitude Analytics */}
        {activeTab === "aptitude" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
            
            {/* Pie Chart: Correct vs Wrong */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Correct vs Incorrect Solved Answers</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={aptPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                      {aptPieData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "0.85rem" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart: Difficulty Accuracies */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Accuracy Index by Difficulty Level</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aptDifficultyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" formatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="accuracy" radius={[4, 4, 0, 0]}>
                      {aptDifficultyData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart: Topic Wise Performance */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", gridColumn: "1 / -1" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Topic-wise Aptitude Accuracy Breakdown</h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aptTopicData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="topic" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                    <YAxis stroke="rgba(255,255,255,0.3)" formatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar name="Accuracy Rating" dataKey="accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </section>
        )}

        {/* Tab 3: Coding Analytics */}
        {activeTab === "coding" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
            
            {/* Donut Chart: Difficulty Solved */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Problems Solved by Level</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={codingDiffData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                      {codingDiffData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "0.85rem" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Language Performance Bar */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Language Solved Counts & Accuracies</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={languageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="language" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "0.8rem" }} />
                    <Bar name="Problems Solved" dataKey="solved" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar name="Accuracy %" dataKey="accuracy" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Chart: Rating Timeline */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", gridColumn: "1 / -1" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Weekly Coding Arena Rating History</h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={contestHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" domain={["dataMin - 100", "dataMax + 100"]} />
                    <Tooltip />
                    <Line type="monotone" name="Arena Rating" dataKey="rating" stroke="#fbbf24" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </section>
        )}

        {/* Tab 4: Resume & Interview */}
        {activeTab === "recruiters" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
            
            {/* Radar: Interview Scores */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Interview Parameters Evaluation</h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={interviewRadarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="metric" stroke="rgba(255,255,255,0.4)" style={{ fontSize: "0.75rem" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" />
                    <Radar name="Parameters Score" dataKey="score" stroke="#fb7185" fill="#fb7185" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar: Subjectwise Academics */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Subject-wise Technical Competency Mastery</h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={subjectsData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" style={{ fontSize: "0.72rem" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" />
                    <Radar name="Subject Score" dataKey="score" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar: Resume Completeness checks */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", gridColumn: "1 / -1" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Resume Section Completeness Index</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={resumeSectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="section" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" formatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar name="Completeness %" dataKey="complete" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </section>
        )}

        {/* Tab 5: Mocks & Contests */}
        {activeTab === "assessment" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
            
            {/* Line: Mock Test Percentile history */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Mock Assessment Percentile Trends</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="test" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" domain={[60, 100]} />
                    <Tooltip />
                    <Line type="monotone" name="Percentile Score" dataKey="percentile" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line: Weekly Contest Rating History */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Coding Arena Rating History</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={contestHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" domain={["dataMin - 100", "dataMax + 100"]} />
                    <Tooltip />
                    <Line type="monotone" name="Weekly Rating" dataKey="rating" stroke="#fbbf24" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </section>
        )}

      </main>

      {/* Badges Milestones Panel (No certificates) */}
      <section style={{ marginTop: "35px" }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.3rem", fontWeight: "800", color: "#ffffff", marginBottom: "20px" }}>
          <FiAward style={{ color: "#fb7185" }} />
          <span>Placement Readiness Milestone Badges</span>
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {[
            { title: "Coding Excellence Badge", desc: "For solving 100+ coding challenges", icon: "💻" },
            { title: "Aptitude Master Badge", desc: "Checked off quantitative module 1", icon: "🧠" },
            { title: "Interview Ready Badge", desc: "Mock interview score above 80%", icon: "🎤" },
            { title: "Resume Excellence Badge", desc: "ATS score audit index above 85%", icon: "📄" },
            { title: "Placement Ready Badge", desc: "Readiness index above 80%", icon: "🚀" },
            { title: "Top Performer Badge", desc: "Ranked in top 15% globally", icon: "🏆" },
            { title: "7-Day Streak Badge", desc: "Maintained active practice weekly", icon: "🔥" }
          ].map((badge, idx) => (
            <div 
              key={idx}
              style={{
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                gap: "12px",
                alignItems: "center"
              }}
            >
              <span style={{ fontSize: "2rem" }}>{badge.icon}</span>
              <div>
                <h4 style={{ margin: "0 0 3px 0", fontSize: "0.9rem", color: "#ffffff", fontWeight: "700" }}>{badge.title}</h4>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--text-secondary)" }}>{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
