"use client";

import { useState, useMemo } from "react";
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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import {
  FiFileText,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiEye,
  FiDownload,
  FiCheckCircle,
  FiUsers,
  FiBookOpen,
  FiCode,
  FiCpu,
  FiSettings,
  FiActivity,
  FiClock,
  FiPlay,
  FiArrowRight,
  FiCheck,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiFilter,
  FiMail,
  FiInbox,
  FiBriefcase,
  FiSearch
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");

  // Custom Report Builder Form State
  const [customFilter, setCustomFilter] = useState({
    dept: "CSE",
    batch: "2026",
    company: "Google",
    cgpaMin: "8.0",
    language: "Java",
    skill: "React"
  });

  // Scheduled Reports List State
  const [schedules, setSchedules] = useState([
    { id: 1, name: "Daily Activity Recap", frequency: "Daily (8:00 PM)", recipients: "faculty@college.edu", format: "PDF", status: "Active" },
    { id: 2, name: "Weekly Placement Drive Summary", frequency: "Weekly (Mondays)", recipients: "officer@college.edu", format: "Excel", status: "Active" },
    { id: 3, name: "Monthly Selection Report", frequency: "Monthly (1st)", recipients: "recruiters@partner.com", format: "CSV", status: "Active" }
  ]);
  const [newSchedule, setNewSchedule] = useState({ name: "", frequency: "Weekly", recipients: "", format: "PDF" });
  const [showAddSchedule, setShowAddSchedule] = useState(false);

  // ==========================================
  // DATASETS (Fulfills all report requirements)
  // ==========================================

  // Student Performance Report Data
  const studentPerformance = [
    { name: "Dhanush Kumar", regNo: "SRM202201", dept: "CSE", year: "4th Year", cgpa: 8.0, readiness: "Placement Ready", attendance: "95%", lastLogin: "Today, 10:45 AM", codingSolved: 245, aptitudeSolved: 520, interviewScore: 82, resumeATS: 88, companyPrep: "Google, TCS" },
    { name: "Arun Kumar", regNo: "SRM202202", dept: "CSE", year: "4th Year", cgpa: 7.8, readiness: "Intermediate", attendance: "88%", lastLogin: "Yesterday, 2:15 PM", codingSolved: 180, aptitudeSolved: 420, interviewScore: 78, resumeATS: 82, companyPrep: "Zoho, Infosys" },
    { name: "Priya Sharma", regNo: "SRM202203", dept: "ECE", year: "3rd Year", cgpa: 8.2, readiness: "Advanced", attendance: "92%", lastLogin: "2 days ago", codingSolved: 210, aptitudeSolved: 480, interviewScore: 80, resumeATS: 85, companyPrep: "Microsoft" },
    { name: "Rahul Verma", regNo: "SRM202204", dept: "IT", year: "4th Year", cgpa: 7.2, readiness: "Beginner", attendance: "74%", lastLogin: "1 week ago", codingSolved: 140, aptitudeSolved: 310, interviewScore: 72, resumeATS: 75, companyPrep: "Accenture" }
  ];

  // Coding Performance & Language Stats
  const codingLanguageUsage = [
    { name: "Java", solved: 1450, accuracy: 82 },
    { name: "Python", solved: 1280, accuracy: 78 },
    { name: "C++", solved: 620, accuracy: 85 },
    { name: "C", solved: 480, accuracy: 70 },
    { name: "JavaScript", solved: 550, accuracy: 80 }
  ];

  // Aptitude performance
  const aptitudeTopics = [
    { name: "Number System", accuracy: 88, attempts: 2400 },
    { name: "Percentage", accuracy: 85, attempts: 1800 },
    { name: "Time & Distance", accuracy: 72, attempts: 1500 },
    { name: "Data Interpretation", accuracy: 80, attempts: 1200 },
    { name: "Logical Syllogisms", accuracy: 78, attempts: 1100 }
  ];

  // Subject wise Analytics
  const subjectAnalytics = [
    { name: "Data Structures", progress: 82, accuracy: 85 },
    { name: "Algorithms", progress: 75, accuracy: 78 },
    { name: "DBMS", progress: 90, accuracy: 92 },
    { name: "Operating Systems", progress: 68, accuracy: 70 },
    { name: "Computer Networks", progress: 65, accuracy: 68 },
    { name: "OOP Concepts", progress: 85, accuracy: 88 }
  ];

  // Placements Summary & Department Success
  const deptPlacementData = [
    { dept: "CSE", eligible: 180, applied: 160, selected: 120, rate: 75 },
    { dept: "IT", eligible: 120, applied: 100, selected: 75, rate: 75 },
    { dept: "ECE", eligible: 140, applied: 110, selected: 65, rate: 59 },
    { dept: "EEE", eligible: 100, applied: 80, selected: 42, rate: 52 },
    { dept: "Mech", eligible: 150, applied: 90, selected: 35, rate: 38 },
    { dept: "Civil", eligible: 80, applied: 40, selected: 10, rate: 25 }
  ];

  // Placed Company Analytics
  const companyPlacements = [
    { company: "Google", applicants: 420, selected: 8, avgPackage: "35 LPA" },
    { company: "Microsoft", applicants: 380, selected: 6, avgPackage: "44 LPA" },
    { company: "Amazon", applicants: 510, selected: 12, avgPackage: "32 LPA" },
    { company: "TCS", applicants: 920, selected: 45, avgPackage: "4.5 LPA" },
    { company: "Zoho", applicants: 310, selected: 24, avgPackage: "7.2 LPA" }
  ];

  // Platform Analytics (DAU/WAU/MAU)
  const platformUsage = [
    { day: "Mon", dau: 320, sessions: 450 },
    { day: "Tue", dau: 410, sessions: 580 },
    { day: "Wed", dau: 380, sessions: 520 },
    { day: "Thu", dau: 450, sessions: 690 },
    { day: "Fri", dau: 480, sessions: 710 },
    { day: "Sat", dau: 290, sessions: 380 },
    { day: "Sun", dau: 220, sessions: 310 }
  ];

  // Financial Revenue logs
  const financialRevenue = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 25000 },
    { month: "Jun", revenue: 31000 }
  ];

  // Mock contest winner registry
  const contestWinners = [
    { name: "Contest A", solved: 5, time: "42 mins", winner: "Dhanush Kumar" },
    { name: "Contest B", solved: 5, time: "48 mins", winner: "Priya Sharma" },
    { name: "Contest C", solved: 4, time: "38 mins", winner: "Arun Kumar" }
  ];

  // Filters logic
  const filteredStudents = useMemo(() => {
    return studentPerformance.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.regNo.includes(searchQuery);
      const matchDept = filterDept === "All" || s.dept === filterDept;
      return matchSearch && matchDept;
    });
  }, [searchQuery, filterDept]);

  // Actions
  const handleExportReport = (format) => {
    let title = `${activeTab.toUpperCase()}_REPORT`;
    let headers = [];
    let rows = [];
    let jsonData = [];
    
    if (activeTab === "overview") {
      headers = ["Metric", "Value"];
      rows = [
        ["Total Reports Compiled", "34 Reports"],
        ["Daily Active Users (DAU)", "420 Active"],
        ["Weekly Active Users (WAU)", "1,150 Active"],
        ["System Performance", "100% Online"]
      ];
      jsonData = { title, metrics: rows };
    } else if (activeTab === "students") {
      headers = ["Student Name", "Register No", "Dept", "CGPA", "Readiness", "Attendance", "Coding Solved", "Aptitude Solved", "ATS Resume", "Hiring Target"];
      rows = filteredStudents.map(s => [
        s.name, s.regNo, s.dept, s.cgpa, s.readiness, s.attendance, `${s.codingSolved} Qs`, `${s.aptitudeSolved} Qs`, `${s.resumeATS}%`, s.companyPrep
      ]);
      jsonData = filteredStudents;
    } else if (activeTab === "coding") {
      headers = ["Language", "Problems Solved", "Accuracy %"];
      rows = codingLanguageUsage.map(l => [l.name, l.solved, `${l.accuracy}%`]);
      jsonData = { languageUsage: codingLanguageUsage, contestWinners };
    } else if (activeTab === "aptitude") {
      headers = ["Topic / Subject", "Accuracy / Progress", "Attempts"];
      rows = [
        ...aptitudeTopics.map(t => [t.name, `${t.accuracy}%`, t.attempts]),
        ...subjectAnalytics.map(s => [s.name, `${s.progress}% progress`, "N/A"])
      ];
      jsonData = { aptitudeTopics, subjectAnalytics };
    } else if (activeTab === "placement") {
      headers = ["Department / Company", "Metric / Average CTC", "Placed Count / Applied"];
      rows = [
        ...deptPlacementData.map(d => [d.dept, `${d.rate}% Success Rate`, `${d.selected} Placed / ${d.applied} Applied`]),
        ...companyPlacements.map(c => [c.company, c.avgPackage, `${c.selected} Placed`])
      ];
      jsonData = { departmentRates: deptPlacementData, companyPackages: companyPlacements };
    } else if (activeTab === "custom") {
      headers = ["Query Variable", "Filtered Threshold"];
      rows = Object.entries(customFilter).map(([key, val]) => [key, val]);
      jsonData = customFilter;
    } else if (activeTab === "scheduled") {
      headers = ["Schedule Title", "Interval Frequency", "Format", "Status"];
      rows = schedules.map(s => [s.name, s.frequency, s.format, s.status]);
      jsonData = schedules;
    } else if (activeTab === "financial") {
      headers = ["Month", "Revenue ($)"];
      rows = financialRevenue.map(f => [f.month, `$${f.revenue}`]);
      jsonData = financialRevenue;
    }

    if (format === "JSON") {
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
      triggerDownload(blob, `${title}.json`);
    } else if (format === "CSV") {
      const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      triggerDownload(blob, `${title}.csv`);
    } else if (format === "Excel") {
      const xlsContent = [headers, ...rows].map(row => row.join("\t")).join("\n");
      const blob = new Blob([xlsContent], { type: "application/vnd.ms-excel" });
      triggerDownload(blob, `${title}.xls`);
    } else if (format === "PDF") {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>CareerBridge AI Report - ${title.split("_").join(" ")}</title>
            <style>
              body { font-family: 'Inter', sans-serif; padding: 40px; color: #1f2937; line-height: 1.5; }
              h1 { color: #4f46e5; margin-bottom: 5px; font-size: 1.8rem; font-weight: 800; }
              p { color: #4b5563; margin-bottom: 30px; font-size: 0.9rem; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 0.85rem; }
              th, td { border: 1px solid #e5e7eb; padding: 10px 12px; text-align: left; }
              th { background-color: #f3f4f6; color: #374151; font-weight: 700; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px; }
              tr:nth-child(even) { background-color: #f9fafb; }
              .footer { margin-top: 40px; font-size: 0.75rem; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: center; }
            </style>
          </head>
          <body>
            <h1>CareerBridge AI - ${title.split("_").join(" ")}</h1>
            <p>Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
            <table>
              <thead>
                <tr>
                  ${headers.map(h => `<th>${h}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${rows.map(row => `
                  <tr>
                    ${row.map(cell => `<td>${cell}</td>`).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
            <div class="footer">
              Confidential. Internal Placement Officers Portal Use Only. © ${new Date().getFullYear()} CareerBridge AI.
            </div>
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
    }
  };

  const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddScheduleSubmit = (e) => {
    e.preventDefault();
    if (!newSchedule.name || !newSchedule.recipients) return;
    const added = {
      id: Date.now(),
      name: newSchedule.name,
      frequency: newSchedule.frequency,
      recipients: newSchedule.recipients,
      format: newSchedule.format,
      status: "Active"
    };
    setSchedules(prev => [...prev, added]);
    setNewSchedule({ name: "", frequency: "Weekly", recipients: "", format: "PDF" });
    setShowAddSchedule(false);
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
            <FiFileText style={{ color: "var(--primary)" }} />
            <span>Reports & Visual Analytics Console</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Inspect student profiles, compiler performance metrics, subject radars, company readiness, and financial revenue.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => handleExportReport("PDF")} className="start-practice-badge-btn" style={{ padding: "8px 14px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <FiDownload />
            <span>Export PDF</span>
          </button>
          <button onClick={() => handleExportReport("Excel")} className="start-practice-badge-btn" style={{ padding: "8px 14px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
            <FiDownload />
            <span>Export Excel</span>
          </button>
          <button onClick={() => handleExportReport("CSV")} className="start-practice-badge-btn" style={{ padding: "8px 14px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff" }}>
            <FiDownload />
            <span>Export CSV</span>
          </button>
          <button onClick={() => handleExportReport("JSON")} className="start-practice-badge-btn" style={{ padding: "8px 14px", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px", background: "rgba(167, 139, 250, 0.15)", border: "1px solid rgba(167, 139, 250, 0.3)", color: "#c084fc" }}>
            <FiDownload />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "5px" }}>
        <button onClick={() => setActiveTab("overview")} className={`tab-link ${activeTab === "overview" ? "active" : ""}`}><FiActivity /><span>Overview</span></button>
        <button onClick={() => setActiveTab("students")} className={`tab-link ${activeTab === "students" ? "active" : ""}`}><FiUsers /><span>Student Records</span></button>
        <button onClick={() => setActiveTab("coding")} className={`tab-link ${activeTab === "coding" ? "active" : ""}`}><FiCode /><span>Coding & Compilers</span></button>
        <button onClick={() => setActiveTab("aptitude")} className={`tab-link ${activeTab === "aptitude" ? "active" : ""}`}><FiBookOpen /><span>Aptitude & CS</span></button>
        <button onClick={() => setActiveTab("placement")} className={`tab-link ${activeTab === "placement" ? "active" : ""}`}><FiBriefcase /><span>Placements & Companies</span></button>
        <button onClick={() => setActiveTab("custom")} className={`tab-link ${activeTab === "custom" ? "active" : ""}`}><FiFilter /><span>Custom Builder</span></button>
        <button onClick={() => setActiveTab("scheduled")} className={`tab-link ${activeTab === "scheduled" ? "active" : ""}`}><FiClock /><span>Schedules</span></button>
        <button onClick={() => setActiveTab("financial")} className={`tab-link ${activeTab === "financial" ? "active" : ""}`}><FiDollarSign /><span>Financials</span></button>
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Dashboard Overview */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
              <div className="stat-pill" style={{ padding: "18px" }}>
                <span className="stat-label">Reports Compiled</span>
                <span className="stat-value">34 Reports</span>
              </div>
              <div className="stat-pill" style={{ padding: "18px" }}>
                <span className="stat-label">Daily Active Users (DAU)</span>
                <span className="stat-value">420 Active</span>
              </div>
              <div className="stat-pill" style={{ padding: "18px" }}>
                <span className="stat-label">Weekly Active Users (WAU)</span>
                <span className="stat-value">1,150 Active</span>
              </div>
              <div className="stat-pill" style={{ padding: "18px" }}>
                <span className="stat-label">System Performance</span>
                <span className="stat-value">100% Online</span>
              </div>
            </div>

            {/* Platform active usage chart */}
            <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "20px", color: "#ffffff" }}>Daily Active Student Logins & Sessions</h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <AreaChart data={platformUsage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "0.8rem", paddingTop: "10px" }} />
                    <Area type="monotone" name="Active DAU" dataKey="dau" stroke="#6366f1" strokeWidth={3} fill="url(#colorDau)" />
                    <Area type="monotone" name="Active Sessions" dataKey="sessions" stroke="#10b981" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Student Reports */}
        {activeTab === "students" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Search & Filters */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", padding: "12px 18px", borderRadius: "10px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flex: 1, minWidth: "260px" }}>
                <FiSearch style={{ color: "var(--text-secondary)" }} />
                <input 
                  type="text" 
                  placeholder="Search by student name or register number..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ background: "transparent", border: "none", color: "#ffffff", fontSize: "0.85rem", width: "100%", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}>
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
            </div>

            {/* Performance table */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Student Placements Readiness Reports</h3>
                <button onClick={() => handleExportReport("CSV")} className="start-practice-badge-btn" style={{ padding: "6px 12px", fontSize: "0.82rem" }}><FiDownload /> Export CSV</button>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Candidate Name</th>
                      <th style={{ padding: "12px" }}>Register No</th>
                      <th style={{ padding: "12px" }}>Dept</th>
                      <th style={{ padding: "12px" }}>CGPA</th>
                      <th style={{ padding: "12px" }}>Readiness</th>
                      <th style={{ padding: "12px" }}>Attendance</th>
                      <th style={{ padding: "12px" }}>Coding solved</th>
                      <th style={{ padding: "12px" }}>Aptitude solved</th>
                      <th style={{ padding: "12px" }}>ATS Resume</th>
                      <th style={{ padding: "12px" }}>Hiring Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{s.name}</strong></td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{s.regNo}</td>
                        <td style={{ padding: "12px" }}>{s.dept}</td>
                        <td style={{ padding: "12px" }}>{s.cgpa}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            background: s.readiness === "Placement Ready" ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                            color: s.readiness === "Placement Ready" ? "#10b981" : "#f59e0b",
                            fontWeight: "700"
                          }}>{s.readiness}</span>
                        </td>
                        <td style={{ padding: "12px" }}>{s.attendance}</td>
                        <td style={{ padding: "12px" }}>{s.codingSolved} Qs</td>
                        <td style={{ padding: "12px" }}>{s.aptitudeSolved} Qs</td>
                        <td style={{ padding: "12px", color: "#a78bfa", fontWeight: "700" }}>{s.resumeATS}%</td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{s.companyPrep}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* Tab 3: Coding & Compiler analytics */}
        {activeTab === "coding" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Language usage bar */}
            <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "20px", color: "#ffffff" }}>Compiler Language usage solved counts</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={codingLanguageUsage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip />
                    <Bar name="Problems Solved" dataKey="solved" fill="#10b981" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Contest winners list */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Recent Coding Contest Winners</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {contestWinners.map((w, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                    <div>
                      <strong style={{ color: "#ffffff", fontSize: "0.92rem", display: "block" }}>{w.name} Winner</strong>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Student: {w.winner}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <strong style={{ color: "#fbbf24", display: "block" }}>{w.solved} Solved</strong>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Duration: {w.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Tab 4: Aptitude & CS technical subjects */}
        {activeTab === "aptitude" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr", gap: "25px", alignItems: "start" }}>
            
            {/* Aptitude topic accuracy */}
            <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "20px", color: "#ffffff" }}>Aptitude Topic Accuracy rating</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={aptitudeTopics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.72rem" }} />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip />
                    <Bar name="Accuracy %" dataKey="accuracy" fill="#6366f1" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Core CS Subject progress bars */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Core CS Subjects Performance</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {subjectAnalytics.map((sub, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "4px" }}>
                      <span>{sub.name}</span>
                      <span>Syllabus: {sub.progress}% | Accuracy: {sub.accuracy}%</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}><div style={{ height: "100%", width: `${sub.progress}%`, background: COLORS[i % COLORS.length], borderRadius: "2px" }}></div></div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Tab 5: Placements & Recruiter drives */}
        {activeTab === "placement" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "25px", alignItems: "start" }}>
            
            {/* Department stats */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Department-wise Placed summary</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "8px" }}>Dept</th>
                      <th style={{ padding: "8px" }}>Eligible</th>
                      <th style={{ padding: "8px" }}>Applied</th>
                      <th style={{ padding: "8px" }}>Selected</th>
                      <th style={{ padding: "8px" }}>Success Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deptPlacementData.map((d, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "8px" }}><strong style={{ color: "#ffffff" }}>{d.dept}</strong></td>
                        <td style={{ padding: "8px" }}>{d.eligible} Students</td>
                        <td style={{ padding: "8px" }}>{d.applied}</td>
                        <td style={{ padding: "8px", color: "#10b981", fontWeight: "700" }}>{d.selected}</td>
                        <td style={{ padding: "8px", color: "#60a5fa", fontWeight: "700" }}>{d.rate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recruiter salary packages CTC */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Average Package CTC comparison</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {companyPlacements.map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color: "var(--text-secondary)" }}>{c.company} average Package</span>
                    <strong style={{ color: "#ffffff" }}>{c.avgPackage}</strong>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Tab 6: Custom Reports builder */}
        {activeTab === "custom" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: "25px", alignItems: "start" }}>
            
            {/* Custom filters form */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.15rem", marginBottom: "15px" }}>Configure custom query filters</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Select Department</span>
                  <select value={customFilter.dept} onChange={e => setCustomFilter({...customFilter, dept: e.target.value})} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }}>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Select Batch Year</span>
                  <select value={customFilter.batch} onChange={e => setCustomFilter({...customFilter, batch: e.target.value})} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }}>
                    <option value="2026">2026 Batch</option>
                    <option value="2025">2025 Batch</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Minimum CGPA threshold</span>
                  <input type="text" value={customFilter.cgpaMin} onChange={e => setCustomFilter({...customFilter, cgpaMin: e.target.value})} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }} />
                </div>
                <button type="button" onClick={() => handleExportReport("CSV")} className="solve-btn" style={{ marginTop: "10px" }}>Export Custom CSV</button>
              </div>
            </div>

            {/* Preview container */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.15rem", marginBottom: "15px" }}>Custom Query Preview</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                Fires database filters seeking students registered under **{customFilter.dept}** department for the **{customFilter.batch}** graduating batch with an academic CGPA value above **{customFilter.cgpaMin}**.
              </p>
            </div>

          </section>
        )}

        {/* Tab 7: Scheduled Dispatches */}
        {activeTab === "scheduled" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: "25px", alignItems: "start" }}>
            
            {/* Add Schedule Form */}
            {showAddSchedule && (
              <form onSubmit={handleAddScheduleSubmit} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", padding: "20px", borderRadius: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <h4 style={{ color: "#ffffff", margin: 0 }}>Add Automated Dispatch</h4>
                <input 
                  type="text" 
                  placeholder="Report Title" 
                  value={newSchedule.name} 
                  onChange={e => setNewSchedule({...newSchedule, name: e.target.value})}
                  style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }}
                />
                <input 
                  type="text" 
                  placeholder="Recipients Email addresses" 
                  value={newSchedule.recipients} 
                  onChange={e => setNewSchedule({...newSchedule, recipients: e.target.value})}
                  style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <select value={newSchedule.frequency} onChange={e => setNewSchedule({...newSchedule, frequency: e.target.value})} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }}>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  <select value={newSchedule.format} onChange={e => setNewSchedule({...newSchedule, format: e.target.value})} style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "8px", borderRadius: "6px", fontSize: "0.85rem" }}>
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                    <option value="CSV">CSV</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                  <button type="submit" className="solve-btn" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>Add Schedule</button>
                  <button type="button" onClick={() => setShowAddSchedule(false)} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff", padding: "6px 14px", fontSize: "0.8rem" }}>Cancel</button>
                </div>
              </form>
            )}

            {/* List panel */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Automated Schedule Triggers</h3>
                {!showAddSchedule && (
                  <button onClick={() => setShowAddSchedule(true)} className="start-practice-badge-btn" style={{ padding: "6px 12px", fontSize: "0.82rem" }}><FiPlus /> Create Schedule</button>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {schedules.map((sch) => (
                  <div key={sch.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                    <div>
                      <strong style={{ color: "#ffffff", fontSize: "0.92rem", display: "block" }}>{sch.name}</strong>
                      <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{sch.frequency} • Format: {sch.format}</span>
                    </div>
                    <button onClick={() => setSchedules(prev => prev.filter(item => item.id !== sch.id))} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}><FiTrash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

          </section>
        )}

        {/* Tab 8: Financial subscription logs */}
        {activeTab === "financial" && (
          <section className="tab-pane fade-in" style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "25px", alignItems: "start" }}>
            
            {/* Revenue Area chart */}
            <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "20px", color: "#ffffff" }}>Monthly Subscription Revenue growth</h3>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <AreaChart data={financialRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" />
                    <YAxis stroke="rgba(255,255,255,0.3)" />
                    <Tooltip />
                    <Area type="monotone" name="Revenue ($)" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Billing quick indicators */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Financial Billing metrics</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Total Active Premium Users</span>
                  <strong style={{ color: "#ffffff" }}>425 Students</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Monthly Revenue Target</span>
                  <strong style={{ color: "#10b981" }}>$31,000 Reach</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Annual Billing Forecast</span>
                  <strong style={{ color: "#60a5fa" }}>$380,000 Projected</strong>
                </div>
              </div>
            </div>

          </section>
        )}

      </main>
    </div>
  );
}
