"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import companies from "../../../data/companies";
import useCompanyInteractions from "../../../hooks/useCompanyInteractions";
import {
  FiBriefcase,
  FiGlobe,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiBookOpen,
  FiActivity,
  FiClock,
  FiFileText,
  FiCheckCircle,
  FiChevronRight,
  FiTerminal,
  FiInfo,
  FiLock,
  FiShield,
  FiUserCheck,
  FiPlay,
  FiSave,
  FiCheck
} from "react-icons/fi";

export default function DynamicCompanyProfilePage() {
  const { company: companySlug } = useParams();
  const router = useRouter();

  const company = companies.find((c) => c.slug === companySlug);

  const [activePrepTab, setActivePrepTab] = useState("overview");
  const { getInteraction, toggleSave: apiToggleSave, toggleApply: apiToggleApply, toggleStep: apiToggleStep } = useCompanyInteractions();
  const { is_saved: isSaved, is_applied: isApplied, prep_steps: checkedSteps } = company ? getInteraction(company.slug) : { is_saved: false, is_applied: false, prep_steps: [] };
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!company) return;

    // Set up mock notification drive alert
    setNotifications([
      { id: 1, text: `${company.name} Placement Drive for 2026 graduates is now OPEN!`, date: "Active" },
      { id: 2, text: `Registration deadline: Ends in 5 days.`, date: "Warning" }
    ]);
  }, [company]);

  if (!company) {
    return (
      <div className="not-found-page" style={{ padding: "40px", textAlign: "center", color: "#ffffff" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "15px" }}>❌ Company Profile Not Found</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "25px" }}>The company you are requesting does not exist in our database.</p>
        <Link href="/companies" className="solve-btn" style={{ padding: "10px 24px" }}>
          Back to Recruiter Hub
        </Link>
      </div>
    );
  }

  const toggleSave = () => {
    apiToggleSave(company.slug);
  };

  const toggleApply = () => {
    apiToggleApply(company.slug);
  };

  const toggleStep = (step) => {
    apiToggleStep(company.slug, step);
  };

  // Derived readiness score based on checklist completion
  const totalChecklistItems = 8;
  const progressPercent = Math.round((checkedSteps.length / totalChecklistItems) * 100);

  return (
    <div className="company-profile-wrapper" style={{ padding: "10px" }}>
      
      {/* Notifications Alert Banner */}
      {notifications.length > 0 && (
        <div className="drive-notifications-container" style={{ marginBottom: "25px" }}>
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={`drive-notification-pill ${n.date === "Warning" ? "warning" : "active"}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                borderRadius: "10px",
                background: n.date === "Warning" ? "rgba(245, 158, 11, 0.08)" : "rgba(16, 185, 129, 0.08)",
                border: n.date === "Warning" ? "1px solid rgba(245, 158, 11, 0.2)" : "1px solid rgba(16, 185, 129, 0.2)",
                marginBottom: "8px",
                fontSize: "0.92rem",
                color: "#cbd5e1"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: n.date === "Warning" ? "#f59e0b" : "#10b981", display: "inline-block" }}></span>
                <span>{n.text}</span>
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: n.date === "Warning" ? "#fbbf24" : "#34d399" }}>
                {n.date}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Header Banner */}
      <header className="company-hero-header" style={{
        background: "linear-gradient(135deg, rgba(30, 27, 75, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        padding: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "30px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div className="company-logo-badge" style={{
            fontSize: "3rem",
            width: "80px",
            height: "80px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {company.logo}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: "800", margin: 0, color: "#ffffff" }}>{company.name}</h1>
              <span className="company-cat-tag" style={{
                background: "rgba(99, 102, 241, 0.15)",
                color: "#818cf8",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: "700"
              }}>{company.category}</span>
            </div>
            <p style={{ color: "var(--text-secondary)", marginTop: "6px", fontSize: "1.02rem", maxWidth: "600px" }}>
              {company.role} • {company.package}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={toggleSave} 
            className={`tab-link ${isSaved ? "active" : ""}`}
            style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: isSaved ? "rgba(99,102,241,0.1)" : "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <FiSave />
            <span>{isSaved ? "Saved" : "Save Company"}</span>
          </button>
          <button 
            onClick={toggleApply} 
            className="solve-btn"
            style={{ 
              padding: "10px 22px", 
              borderRadius: "8px", 
              background: isApplied ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "var(--primary-gradient)",
              display: "flex", 
              alignItems: "center", 
              gap: "6px" 
            }}
          >
            <FiUserCheck />
            <span>{isApplied ? "Applied ✓" : "Apply Drive"}</span>
          </button>
        </div>
      </header>

      {/* Profile Sections Grid */}
      <div className="profile-layout-grid" style={{ display: "grid", gridTemplateColumns: "2.8fr 1.2fr", gap: "25px", alignItems: "start" }}>
        
        {/* Left Side: Detail Panels */}
        <div className="profile-left-column">
          
          {/* Prep Hub Tabs Navigation */}
          <nav className="aptitude-tab-nav" style={{ marginBottom: "20px" }}>
            <button onClick={() => setActivePrepTab("overview")} className={`tab-link ${activePrepTab === "overview" ? "active" : ""}`}>
              <FiInfo />
              <span>Overview</span>
            </button>
            <button onClick={() => setActivePrepTab("process")} className={`tab-link ${activePrepTab === "process" ? "active" : ""}`}>
              <FiBriefcase />
              <span>Hiring Process</span>
            </button>
            <button onClick={() => setActivePrepTab("questions")} className={`tab-link ${activePrepTab === "questions" ? "active" : ""}`}>
              <FiTerminal />
              <span>Prep Materials</span>
            </button>
            <button onClick={() => setActivePrepTab("roadmap")} className={`tab-link ${activePrepTab === "roadmap" ? "active" : ""}`}>
              <FiClock />
              <span>30-Day Roadmap</span>
            </button>
          </nav>

          {/* Tab Panes */}
          <div className="tab-pane fade-in" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "25px" }}>
            
            {/* Overview Tab */}
            {activePrepTab === "overview" && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>Company Profile Summary</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", fontSize: "0.95rem", marginBottom: "25px" }}>
                  {company.overview.description}
                </p>

                {/* Info Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <h5 style={{ color: "#94a3b8", fontSize: "0.8rem", textTransform: "uppercase", margin: "0 0 5px 0" }}>Industry</h5>
                    <p style={{ color: "#ffffff", fontWeight: "600", margin: 0 }}>{company.overview.industry}</p>
                  </div>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <h5 style={{ color: "#94a3b8", fontSize: "0.8rem", textTransform: "uppercase", margin: "0 0 5px 0" }}>Headquarters</h5>
                    <p style={{ color: "#ffffff", fontWeight: "600", margin: 0 }}>{company.overview.headquarters}</p>
                  </div>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <h5 style={{ color: "#94a3b8", fontSize: "0.8rem", textTransform: "uppercase", margin: "0 0 5px 0" }}>Founders & CEO</h5>
                    <p style={{ color: "#ffffff", fontWeight: "600", margin: 0 }}>{company.overview.founder} (CEO: {company.overview.ceo})</p>
                  </div>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <h5 style={{ color: "#94a3b8", fontSize: "0.8rem", textTransform: "uppercase", margin: "0 0 5px 0" }}>Corporate Market Value</h5>
                    <p style={{ color: "#ffffff", fontWeight: "600", margin: 0 }}>{company.overview.marketValue}</p>
                  </div>
                </div>

                {/* Eligibility Criteria */}
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>Eligibility Parameters</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 25px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <li style={{ color: "var(--text-secondary)", fontSize: "0.92rem", display: "flex", gap: "6px" }}>
                    <span style={{ color: "var(--primary)" }}>✔</span>
                    <span><strong>Branches:</strong> {company.eligibility.branches.join(", ")}</span>
                  </li>
                  <li style={{ color: "var(--text-secondary)", fontSize: "0.92rem", display: "flex", gap: "6px" }}>
                    <span style={{ color: "var(--primary)" }}>✔</span>
                    <span><strong>Min CGPA:</strong> {company.eligibility.cgpa}</span>
                  </li>
                  <li style={{ color: "var(--text-secondary)", fontSize: "0.92rem", display: "flex", gap: "6px" }}>
                    <span style={{ color: "var(--primary)" }}>✔</span>
                    <span><strong>Max Backlogs:</strong> {company.eligibility.backlogs}</span>
                  </li>
                  <li style={{ color: "var(--text-secondary)", fontSize: "0.92rem", display: "flex", gap: "6px" }}>
                    <span style={{ color: "var(--primary)" }}>✔</span>
                    <span><strong>Service Bond:</strong> {company.eligibility.bond}</span>
                  </li>
                </ul>

                {/* Salary Package Details */}
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>Salary Details & Benefits</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "10px" }}>
                  <div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", margin: "4px 0" }}><strong>Internship Stipend:</strong> {company.salary.stipend}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", margin: "4px 0" }}><strong>Annual CTC Package:</strong> {company.salary.ctc}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", margin: "4px 0" }}><strong>Base Salary Component:</strong> {company.salary.base}</p>
                  </div>
                  <div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", margin: "4px 0" }}><strong>Joining Bonus:</strong> {company.salary.joiningBonus}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", margin: "4px 0" }}><strong>Stock Options:</strong> {company.salary.stocks}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", margin: "4px 0" }}><strong>Core Benefits:</strong> {company.salary.benefits}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Hiring Process Tab */}
            {activePrepTab === "process" && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "20px", color: "#ffffff" }}>Recruitment Process & Rounds</h3>
                <div className="hiring-rounds-timeline" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {company.hiringProcess.rounds.map((round) => (
                    <div 
                      key={round.roundNum} 
                      className="round-card"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "10px",
                        padding: "16px 20px",
                        position: "relative"
                      }}
                    >
                      <span style={{ position: "absolute", left: "-15px", top: "18px", width: "30px", height: "30px", background: "var(--primary)", color: "#ffffff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContext: "center", fontWeight: "700", justifyContent: "center", fontSize: "0.85rem" }}>
                        {round.roundNum}
                      </span>
                      <div style={{ paddingLeft: "15px" }}>
                        <h4 style={{ margin: "0 0 10px 0", fontSize: "1.05rem", fontWeight: "700", color: "#ffffff" }}>{round.title}</h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {round.topics.map((topic, idx) => (
                            <span key={idx} className="topic-tag" style={{ fontSize: "0.78rem", background: "rgba(255,255,255,0.04)" }}>
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prep Materials Tab */}
            {activePrepTab === "questions" && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "20px", color: "#ffffff" }}>Company preparation assets</h3>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
                  
                  {/* Aptitude Card */}
                  <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                    <h4 style={{ color: "#60a5fa", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>🧠</span> Aptitude prep
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0 0 15px 0" }}>
                      Practice {company.stats.aptitude} previous year quantitative problems matching exam patterns.
                    </p>
                    <Link href={`/aptitude`} className="solve-btn" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                      Open Aptitude Portal
                    </Link>
                  </div>

                  {/* Coding Card */}
                  <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                    <h4 style={{ color: "#34d399", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>💻</span> Coding Practice
                    </h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0 0 15px 0" }}>
                      Solve {company.stats.coding} coding tasks ranging from Easy, Medium, to Hard in real-time compilers.
                    </p>
                    <Link href={`/coding`} className="solve-btn" style={{ padding: "6px 12px", fontSize: "0.8rem", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
                      Start Coding Sheet
                    </Link>
                  </div>

                </div>

                {/* Interview Questions list */}
                <h4 style={{ color: "#ffffff", fontWeight: "700", marginBottom: "15px" }}>Frequently Asked Interview Questions</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <strong style={{ color: "#a78bfa" }}>HR Question:</strong>
                    <p style={{ color: "#cbd5e1", fontSize: "0.88rem", margin: "5px 0 0 0" }}>"Why do you want to join {company.name} and how do you fit our culture?"</p>
                  </div>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <strong style={{ color: "#fb7185" }}>Technical Question:</strong>
                    <p style={{ color: "#cbd5e1", fontSize: "0.88rem", margin: "5px 0 0 0" }}>"How would you optimize database lookups and prevent concurrency conflicts?"</p>
                  </div>
                  <div style={{ padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                    <strong style={{ color: "#38bdf8" }}>Coding Challenge:</strong>
                    <p style={{ color: "#cbd5e1", fontSize: "0.88rem", margin: "5px 0 0 0" }}>"Given an array, find the maximum contiguous subarray sum (Kadane's Algorithm)."</p>
                  </div>
                </div>
              </div>
            )}

            {/* 30-Day Roadmap Tab */}
            {activePrepTab === "roadmap" && (
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "20px", color: "#ffffff" }}>{company.name} 30-Day Preparation Calendar</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {company.roadmap.map((item, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: "flex", 
                        gap: "15px", 
                        alignItems: "center",
                        padding: "15px", 
                        background: "rgba(255,255,255,0.02)", 
                        border: "1px solid rgba(255,255,255,0.05)", 
                        borderRadius: "8px" 
                      }}
                    >
                      <span style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8", fontWeight: "700", fontSize: "0.8rem", padding: "6px 12px", borderRadius: "6px", width: "90px", textAlign: "center" }}>
                        {item.days}
                      </span>
                      <span style={{ color: "#cbd5e1", fontSize: "0.92rem" }}>
                        {item.topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Side: Statistics & Checklist Dashboard */}
        <div className="profile-right-column" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* Stats Box */}
          <div style={{
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: "25px"
          }}>
            <h4 style={{ margin: "0 0 15px 0", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiTrendingUp style={{ color: "#10b981" }} />
              <span>Company Stats</span>
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Average CTC</span>
                <span style={{ color: "#ffffff", fontWeight: "700" }}>{company.stats.avgPackage}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Highest package</span>
                <span style={{ color: "#ffffff", fontWeight: "700" }}>{company.stats.highestPackage}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Selection rate</span>
                <span style={{ color: "#ffffff", fontWeight: "700" }}>{company.stats.selectionRate}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>Interview difficulty</span>
                <span style={{ color: "#fb7185", fontWeight: "700" }}>{company.stats.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Student Prep Checklist Dashboard */}
          <div style={{
            background: "rgba(255,255,255,0.01)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: "25px"
          }}>
            <h4 style={{ margin: "0 0 5px 0", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiCheckCircle style={{ color: "var(--primary)" }} />
              <span>Prep Progress</span>
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", margin: "0 0 15px 0" }}>Check off topics as you prepare to boost readiness.</p>

            {/* Progress bar */}
            <div style={{ margin: "15px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "5px" }}>
                <span>Readiness</span>
                <span>{progressPercent}%</span>
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px" }}>
                <div style={{ height: "100%", width: `${progressPercent}%`, background: "var(--primary-gradient)", borderRadius: "3px" }}></div>
              </div>
            </div>

            {/* Checklist items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Reviewed company eligibility criteria",
                "Completed quantitative aptitude syllabus",
                "Practiced key coding topics",
                "Studied OOPs, DBMS, SQL, and OS questions",
                "Mock HR interview questions review",
                "Read past year placement papers",
                "Optimized resume for this role",
                "Solved company prep mock test"
              ].map((step, idx) => {
                const checked = checkedSteps.includes(step);
                return (
                  <label 
                    key={idx} 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px", 
                      fontSize: "0.86rem", 
                      color: checked ? "#ffffff" : "var(--text-secondary)", 
                      cursor: "pointer" 
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={checked} 
                      onChange={() => toggleStep(step)}
                      style={{ accentColor: "var(--primary)" }}
                    />
                    <span>{step}</span>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
