"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiTrendingUp,
  FiDownload,
  FiSearch,
  FiFilter,
  FiPlus,
  FiCheck,
  FiStar,
  FiActivity,
  FiCpu,
  FiBriefcase,
  FiMaximize,
  FiUser
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function AdminResumesPage() {
  const [activeTab, setActiveTab] = useState("queue");
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [companyEvaluatorKey, setCompanyEvaluatorKey] = useState("google");

  // Mock resume queue (covering all requested fields)
  const [resumes, setResumes] = useState([
    {
      id: 501,
      name: "Dhanush Kumar",
      regNo: "SRM202201",
      dept: "CSE",
      year: "4th Year",
      version: "v2.1",
      uploadDate: "2026-06-28",
      ats: 88,
      status: "Pending Review",
      reviewer: "Faculty Admin",
      email: "dhanush@gmail.com",
      phone: "+91 8637431104",
      cgpa: 8.0,
      skills: ["Java", "React", "SQL", "Git"],
      projectTitle: "AI Resume Scanner & Placement Audit engine",
      projectTech: "React, Next.js, Node.js, Python",
      github: "https://github.com/dhanush",
      linkedin: "https://linkedin.com/in/dhanush"
    },
    {
      id: 502,
      name: "Arun Kumar",
      regNo: "SRM202202",
      dept: "CSE",
      year: "4th Year",
      version: "v1.0",
      uploadDate: "2026-06-27",
      ats: 82,
      status: "Approved",
      reviewer: "Faculty Admin",
      email: "arun@gmail.com",
      phone: "+91 8637431105",
      cgpa: 7.8,
      skills: ["Python", "React", "MongoDB"],
      projectTitle: "E-Commerce sales analytics platform",
      projectTech: "React, Express, MongoDB",
      github: "https://github.com/arun",
      linkedin: "https://linkedin.com/in/arun"
    },
    {
      id: 503,
      name: "Priya Sharma",
      regNo: "SRM202203",
      dept: "ECE",
      year: "3rd Year",
      version: "v1.2",
      uploadDate: "2026-06-25",
      ats: 85,
      status: "Changes Requested",
      reviewer: "Unassigned",
      email: "priya@gmail.com",
      phone: "+91 8637431106",
      cgpa: 8.2,
      skills: ["C++", "SQL", "Git"],
      projectTitle: "Microcontroller temperature monitor logs",
      projectTech: "C++, Arduino, SQL",
      github: "https://github.com/priya",
      linkedin: "https://linkedin.com/in/priya"
    }
  ]);

  const companyRequirements = {
    google: { name: "Google", match: 82, missing: "Algorithms, Distributed Systems" },
    microsoft: { name: "Microsoft", match: 78, missing: "C++, Concurrency" },
    amazon: { name: "Amazon", match: 80, missing: "AWS, Node.js" },
    zoho: { name: "Zoho", match: 90, missing: "None (Fully Matched)" },
    tcs: { name: "TCS", match: 95, missing: "None" }
  };

  const handleDecision = (id, nextStatus) => {
    setResumes(prev => prev.map(r => {
      if (r.id === id) {
        if (selectedReview && selectedReview.id === id) {
          setSelectedReview({ ...selectedReview, status: nextStatus });
        }
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const handleCSVExport = () => {
    const headers = ["Student Name", "Register No", "Dept", "Version", "Upload Date", "ATS Score", "Review Status"];
    const rows = resumes.map(r => [
      r.name, r.regNo, r.dept, r.version, r.uploadDate, `${r.ats}%`, r.status
    ]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume_review_records.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResumes = resumes.filter(r => {
    const matchQuery = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.regNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "All" || r.status === filterStatus;
    return matchQuery && matchStatus;
  });

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
            <FiFileText style={{ color: "var(--primary)" }} />
            <span>Resume Review Console</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Review candidate resume formatting compliance, verify contact handles, and approve CVs.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleCSVExport} className="start-practice-badge-btn" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FiDownload />
            <span>Export Review Logs</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Total Resumes</span>
          <span className="stat-value">870 Uploads</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Approved Resumes</span>
          <span className="stat-value">645 Approved</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Pending Reviews</span>
          <span className="stat-value">225 Pending</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Avg ATS Score</span>
          <span className="stat-value">78% Rating</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "5px" }}>
        <button onClick={() => setActiveTab("queue")} className={`tab-link ${activeTab === "queue" ? "active" : ""}`}>
          <FiFileText />
          <span>Resume Review Queue</span>
        </button>
        {selectedReview && (
          <button onClick={() => setActiveTab("workspace")} className={`tab-link ${activeTab === "workspace" ? "active" : ""}`}>
            <FiCpu />
            <span>Workspace: {selectedReview.name}</span>
          </button>
        )}
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Review Queue */}
        {activeTab === "queue" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Search & Filters */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", padding: "12px 18px", borderRadius: "10px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flex: 1, minWidth: "260px" }}>
                <FiSearch style={{ color: "var(--text-secondary)" }} />
                <input 
                  type="text" 
                  placeholder="Search by student name, register number..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ background: "transparent", border: "none", color: "#ffffff", fontSize: "0.85rem", width: "100%", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}>
                <FiFilter style={{ color: "var(--text-secondary)" }} />
                <span style={{ color: "var(--text-secondary)" }}>Status:</span>
                <select 
                  value={filterStatus} 
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.85rem" }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Changes Requested">Changes Requested</option>
                </select>
              </div>
            </div>

            {/* Visual Charts Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "25px", marginBottom: "5px" }}>
              {/* Chart 1: Average ATS Score by Department */}
              <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Average ATS Score by Department</h3>
                <div style={{ width: "100%", height: 200 }}>
                  <ResponsiveContainer>
                    <BarChart data={[
                      { name: "CSE", score: 82 },
                      { name: "IT", score: 75 },
                      { name: "ECE", score: 80 },
                      { name: "EEE", score: 68 },
                      { name: "Mech", score: 62 }
                    ]} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                      <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                      <Tooltip />
                      <Bar name="Avg ATS Score %" dataKey="score" fill="#6366f1" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Resume Status Distribution */}
              <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Resume Status Distribution</h3>
                <div style={{ width: "100%", height: 200, display: "flex", justifyContent: "center" }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Approved", value: 645 },
                          { name: "Pending Review", value: 225 },
                          { name: "Changes Req.", value: 85 }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          { name: "Approved", value: 645 },
                          { name: "Pending Review", value: 225 },
                          { name: "Changes Req.", value: 85 }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "0.78rem" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* List Table */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Student Name</th>
                      <th style={{ padding: "12px" }}>Register No</th>
                      <th style={{ padding: "12px" }}>Dept</th>
                      <th style={{ padding: "12px" }}>Version</th>
                      <th style={{ padding: "12px" }}>Upload Date</th>
                      <th style={{ padding: "12px" }}>ATS Score</th>
                      <th style={{ padding: "12px" }}>Status</th>
                      <th style={{ padding: "12px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResumes.map((r) => (
                      <tr key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{r.name}</strong></td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{r.regNo}</td>
                        <td style={{ padding: "12px" }}>{r.dept}</td>
                        <td style={{ padding: "12px" }}>{r.version}</td>
                        <td style={{ padding: "12px" }}>{r.uploadDate}</td>
                        <td style={{ padding: "12px", color: "#a78bfa", fontWeight: "700" }}>{r.ats}%</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            background: r.status === "Approved" ? "rgba(16, 185, 129, 0.12)" : r.status === "Pending Review" ? "rgba(245, 158, 11, 0.12)" : "rgba(239, 68, 68, 0.12)",
                            color: r.status === "Approved" ? "#10b981" : r.status === "Pending Review" ? "#f59e0b" : "#ef4444",
                            fontWeight: "700"
                          }}>{r.status}</span>
                        </td>
                        <td style={{ padding: "12px" }}>
                          <button 
                            onClick={() => { setSelectedReview(r); setActiveTab("workspace"); }} 
                            style={{ background: "transparent", border: "none", color: "#60a5fa", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: "700" }}
                          >
                            <FiMaximize size={14} /> Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Interactive Reviewer Workspace */}
        {activeTab === "workspace" && selectedReview && (
          <div className="fade-in" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: "25px", alignItems: "start" }}>
            
            {/* Left Column: Student Details & parsed CV text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* Profile Card */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiUser style={{ color: "#6366f1" }} />
                  <span>Student Details</span>
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.86rem" }}>
                  <div>Name: <strong>{selectedReview.name}</strong></div>
                  <div>Register No: <strong>{selectedReview.regNo}</strong></div>
                  <div>Email: <strong style={{ textTransform: "none" }}>{selectedReview.email}</strong></div>
                  <div>Phone: <strong>{selectedReview.phone}</strong></div>
                  <div>CGPA: <strong>{selectedReview.cgpa}</strong></div>
                  <div>Dept: <strong>{selectedReview.dept}</strong></div>
                </div>
              </div>

              {/* Company Readiness Card */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <FiBriefcase style={{ color: "#f59e0b" }} />
                  <span>Company Eligibility Audit</span>
                </h3>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Verify Recruiter:</span>
                  <select 
                    value={companyEvaluatorKey} 
                    onChange={e => setCompanyEvaluatorKey(e.target.value)}
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.85rem" }}
                  >
                    {Object.keys(companyRequirements).map(k => <option key={k} value={k}>{companyRequirements[k].name}</option>)}
                  </select>
                </div>
                <div style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", fontSize: "0.86rem" }}>
                  <div>Target Match Rating: <strong>{companyRequirements[companyEvaluatorKey].match}%</strong></div>
                  <div style={{ marginTop: "4px" }}>Missing Skills: <strong style={{ color: "#f87171" }}>{companyRequirements[companyEvaluatorKey].missing}</strong></div>
                </div>
              </div>

            </div>

            {/* Right Column: Compliance Checklist & Decision Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              
              {/* Compliance Checklist */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Section Compliance Review</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
                  {[
                    { label: "Contact Details (Email & Phone)", status: "Complete" },
                    { label: "LinkedIn & GitHub handles linked", status: "Complete" },
                    { label: "Professional Summary Clarity", status: "Needs Improvement" },
                    { label: "Education Records (CGPA & Semesters)", status: "Complete" },
                    { label: "Projects (Min 2 projects listed)", status: "Complete" }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span>{item.label}</span>
                      <span style={{
                        fontSize: "0.75rem",
                        color: item.status === "Complete" ? "#10b981" : "#f59e0b",
                        fontWeight: "700"
                      }}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Form & Decisions */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Administrative Decision Panel</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div>
                    <label style={{ fontSize: "0.82rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Strengths</label>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {["Strong tech skills", "Good structure", "Clean layout"].map(s => (
                        <span key={s} style={{ fontSize: "0.78rem", background: "rgba(16, 185, 129, 0.12)", color: "#10b981", padding: "4px 10px", borderRadius: "20px" }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.82rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>Areas to Improve</label>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {["Add GitHub link", "Expand summary", "Add Cloud tools"].map(a => (
                        <span key={a} style={{ fontSize: "0.78rem", background: "rgba(239, 68, 68, 0.12)", color: "#ef4444", padding: "4px 10px", borderRadius: "20px" }}>{a}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "15px", marginTop: "10px" }}>
                    <button onClick={() => handleDecision(selectedReview.id, "Approved")} className="solve-btn" style={{ flex: 1, background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#ffffff" }}>Approve Resume</button>
                    <button onClick={() => handleDecision(selectedReview.id, "Changes Requested")} className="solve-btn" style={{ flex: 1, background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }}>Request Changes</button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
