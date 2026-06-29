"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiMic,
  FiVideo,
  FiAward,
  FiZap,
  FiBookOpen,
  FiTrendingUp,
  FiActivity,
  FiCode,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiBriefcase,
  FiPlay,
  FiSettings,
  FiUser,
  FiCpu,
  FiCompass,
  FiLayers,
  FiMessageSquare,
  FiFolder,
  FiRadio,
  FiCalendar,
  FiFileText
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function MockInterviewPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCompanySimulation, setSelectedCompanySimulation] = useState("google");

  // Mock data for readiness scores
  const readinessMetrics = [
    { title: "Overall Readiness", score: 81 },
    { title: "HR Interview Readiness", score: 85 },
    { title: "Technical Interview Readiness", score: 78 },
    { title: "Coding Interview Readiness", score: 80 },
    { title: "Communication Score", score: 78 },
    { title: "Resume Match Score", score: 88 },
    { title: "Company Readiness Score", score: 72 },
    { title: "Interview Confidence Score", score: 82 }
  ];

  // Performance Cards
  const performanceStats = [
    { label: "Interviews Completed", val: "14", desc: "Target reached" },
    { label: "Questions Answered", val: "128", desc: "Passed verification" },
    { label: "Average Score", val: "82%", desc: "B+ Placement Grade" },
    { label: "Best Score", val: "94%", desc: "Accenture Mock Session" },
    { label: "Practice Hours", val: "15.4 hrs", desc: "Active learning" },
    { label: "AI Confidence Rating", val: "88/100", desc: "High fluency" }
  ];

  // Previous interview logs
  const interviewHistory = [
    { date: "Yesterday", company: "TCS", duration: "30 mins", score: "88%", outcome: "Passed" },
    { date: "3 days ago", company: "Infosys", duration: "10 mins", score: "78%", outcome: "Recommended Optimization" },
    { date: "Last week", company: "Accenture", duration: "30 mins", score: "94%", outcome: "Passed" },
    { date: "2 weeks ago", company: "Amazon", duration: "60 mins", score: "72%", outcome: "Needs Work" }
  ];

  const companiesList = [
    "google", "microsoft", "amazon", "oracle", "adobe", "zoho", 
    "tcs", "infosys", "wipro", "accenture", "cognizant", "capgemini",
    "hcltech", "ibm", "deloitte", "ey"
  ];

  return (
    <div className="mock-interview-dashboard-container" style={{ padding: "10px" }}>
      
      {/* Header Banner */}
      <header className="aptitude-portal-header" style={{ marginBottom: "35px" }}>
        <div className="portal-header-info">
          <span className="badge-glow">
            <FiMic style={{ marginRight: "6px" }} />
            AI EVALUATION ENGINE
          </span>
          <h1>Placement Interview Center</h1>
          <p>
            Practice real-time HR, Technical, Coding, and Company-Specific simulation interviews. 
            Receive immediate AI-driven communication, confidence, fluency, and syntax metrics.
          </p>
        </div>

        {/* Readiness Snapshot */}
        <div className="portal-header-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "15px", width: "100%" }}>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Overall Readiness</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#6366f1" }}>81%</span>
            <div className="mini-progress-bar" style={{ marginTop: "8px" }}><div className="fill" style={{ width: "81%" }}></div></div>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">HR Score</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#10b981" }}>85%</span>
            <div className="mini-progress-bar" style={{ marginTop: "8px" }}><div className="fill" style={{ width: "85%", background: "#10b981" }}></div></div>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Tech Score</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#f59e0b" }}>78%</span>
            <div className="mini-progress-bar" style={{ marginTop: "8px" }}><div className="fill" style={{ width: "78%", background: "#f59e0b" }}></div></div>
          </div>
          <div className="stat-pill" style={{ padding: "12px 16px" }}>
            <span className="stat-label">Total Completed</span>
            <span className="stat-value" style={{ fontSize: "1.4rem", color: "#a78bfa" }}>14 Sessions</span>
            <span className="stat-label" style={{ fontSize: "0.72rem", marginTop: "4px" }}>Average: 82%</span>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "25px" }}>
        <button onClick={() => setActiveTab("overview")} className={`tab-link ${activeTab === "overview" ? "active" : ""}`}>
          <FiActivity />
          <span>Dashboard Overview</span>
        </button>
        <button onClick={() => setActiveTab("start")} className={`tab-link ${activeTab === "start" ? "active" : ""}`}>
          <FiPlay />
          <span>Modes & Simulations</span>
        </button>
        <button onClick={() => setActiveTab("categories")} className={`tab-link ${activeTab === "categories" ? "active" : ""}`}>
          <FiLayers />
          <span>Categories Detail</span>
        </button>
        <button onClick={() => setActiveTab("roadmaps")} className={`tab-link ${activeTab === "roadmaps" ? "active" : ""}`}>
          <FiClock />
          <span>Roadmaps & Recommendations</span>
        </button>
        <button onClick={() => setActiveTab("recording")} className={`tab-link ${activeTab === "recording" ? "active" : ""}`}>
          <FiVideo />
          <span>Recording Center</span>
        </button>
      </nav>

      {/* Main Content Pane */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Dashboard Overview */}
        {activeTab === "overview" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.20fr 1.80fr", gap: "25px", alignItems: "start" }}>
            
            {/* Readiness breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "20px" }}>Interview Readiness Breakdown</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {readinessMetrics.map((m, idx) => (
                    <div key={idx}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "4px" }}>
                        <span>{m.title}</span>
                        <span>{m.score}%</span>
                      </div>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}><div style={{ height: "100%", width: `${m.score}%`, background: COLORS[idx % COLORS.length], borderRadius: "2px" }}></div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Cards & History */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                {performanceStats.map((stat, idx) => (
                  <div key={idx} className="stat-pill" style={{ padding: "18px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="stat-label" style={{ fontSize: "0.78rem" }}>{stat.label}</span>
                    <span className="stat-value" style={{ fontSize: "1.6rem", margin: "5px 0", color: "#ffffff" }}>{stat.val}</span>
                    <span className="stat-label" style={{ fontSize: "0.72rem" }}>{stat.desc}</span>
                  </div>
                ))}
              </div>

              {/* History list */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                  <FiClock style={{ color: "#a78bfa" }} />
                  <span>Session History & AI Transcripts</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {interviewHistory.map((h, i) => (
                    <div 
                      key={i} 
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 18px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        borderRadius: "8px",
                        fontSize: "0.88rem"
                      }}
                    >
                      <div>
                        <strong style={{ color: "#ffffff", display: "block" }}>{h.company} Prep Interview</strong>
                        <span style={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>{h.date} • {h.duration}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ color: h.score >= "80%" ? "#10b981" : "#fbbf24", fontWeight: "700", display: "block" }}>{h.score} Score</span>
                        <span style={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>{h.outcome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </section>
        )}

        {/* Tab 2: Start Practice & Simulations */}
        {activeTab === "start" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Quick Actions Grid */}
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Choose Practice Mode</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
                
                <Link href="/mock-interview/hr" className="start-practice-badge-btn" style={{ justifyContent: "center", padding: "18px 24px", height: "auto" }}>
                  <FiUser style={{ fontSize: "1.2rem" }} />
                  <div style={{ textAlign: "left", paddingLeft: "10px" }}>
                    <strong style={{ display: "block", fontSize: "0.95rem" }}>HR Interview</strong>
                    <span style={{ fontSize: "0.75rem", fontWeight: "normal", opacity: 0.8 }}>Self intro, goals, behaviorals</span>
                  </div>
                </Link>

                <Link href="/mock-interview/technical" className="start-practice-badge-btn" style={{ justifyContent: "center", padding: "18px 24px", height: "auto", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
                  <FiCode style={{ fontSize: "1.2rem" }} />
                  <div style={{ textAlign: "left", paddingLeft: "10px" }}>
                    <strong style={{ display: "block", fontSize: "0.95rem" }}>Technical Interview</strong>
                    <span style={{ fontSize: "0.75rem", fontWeight: "normal", opacity: 0.8 }}>DSA, OOPs, DBMS, OS</span>
                  </div>
                </Link>

                <div className="start-practice-badge-btn" style={{ justifyContent: "center", padding: "18px 24px", height: "auto", background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", cursor: "pointer" }}>
                  <FiFileText style={{ fontSize: "1.2rem" }} />
                  <div style={{ textAlign: "left", paddingLeft: "10px" }}>
                    <strong style={{ display: "block", fontSize: "0.95rem" }}>Resume Based</strong>
                    <span style={{ fontSize: "0.75rem", fontWeight: "normal", opacity: 0.8 }}>AI scans resume for questions</span>
                  </div>
                </div>

                <div className="start-practice-badge-btn" style={{ justifyContent: "center", padding: "18px 24px", height: "auto", background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", cursor: "pointer" }}>
                  <FiCpu style={{ fontSize: "1.2rem" }} />
                  <div style={{ textAlign: "left", paddingLeft: "10px" }}>
                    <strong style={{ display: "block", fontSize: "0.95rem" }}>System Design</strong>
                    <span style={{ fontSize: "0.75rem", fontWeight: "normal", opacity: 0.8 }}>HLD/LLD, scaling, database</span>
                  </div>
                </div>

              </div>
            </div>

            {/* AI Interview Modes durations */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <div style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
                <span style={{ color: "#3b82f6", fontWeight: "700", fontSize: "0.8rem", textTransform: "uppercase" }}>Beginner Mode</span>
                <h4 style={{ margin: "5px 0 10px 0", color: "#ffffff" }}>Basic HR Evaluation</h4>
                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: "0 0 15px 0", lineHeight: "1.4" }}>Cover basic behavioral and self-introduction questions under 10 minutes.</p>
                <Link href="/mock-interview/hr" className="solve-btn" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>Start Beginner</Link>
              </div>

              <div style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
                <span style={{ color: "#10b981", fontWeight: "700", fontSize: "0.8rem", textTransform: "uppercase" }}>Standard Mode</span>
                <h4 style={{ margin: "5px 0 10px 0", color: "#ffffff" }}>HR + Technical Round</h4>
                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: "0 0 15px 0", lineHeight: "1.4" }}>Mid-tier evaluation covering programming principles and typical HR templates (30 mins).</p>
                <Link href="/mock-interview/technical" className="solve-btn" style={{ padding: "6px 12px", fontSize: "0.8rem", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>Start Standard</Link>
              </div>

              <div style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px" }}>
                <span style={{ color: "#a78bfa", fontWeight: "700", fontSize: "0.8rem", textTransform: "uppercase" }}>Advanced Mode</span>
                <h4 style={{ margin: "5px 0 10px 0", color: "#ffffff" }}>Placement Simulation</h4>
                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", margin: "0 0 15px 0", lineHeight: "1.4" }}>Deep-dive interview simulating full multi-tier corporate placement cycles (60 mins).</p>
                <button className="solve-btn" style={{ padding: "6px 12px", fontSize: "0.8rem", background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)" }}>Start Simulation</button>
              </div>
            </div>

            {/* Company simulation selector */}
            <div style={{ padding: "25px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#ffffff" }}>Company Simulator Portal</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "0 0 20px 0" }}>Choose a corporate recruiter to replicate their selection round patterns and questions bank.</p>
              
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px" }}>
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Choose Recruiter:</span>
                <select 
                  value={selectedCompanySimulation} 
                  onChange={(e) => setSelectedCompanySimulation(e.target.value)}
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#ffffff",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    textTransform: "capitalize"
                  }}
                >
                  {companiesList.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <Link href={`/mock-interview/technical?company=${selectedCompanySimulation}`} className="solve-btn" style={{ padding: "10px 24px" }}>
                <span>Launch {selectedCompanySimulation.toUpperCase()} Simulation</span>
              </Link>
            </div>

          </section>
        )}

        {/* Tab 3: Categories Detail */}
        {activeTab === "categories" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div className="module-accordion-card expanded" style={{ borderLeft: "4px solid #6366f1" }}>
              <div className="module-header">
                <h3>👨‍💼 HR & Behavioral Interview Topics</h3>
                <span className="topics-count-label">500+ Question bank</span>
              </div>
              <div className="module-body">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Self Introduction", "Strengths & Weaknesses", "Career Goals", "Conflict Resolution", "Failure handling", "Leadership history"].map((topic, i) => (
                    <span key={i} className="topic-tag" style={{ background: "rgba(99,102,241,0.06)" }}>{topic}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="module-accordion-card expanded" style={{ borderLeft: "4px solid #10b981" }}>
              <div className="module-header">
                <h3>💻 Technical Interview Topics</h3>
                <span className="topics-count-label">3000+ Question bank</span>
              </div>
              <div className="module-body">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Java/Python/C++ core", "Data Structures", "Algorithms Design", "DBMS & SQL queries", "Operating Systems", "Computer Networks"].map((topic, i) => (
                    <span key={i} className="topic-tag" style={{ background: "rgba(16,185,129,0.06)" }}>{topic}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="module-accordion-card expanded" style={{ borderLeft: "4px solid #a78bfa" }}>
              <div className="module-header">
                <h3>🗣 Communication & Fluency Assessment</h3>
                <span className="topics-count-label">AI Speech Scanners</span>
              </div>
              <div className="module-body">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Grammar check", "Vocabulary", "Pronunciation Accuracy", "Filler words tracking", "Speaking speed", "Tone confidence"].map((topic, i) => (
                    <span key={i} className="topic-tag" style={{ background: "rgba(167,139,250,0.06)" }}>{topic}</span>
                  ))}
                </div>
              </div>
            </div>

          </section>
        )}

        {/* Tab 4: Roadmaps & Recommendations */}
        {activeTab === "roadmaps" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: "25px", alignItems: "start" }}>
            
            {/* Roadmaps list */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Preparation Roadmaps</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ padding: "12px 18px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                  <strong style={{ color: "#ffffff", fontSize: "0.92rem", display: "block" }}>7-Day Crash Prep</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Quick summary for upcoming emergency drives</span>
                </div>
                <div style={{ padding: "12px 18px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                  <strong style={{ color: "#ffffff", fontSize: "0.92rem", display: "block" }}>15-Day Standard Prep</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Covers basic programming OOPs and HR questions</span>
                </div>
                <div style={{ padding: "12px 18px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                  <strong style={{ color: "#ffffff", fontSize: "0.92rem", display: "block" }}>30-Day Product Company roadmap</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Deep-dive DSA configurations and system designs</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                <FiCpu style={{ color: "#818cf8" }} />
                <span>AI Practice Recommendations</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.15)", borderRadius: "8px" }}>
                  <strong style={{ color: "#f87171", fontSize: "0.86rem", display: "block" }}>DBMS & SQL Focus</strong>
                  <span style={{ color: "#cbd5e1", fontSize: "0.8rem", marginTop: "4px", display: "inline-block" }}>Your technical scores indicate minor issues with database indexing and SQL transaction statements.</span>
                </div>
                <div style={{ padding: "12px", background: "rgba(99, 102, 241, 0.05)", border: "1px solid rgba(99, 102, 241, 0.15)", borderRadius: "8px" }}>
                  <strong style={{ color: "#a78bfa", fontSize: "0.86rem", display: "block" }}>Communication coaching</strong>
                  <span style={{ color: "#cbd5e1", fontSize: "0.8rem", marginTop: "4px", display: "inline-block" }}>Practice speaking slower. Average speaking speed observed (145 WPM) is slightly fast.</span>
                </div>
              </div>
            </div>

          </section>
        )}

        {/* Tab 5: Recording Center & Future Previews */}
        {activeTab === "recording" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Recording configurations */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                <FiRadio style={{ color: "#fb7185" }} />
                <span>Recording Center Settings</span>
              </h3>
              <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "20px" }}>
                Configure video feed settings, microphonic devices, and local caches to save interview tapes.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Video Feed Capture</span>
                  <span style={{ color: "#10b981", fontWeight: "700" }}>Active</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Audio Level Input</span>
                  <span style={{ color: "#10b981", fontWeight: "700" }}>Optimal (-12 dB)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                  <span style={{ color: "var(--text-secondary)" }}>AI speech transcribing</span>
                  <span style={{ color: "#6366f1", fontWeight: "700" }}>Active (English US)</span>
                </div>
              </div>
            </div>

            {/* Future Features Preview */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                <FiCpu style={{ color: "var(--primary)" }} />
                <span>Future Tech Previews</span>
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--primary)" }}>✦</span>
                  <span>AI avatar interviewer integration</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--primary)" }}>✦</span>
                  <span>Real-time facial expression and eye contact scanner</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--primary)" }}>✦</span>
                  <span>Interactive Group Discussion (GD) simulator panels</span>
                </li>
              </ul>
            </div>

          </section>
        )}

      </main>
    </div>
  );
}