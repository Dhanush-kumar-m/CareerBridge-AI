"use client";

import { useState, useMemo, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
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
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiCode,
  FiFileText,
  FiMic,
  FiTrendingUp,
  FiCheckCircle,
  FiAlertTriangle,
  FiSettings,
  FiTrash2,
  FiEdit,
  FiEye,
  FiSearch,
  FiFilter,
  FiArrowRight,
  FiPlus,
  FiDownload,
  FiLock,
  FiActivity,
  FiMail,
  FiInbox,
  FiUsers,
  FiGrid
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Mock data for student list (covering all requested fields)
  const [students, setStudents] = useState([
    {
      id: 101,
      name: "Dhanush Kumar",
      regNo: "SRM202201",
      email: "dhanush@gmail.com",
      phone: "+91 8637431104",
      dept: "CSE",
      year: "4th Year",
      section: "A",
      cgpa: 8.0,
      placementStatus: "Placement Ready",
      accountStatus: "Active",
      lastLogin: "Today, 10:45 AM",
      backlogs: 0,
      skills: ["Java", "React", "SQL", "Git"],
      projectTitle: "AI Resume Scanner & Placement Audit engine",
      projectTech: "React, Next.js, Node.js, Python",
      ats: 88,
      solved: 245,
      aptitudeSolved: 520,
      interviewScore: 82,
      hours: 45
    },
    {
      id: 102,
      name: "Arun Kumar",
      regNo: "SRM202202",
      email: "arun@gmail.com",
      phone: "+91 8637431105",
      dept: "CSE",
      year: "4th Year",
      section: "A",
      cgpa: 7.8,
      placementStatus: "Intermediate",
      accountStatus: "Active",
      lastLogin: "Yesterday, 2:15 PM",
      backlogs: 0,
      skills: ["Python", "React", "MongoDB"],
      projectTitle: "E-Commerce sales analytics platform",
      projectTech: "React, Express, MongoDB",
      ats: 82,
      solved: 180,
      aptitudeSolved: 420,
      interviewScore: 78,
      hours: 32
    },
    {
      id: 103,
      name: "Priya Sharma",
      regNo: "SRM202203",
      email: "priya@gmail.com",
      phone: "+91 8637431106",
      dept: "ECE",
      year: "3rd Year",
      section: "B",
      cgpa: 8.2,
      placementStatus: "Advanced",
      accountStatus: "Active",
      lastLogin: "2 days ago",
      backlogs: 0,
      skills: ["C++", "SQL", "Git"],
      projectTitle: "Microcontroller temperature monitor logs",
      projectTech: "C++, Arduino, SQL",
      ats: 85,
      solved: 210,
      aptitudeSolved: 480,
      interviewScore: 80,
      hours: 38
    },
    {
      id: 104,
      name: "Rahul Verma",
      regNo: "SRM202204",
      email: "rahul@gmail.com",
      phone: "+91 8637431107",
      dept: "IT",
      year: "4th Year",
      section: "A",
      cgpa: 7.2,
      placementStatus: "Beginner",
      accountStatus: "Suspended",
      lastLogin: "1 week ago",
      backlogs: 2,
      skills: ["Java", "HTML", "CSS"],
      projectTitle: "Local Library database tool",
      projectTech: "Java, MySQL",
      ats: 75,
      solved: 140,
      aptitudeSolved: 310,
      interviewScore: 72,
      hours: 20
    }
  ]);

  // Load dynamic students from Supabase and merge them
  useEffect(() => {
    async function loadStudents() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*");
        if (!error && data) {
          const dbStudents = data
            .filter(p => p.role !== "admin")
            .map(p => ({
              id: p.id,
              name: p.display_name || "New Student",
              regNo: p.email ? p.email.split("@")[0].toUpperCase() : "N/A",
              email: p.email || "No Email",
              passwordPlain: p.password_plain || "", // Store plain text password
              phone: "N/A",
              dept: "CSE",
              year: "4th Year",
              section: "A",
              cgpa: 0.0,
              placementStatus: "Beginner",
              accountStatus: "Active",
              lastLogin: "N/A",
              backlogs: 0,
              skills: [],
              projectTitle: "N/A",
              projectTech: "N/A",
              ats: 0,
              solved: 0,
              aptitudeSolved: 0,
              interviewScore: 0,
              hours: 0
            }));

          setStudents(prev => {
            const merged = [...prev];
            dbStudents.forEach(dbS => {
              const existsIdx = merged.findIndex(m => String(m.email).toLowerCase() === String(dbS.email).toLowerCase());
              if (existsIdx !== -1) {
                // If student exists in mock data but doesn't have the password, update it
                merged[existsIdx] = { ...merged[existsIdx], id: dbS.id, passwordPlain: dbS.passwordPlain };
              } else {
                merged.push(dbS);
              }
            });
            return merged;
          });
        }
      } catch (e) {
        console.error("Failed to load DB students:", e);
      }
    }
    loadStudents();
  }, []);

  // Filter and search computation
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.dept.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = filterDept === "All" || student.dept === filterDept;
      const matchesStatus = filterStatus === "All" || student.placementStatus === filterStatus || student.accountStatus === filterStatus;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [students, searchQuery, filterDept, filterStatus]);

  // Compute status ratios dynamically for current filtered subset
  const statusCounts = useMemo(() => {
    const counts = { "Placement Ready": 0, "Advanced": 0, "Intermediate": 0, "Beginner": 0 };
    filteredStudents.forEach(s => {
      if (counts[s.placementStatus] !== undefined) {
        counts[s.placementStatus]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).filter(item => item.value > 0);
  }, [filteredStudents]);

  // Account modification actions
  const handleToggleSuspend = (id) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.accountStatus === "Active" ? "Suspended" : "Active";
        if (selectedStudent && selectedStudent.id === id) {
          setSelectedStudent({ ...selectedStudent, accountStatus: nextStatus });
        }
        return { ...s, accountStatus: nextStatus };
      }
      return s;
    }));
  };

  const handleDeleteStudent = (id) => {
    if (confirm("Are you sure you want to delete this student record?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null);
      }
    }
  };

  const handleResetPassword = (name) => {
    alert(`Password reset link dispatched for student: ${name}`);
  };

  // Export records CSV
  const handleCSVExport = () => {
    const headers = ["ID", "Name", "Reg No", "Email", "Dept", "CGPA", "ATS Score", "Coding Solved", "Placement Readiness"];
    const rows = filteredStudents.map(s => [
      s.id, s.name, s.regNo, s.email, s.dept, s.cgpa, `${s.ats}%`, s.solved, s.placementStatus
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `CareerBridge_Student_Report.csv`);
    link.style.display = "none";
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
          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", margin: 0, color: "#ffffff", display: "flex", alignItems: "center", gap: "10px" }}>
            <FiUsers style={{ color: "var(--primary)" }} />
            <span>Student Management Console</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Monitor academic parameters, CGPA index, coding streak stats, and push placement alerts.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleCSVExport} className="start-practice-badge-btn" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FiDownload />
            <span>Export Data Report</span>
          </button>
        </div>
      </div>

      {/* Quick stats indicators */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Total Candidates</span>
          <span className="stat-value">1,450 Students</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Placement Ready</span>
          <span className="stat-value">380 Students</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Average ATS Score</span>
          <span className="stat-value">82% Rating</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Suspended Accounts</span>
          <span className="stat-value">24 Accounts</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
        background: "rgba(255,255,255,0.01)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "16px 20px",
        borderRadius: "12px"
      }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", flex: 1, minWidth: "260px" }}>
          <FiSearch style={{ color: "var(--text-secondary)" }} />
          <input 
            type="text" 
            placeholder="Search student by name, register number, email..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: "0.9rem",
              width: "100%",
              outline: "none"
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}>
            <FiFilter style={{ color: "var(--text-secondary)" }} />
            <span style={{ color: "var(--text-secondary)" }}>Dept:</span>
            <select 
              value={filterDept} 
              onChange={e => setFilterDept(e.target.value)}
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.85rem" }}
            >
              <option value="All">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}>
            <span style={{ color: "var(--text-secondary)" }}>Status:</span>
            <select 
              value={filterStatus} 
              onChange={e => setFilterStatus(e.target.value)}
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "4px 10px", borderRadius: "6px", fontSize: "0.85rem" }}
            >
              <option value="All">All Statuses</option>
              <option value="Placement Ready">Placement Ready</option>
              <option value="Advanced">Advanced</option>
              <option value="Active">Active Accounts</option>
              <option value="Suspended">Suspended Accounts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "25px", marginBottom: "5px" }}>
        {/* Chart 1: Active Candidates Performance */}
        <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Filtered Candidates Performance Metrics</h3>
          {filteredStudents.length > 0 ? (
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <BarChart data={filteredStudents.map(s => ({ name: s.name, CGPA: s.cgpa, "Coding Solved": s.solved }))} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                  <Tooltip />
                  <Bar name="Coding Solved" dataKey="Coding Solved" fill="#6366f1" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ height: 200, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--text-secondary)" }}>No data matching filters.</div>
          )}
        </div>

        {/* Chart 2: Status counts */}
        <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Filtered Readiness distribution</h3>
          {statusCounts.length > 0 ? (
            <div style={{ width: "100%", height: 200, display: "flex", justifyContent: "center" }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusCounts}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "0.78rem" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ height: 200, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--text-secondary)" }}>No status counts available.</div>
          )}
        </div>
      </div>

      {/* Main Grid: Student Table & Detail Panel */}
      <div style={{ display: "grid", gridTemplateColumns: selectedStudent ? "1.4fr 1.6fr" : "1fr", gap: "25px", alignItems: "start" }}>
        
        {/* Table list */}
        <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
          <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: "0 0 15px 0" }}>Student Candidate Logs</h3>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                  <th style={{ padding: "12px" }}>ID</th>
                  <th style={{ padding: "12px" }}>Name / Reg</th>
                  <th style={{ padding: "12px" }}>Dept</th>
                  <th style={{ padding: "12px" }}>CGPA</th>
                  <th style={{ padding: "12px" }}>Readiness</th>
                  <th style={{ padding: "12px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>#{s.id}</td>
                    <td style={{ padding: "12px" }}>
                      <strong style={{ color: "#ffffff" }}>{s.name}</strong><br />
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{s.regNo}</span>
                    </td>
                    <td style={{ padding: "12px" }}>{s.dept}</td>
                    <td style={{ padding: "12px", fontWeight: "700" }}>{s.cgpa}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                        background: s.placementStatus === "Placement Ready" ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                        color: s.placementStatus === "Placement Ready" ? "#10b981" : "#f59e0b",
                        fontWeight: "700"
                      }}>{s.placementStatus}</span>
                    </td>
                    <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                      <button onClick={() => setSelectedStudent(s)} style={{ background: "transparent", border: "none", color: "#60a5fa", cursor: "pointer" }} title="View Profile Details"><FiEye size={16} /></button>
                      <button onClick={() => handleToggleSuspend(s.id)} style={{ background: "transparent", border: "none", color: s.accountStatus === "Active" ? "#fbbf24" : "#10b981", cursor: "pointer" }} title={s.accountStatus === "Active" ? "Suspend Account" : "Activate Account"}><FiLock size={16} /></button>
                      <button onClick={() => handleDeleteStudent(s.id)} style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }} title="Delete Record"><FiTrash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: "20px", textAlign: "center", color: "var(--text-secondary)" }}>No matching student records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile detail panel */}
        {selectedStudent && (
          <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px", marginBottom: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: "800", margin: 0 }}>Candidate Profile Overview</h3>
              <button onClick={() => setSelectedStudent(null)} style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontWeight: "bold" }}>✕</button>
            </div>

            {/* Profile info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* Personal Details */}
              <div>
                <strong style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>Personal details</strong>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.86rem", background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "8px" }}>
                  <div>Name: <strong>{selectedStudent.name}</strong></div>
                  <div>Register No: <strong>{selectedStudent.regNo}</strong></div>
                  <div>Email: <strong style={{ textTransform: "none" }}>{selectedStudent.email}</strong></div>
                  <div>Phone: <strong>{selectedStudent.phone}</strong></div>
                  {selectedStudent.passwordPlain && (
                    <div style={{ gridColumn: "span 2", marginTop: "4px" }}>
                      Password: <strong style={{ textTransform: "none", color: "#fb7185" }}>{selectedStudent.passwordPlain}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Academic Details */}
              <div>
                <strong style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>Academic metrics</strong>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.86rem", background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "8px" }}>
                  <div>Department: <strong>{selectedStudent.dept}</strong></div>
                  <div>Year: <strong>{selectedStudent.year} (Sem 7)</strong></div>
                  <div>CGPA Rating: <strong>{selectedStudent.cgpa}</strong></div>
                  <div>Backlogs: <strong style={{ color: selectedStudent.backlogs > 0 ? "#ef4444" : "#10b981" }}>{selectedStudent.backlogs}</strong></div>
                </div>
              </div>

              {/* Skills inventory */}
              <div>
                <strong style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>Skills Inventory</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedStudent.skills.map((s) => (
                    <span key={s} style={{ fontSize: "0.78rem", background: "rgba(99, 102, 241, 0.12)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.2)", padding: "2px 8px", borderRadius: "4px" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects details */}
              <div>
                <strong style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>Projects & Coding</strong>
                <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", fontSize: "0.86rem" }}>
                  <div>Title: <strong>{selectedStudent.projectTitle}</strong></div>
                  <div style={{ marginTop: "6px" }}>Stack: <strong style={{ color: "#a78bfa" }}>{selectedStudent.projectTech}</strong></div>
                </div>
              </div>

              {/* Performance diagnostics */}
              <div>
                <strong style={{ display: "block", fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>Placement Progress Diagnostics</strong>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.86rem" }}>
                  <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>Coding Solved</span>
                    <strong style={{ fontSize: "1.15rem", color: "#10b981" }}>{selectedStudent.solved} Qs</strong>
                  </div>
                  <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>Resume ATS Score</span>
                    <strong style={{ fontSize: "1.15rem", color: "#a78bfa" }}>{selectedStudent.ats}%</strong>
                  </div>
                  <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>Aptitude Solved</span>
                    <strong style={{ fontSize: "1.15rem", color: "#6366f1" }}>{selectedStudent.aptitudeSolved} Qs</strong>
                  </div>
                  <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>Mock Interview Score</span>
                    <strong style={{ fontSize: "1.15rem", color: "#fb7185" }}>{selectedStudent.interviewScore}%</strong>
                  </div>
                </div>
              </div>

              {/* Account management buttons */}
              <div style={{ display: "flex", gap: "10px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "15px", marginTop: "10px" }}>
                <button onClick={() => handleToggleSuspend(selectedStudent.id)} className="solve-btn" style={{ background: selectedStudent.accountStatus === "Active" ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)", color: selectedStudent.accountStatus === "Active" ? "#fbbf24" : "#10b981", border: `1px solid ${selectedStudent.accountStatus === "Active" ? "rgba(245,158,11,0.3)" : "rgba(16,185,129,0.3)"}` }}>
                  {selectedStudent.accountStatus === "Active" ? "Suspend Account" : "Activate Account"}
                </button>
                <button onClick={() => handleResetPassword(selectedStudent.name)} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Reset Password
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
