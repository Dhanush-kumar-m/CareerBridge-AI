"use client";

import { useState, useEffect } from "react";
import {
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiCheckSquare,
  FiCode,
  FiFileText,
  FiMic,
  FiTrendingUp,
  FiBell,
  FiCpu,
  FiCalendar,
  FiSettings,
  FiDatabase,
  FiLock,
  FiDownload,
  FiPlus,
  FiTrash2,
  FiCheckCircle,
  FiAlertTriangle,
  FiUsers,
  FiPlay,
  FiRefreshCw
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for student list management
  const [students, setStudents] = useState([
    { id: 101, name: "Dhanush Kumar", email: "dhanush@gmail.com", dept: "CSE", solved: 245, accuracy: 85, ats: 88, status: "Active" },
    { id: 102, name: "Arun Kumar", email: "arun@gmail.com", dept: "CSE", solved: 180, accuracy: 78, ats: 82, status: "Active" },
    { id: 103, name: "Priya Sharma", email: "priya@gmail.com", dept: "ECE", solved: 210, accuracy: 82, ats: 85, status: "Active" },
    { id: 104, name: "Rahul Verma", email: "rahul@gmail.com", dept: "IT", solved: 140, accuracy: 72, ats: 75, status: "Suspended" }
  ]);

  // Form states for adding new student
  const [newStudent, setNewStudent] = useState({ name: "", email: "", dept: "", solved: 0, accuracy: 70, ats: 70 });
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for company list management
  const [companies, setCompanies] = useState([
    { name: "Google", category: "Product", eligibility: "8.5 CGPA", salary: "35 LPA", process: "3 Rounds" },
    { name: "Microsoft", category: "Product", eligibility: "8.0 CGPA", salary: "44 LPA", process: "4 Rounds" },
    { name: "Amazon", category: "Product", eligibility: "8.0 CGPA", salary: "32 LPA", process: "3 Rounds" },
    { name: "TCS", category: "Service", eligibility: "6.0 CGPA", salary: "3.6 - 7 LPA", process: "2 Rounds" },
    { name: "Zoho", category: "Product", eligibility: "No Cutoff", salary: "6.5 - 12 LPA", process: "4 Rounds" }
  ]);

  // Form states for adding new company
  const [newCompany, setNewCompany] = useState({ name: "", category: "Product", eligibility: "", salary: "", process: "" });
  const [showAddCompany, setShowAddCompany] = useState(false);

  // Mock data for coding problems list
  const [problems, setProblems] = useState([
    { title: "Two Sum", difficulty: "Easy", solvedCount: 1240, tags: "Arrays, Hash Table" },
    { title: "Reverse Linked List", difficulty: "Easy", solvedCount: 950, tags: "Linked List" },
    { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", solvedCount: 880, tags: "Sliding Window" },
    { title: "Edit Distance", difficulty: "Hard", solvedCount: 310, tags: "Dynamic Programming" }
  ]);

  // Student list controls
  const handleToggleStatus = (id) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === "Active" ? "Suspended" : "Active" };
      }
      return s;
    }));
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) return;
    const s = {
      id: Date.now(),
      ...newStudent,
      solved: Number(newStudent.solved),
      accuracy: Number(newStudent.accuracy),
      ats: Number(newStudent.ats),
      status: "Active"
    };
    setStudents(prev => [...prev, s]);
    setNewStudent({ name: "", email: "", dept: "", solved: 0, accuracy: 70, ats: 70 });
    setShowAddForm(false);
  };

  // Company list controls
  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    if (!newCompany.name) return;
    setCompanies(prev => [...prev, newCompany]);
    setNewCompany({ name: "", category: "Product", eligibility: "", salary: "", process: "" });
    setShowAddCompany(false);
  };

  const handleDeleteCompany = (name) => {
    setCompanies(prev => prev.filter(c => c.name !== name));
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Institutional Placement Report</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            h1 { color: #4f46e5; margin-bottom: 5px; }
            p { color: #666; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f3f4f6; color: #374151; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9fafb; }
          </style>
        </head>
        <body>
          <h1>CareerBridge AI - Institutional Placement Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Dept</th>
                <th>Solved</th>
                <th>Aptitude Acc.</th>
                <th>Resume ATS</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${students.map(s => `
                <tr>
                  <td>#${s.id}</td>
                  <td><b>${s.name}</b></td>
                  <td>${s.email}</td>
                  <td>${s.dept}</td>
                  <td>${s.solved} Qs</td>
                  <td>${s.accuracy}%</td>
                  <td>${s.ats}%</td>
                  <td>${s.status}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleExportExcel = () => {
    const headers = ["Candidate ID", "Name", "Email", "Dept", "Problems Solved", "Aptitude Accuracy", "Resume ATS", "Status"];
    const rows = students.map(s => [
      `#${s.id}`,
      s.name,
      s.email,
      s.dept,
      `${s.solved} Qs`,
      `${s.accuracy}%`,
      `${s.ats}%`,
      s.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Institutional_Placement_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", margin: 0, color: "#ffffff" }}>Enterprise Admin Console</h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Review institutional stats, manage students database, compiler limit configurations, and check audit security logs.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          <FiCalendar />
          <span>Last Sync: Today, 11:42 AM</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "5px" }}>
        <button onClick={() => setActiveTab("overview")} className={`tab-link ${activeTab === "overview" ? "active" : ""}`}>
          <FiTrendingUp />
          <span>Overview</span>
        </button>
        <button onClick={() => setActiveTab("students")} className={`tab-link ${activeTab === "students" ? "active" : ""}`}>
          <FiUsers />
          <span>Students</span>
        </button>
        <button onClick={() => setActiveTab("companies")} className={`tab-link ${activeTab === "companies" ? "active" : ""}`}>
          <FiBriefcase />
          <span>Companies & Coding</span>
        </button>
        <button onClick={() => setActiveTab("curriculum")} className={`tab-link ${activeTab === "curriculum" ? "active" : ""}`}>
          <FiBookOpen />
          <span>Aptitude & MCQs</span>
        </button>
        <button onClick={() => setActiveTab("resume")} className={`tab-link ${activeTab === "resume" ? "active" : ""}`}>
          <FiCpu />
          <span>AI & Resume Configs</span>
        </button>
        <button onClick={() => setActiveTab("security")} className={`tab-link ${activeTab === "security" ? "active" : ""}`}>
          <FiLock />
          <span>System Security</span>
        </button>
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Overview & System diagnostics */}
        {activeTab === "overview" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Quick stats grids */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Total Registered Students</span>
                <span className="stat-value">1,450 Candidates</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px", color: "#10b981" }}>Active: 1,220 | Suspended: 24</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Curriculum Bank Assets</span>
                <span className="stat-value">6,200 Qs</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px" }}>Coding Problems: 300+ | Aptitude: 5,200</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">Hiring Selection Rate</span>
                <span className="stat-value">82% Success</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px", color: "#6366f1" }}>Placements Package Average: 8.4 LPA</span>
              </div>
              <div className="stat-pill" style={{ padding: "20px" }}>
                <span className="stat-label">System Performance</span>
                <span className="stat-value">100% Online</span>
                <span className="stat-label" style={{ fontSize: "0.75rem", marginTop: "4px", color: "#10b981" }}>API Status: Active • Storage: 12%</span>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Quick Administrative Actions</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button onClick={() => { setActiveTab("students"); setShowAddForm(true); }} className="start-practice-badge-btn"><FiPlus /> Add Student</button>
                <button onClick={() => { setActiveTab("companies"); setShowAddCompany(true); }} className="start-practice-badge-btn" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}><FiPlus /> Add Company</button>
                <button className="start-practice-badge-btn" style={{ background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)" }}><FiPlus /> Add Coding Problem</button>
                <button className="start-practice-badge-btn" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff" }}><FiBell /> Push Announcement</button>
              </div>
            </div>

            {/* Exporter reports */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px" }}>
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }}>Institutional Reports downloads</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>Generate compiled academic excel sheets of placement eligibilities.</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={handleExportPDF} className="solve-btn" style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}><FiDownload /> <span>Export PDF</span></button>
                  <button onClick={handleExportExcel} className="solve-btn" style={{ display: "flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", cursor: "pointer" }}><FiDownload /> <span>Export Excel</span></button>
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }}>Server diagnostics status</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", fontFamily: "monospace" }}>
                  <div style={{ color: "#10b981" }}>✔ Web Gateway: Online (Port 3000)</div>
                  <div style={{ color: "#10b981" }}>✔ Relational Database schema: Connected</div>
                  <div style={{ color: "#a78bfa" }}>✦ API keys valid checks completed</div>
                </div>
              </div>
            </div>

          </section>
        )}

        {/* Tab 2: Student Management */}
        {activeTab === "students" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Add Student Toggle form */}
            {showAddForm && (
              <form onSubmit={handleAddStudentSubmit} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", padding: "24px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Register New Student Candidate</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={newStudent.name} 
                    onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={newStudent.email} 
                    onChange={e => setNewStudent({...newStudent, email: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <input 
                    type="text" 
                    placeholder="Dept (e.g. CSE)" 
                    value={newStudent.dept} 
                    onChange={e => setNewStudent({...newStudent, dept: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <input 
                    type="number" 
                    placeholder="Solved Problems" 
                    value={newStudent.solved} 
                    onChange={e => setNewStudent({...newStudent, solved: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="submit" className="solve-btn" style={{ padding: "8px 20px" }}>Submit Registration</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff", padding: "8px 20px" }}>Cancel</button>
                </div>
              </form>
            )}

            {/* Students list Table */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Registered Student Candidates</h3>
                {!showAddForm && (
                  <button onClick={() => setShowAddForm(true)} className="start-practice-badge-btn" style={{ padding: "6px 12px", fontSize: "0.82rem" }}><FiPlus /> Add New Student</button>
                )}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Candidate ID</th>
                      <th style={{ padding: "12px" }}>Name</th>
                      <th style={{ padding: "12px" }}>Dept</th>
                      <th style={{ padding: "12px" }}>Problems Solved</th>
                      <th style={{ padding: "12px" }}>Aptitude Acc.</th>
                      <th style={{ padding: "12px" }}>Resume ATS</th>
                      <th style={{ padding: "12px" }}>Status</th>
                      <th style={{ padding: "12px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>#{student.id}</td>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{student.name}</strong><br /><span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{student.email}</span></td>
                        <td style={{ padding: "12px" }}>{student.dept}</td>
                        <td style={{ padding: "12px", fontWeight: "700" }}>{student.solved} Qs</td>
                        <td style={{ padding: "12px", color: "#10b981", fontWeight: "700" }}>{student.accuracy}%</td>
                        <td style={{ padding: "12px", color: "#a78bfa", fontWeight: "700" }}>{student.ats}%</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            background: student.status === "Active" ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)",
                            color: student.status === "Active" ? "#10b981" : "#ef4444"
                          }}>{student.status}</span>
                        </td>
                        <td style={{ padding: "12px" }}>
                          <button onClick={() => handleToggleStatus(student.id)} style={{
                            background: "transparent",
                            border: "none",
                            color: student.status === "Active" ? "#f59e0b" : "#10b981",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "0.8rem"
                          }}>
                            {student.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* Tab 3: Companies & Coding management */}
        {activeTab === "companies" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Companies management */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Company Recruiter Lists</h3>
                {!showAddCompany && (
                  <button onClick={() => setShowAddCompany(true)} className="start-practice-badge-btn" style={{ padding: "6px 12px", fontSize: "0.82rem" }}><FiPlus /> Add Company</button>
                )}
              </div>

              {showAddCompany && (
                <form onSubmit={handleAddCompanySubmit} style={{ marginBottom: "15px", display: "flex", flexDirection: "column", gap: "10px", padding: "15px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={newCompany.name} 
                    onChange={e => setNewCompany({...newCompany, name: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }}
                  />
                  <input 
                    type="text" 
                    placeholder="Salary Package (e.g. 10 LPA)" 
                    value={newCompany.salary} 
                    onChange={e => setNewCompany({...newCompany, salary: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" className="solve-btn" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>Add</button>
                    <button type="button" onClick={() => setShowAddCompany(false)} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff", padding: "6px 14px", fontSize: "0.8rem" }}>Cancel</button>
                  </div>
                </form>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {companies.map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                    <div>
                      <strong style={{ color: "#ffffff", fontSize: "0.92rem" }}>{c.name}</strong>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginLeft: "10px" }}>({c.category} • {c.salary})</span>
                    </div>
                    <button onClick={() => handleDeleteCompany(c.name)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}><FiTrash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Coding Problems management */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Coding Challenges Arena</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {problems.map((p, idx) => (
                  <div key={idx} style={{ padding: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <strong style={{ color: "#ffffff", fontSize: "0.92rem" }}>{p.title}</strong>
                      <span style={{ 
                        fontSize: "0.75rem", 
                        padding: "2px 8px", 
                        borderRadius: "4px", 
                        fontWeight: "700",
                        background: p.difficulty === "Easy" ? "rgba(16, 185, 129, 0.12)" : p.difficulty === "Medium" ? "rgba(245, 158, 11, 0.12)" : "rgba(239, 68, 68, 0.12)",
                        color: p.difficulty === "Easy" ? "#10b981" : p.difficulty === "Medium" ? "#f59e0b" : "#ef4444"
                      }}>{p.difficulty}</span>
                    </div>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Tags: {p.tags}</span>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Tab 4: Curriculum (Aptitude & subjects) */}
        {activeTab === "curriculum" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Aptitude mock tests */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Quantitative / Logical Mock Tests</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { name: "TCS Quantitative Mock A", duration: "45 mins", status: "Published" },
                  { name: "Accenture Logical mock test", duration: "30 mins", status: "Published" },
                  { name: "Cognizant Verbal assessment", duration: "30 mins", status: "Draft" }
                ].map((test, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <div>
                      <strong style={{ color: "#ffffff", fontSize: "0.92rem", display: "block" }}>{test.name}</strong>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{test.duration}</span>
                    </div>
                    <span style={{
                      fontSize: "0.75rem",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: test.status === "Published" ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.08)",
                      color: test.status === "Published" ? "#10b981" : "var(--text-secondary)"
                    }}>{test.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core CS Subjects list */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>CS Subjects Technical MCQs</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
                {["Data Structures", "Algorithms", "DBMS", "SQL Queries", "Operating Systems", "Computer Networks", "OOP concepts", "Software Eng."].map((sub, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: "12px", 
                      background: "rgba(255,255,255,0.02)", 
                      border: "1px solid rgba(255,255,255,0.04)", 
                      borderRadius: "8px", 
                      textAlign: "center",
                      fontSize: "0.85rem",
                      color: "#ffffff"
                    }}
                  >
                    <strong>{sub}</strong>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Tab 5: AI & Resume Configs */}
        {activeTab === "resume" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* ATS parser rules */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>ATS Parser Rules Configuration</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>LinkedIn profile check weight</span>
                  <strong style={{ color: "#ffffff" }}>10%</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>GitHub link check weight</span>
                  <strong style={{ color: "#ffffff" }}>10%</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Minimum technical keywords count</span>
                  <strong style={{ color: "#ffffff" }}>5 keywords</strong>
                </div>
              </div>
            </div>

            {/* AI feedback templates */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>AI Assistant Prompts & Templates</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
                <div style={{ padding: "10px", background: "rgba(0,0,0,0.2)", borderRadius: "6px" }}>
                  <strong style={{ color: "#a78bfa" }}>System Prompt: Coding Guidance</strong>
                  <span style={{ display: "block", color: "var(--text-secondary)", marginTop: "4px", fontSize: "0.78rem" }}>Explain dynamic programming using simple matrix models.</span>
                </div>
                <div style={{ padding: "10px", background: "rgba(0,0,0,0.2)", borderRadius: "6px" }}>
                  <strong style={{ color: "#10b981" }}>System Prompt: Mock Interview feedback</strong>
                  <span style={{ display: "block", color: "var(--text-secondary)", marginTop: "4px", fontSize: "0.78rem" }}>Evaluate answer content correctness based on STAR method patterns.</span>
                </div>
              </div>
            </div>

          </section>
        )}

        {/* Tab 6: Logs & Security Settings */}
        {activeTab === "security" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "25px", alignItems: "start" }}>
            
            {/* Database controls */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.1rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                <FiDatabase style={{ color: "#fb7185" }} />
                <span>Database Administration Controls</span>
              </h3>
              <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", marginBottom: "20px" }}>Save daily platform states and restore backups from remote storage vaults.</p>
              
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="solve-btn" style={{ background: "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)" }}>Backup Database</button>
                <button className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff" }}>Restore State</button>
              </div>
            </div>

            {/* Audit Logs */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
                <FiSettings style={{ color: "var(--primary)" }} />
                <span>Audit & Security Logs</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.8rem", fontFamily: "monospace", color: "var(--text-secondary)" }}>
                <div>[11:40 AM] Super Admin updated Google hiring cutoff to 85%</div>
                <div>[10:15 AM] Faculty created mock test: TCS Quant Prep</div>
                <div>[09:30 AM] Database auto-backup complete: 42.4 MB</div>
              </div>
            </div>

          </section>
        )}

      </main>

      {/* Future features list */}
      <section style={{ maxWidth: "1000px", margin: "10px auto", padding: "0 20px" }}>
        <div style={{ background: "rgba(99, 102, 241, 0.03)", border: "1px dashed rgba(99, 102, 241, 0.2)", padding: "30px", borderRadius: "18px" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>
            <FiCpu style={{ color: "#818cf8" }} />
            <span>Future Platform Roadmap Preview (Admins)</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px", fontSize: "0.84rem", color: "var(--text-secondary)" }}>
            <div>✦ AI proctoring system integration</div>
            <div>✦ Recruiter & Alumni dashboards console</div>
            <div>✦ Campus placement drive management portal</div>
          </div>
        </div>
      </section>

    </div>
  );
}
