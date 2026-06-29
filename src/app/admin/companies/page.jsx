"use client";

import { useState, useMemo } from "react";
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
  FiBriefcase,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiEye,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiBookOpen,
  FiCpu,
  FiActivity,
  FiSearch,
  FiFilter,
  FiArrowRight,
  FiCheck
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function AdminCompaniesPage() {
  const [activeTab, setActiveTab] = useState("drives");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for Company list / Placement drives
  const [companies, setCompanies] = useState([
    { id: 1, name: "Google", type: "Product", role: "Software Engineer", salary: "35 LPA", status: "Active", deadline: "2026-07-15", applicants: 420, selected: 8 },
    { id: 2, name: "Microsoft", type: "Product", role: "Cloud Developer", salary: "44 LPA", status: "Active", deadline: "2026-07-20", applicants: 380, selected: 6 },
    { id: 3, name: "Amazon", type: "Product", role: "System Engineer", salary: "32 LPA", status: "Closed", deadline: "2026-06-25", applicants: 510, selected: 12 },
    { id: 4, name: "TCS", type: "Service", role: "Systems Engineer", salary: "3.6 - 7 LPA", status: "Active", deadline: "2026-07-30", applicants: 920, selected: 45 },
    { id: 5, name: "Zoho", type: "Product", role: "Member Technical Staff", salary: "6.5 - 12 LPA", status: "Upcoming", deadline: "2026-08-05", applicants: 0, selected: 0 }
  ]);

  // Form states for adding new company placement drive
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "", type: "Product", role: "", salary: "", status: "Active", deadline: "", description: "", cgpa: "8.0", backlogs: "0"
  });

  // Mock student applications
  const [applications, setApplications] = useState([
    { id: 201, name: "Dhanush Kumar", regNo: "SRM202201", company: "Google", cgpa: 8.0, ats: 88, status: "Shortlisted" },
    { id: 202, name: "Arun Kumar", regNo: "SRM202202", company: "Google", cgpa: 7.8, ats: 82, status: "Applied" },
    { id: 203, name: "Priya Sharma", regNo: "SRM202203", company: "Microsoft", cgpa: 8.2, ats: 85, status: "Applied" },
    { id: 204, name: "Rahul Verma", regNo: "SRM202204", company: "TCS", cgpa: 7.2, ats: 75, status: "Rejected" }
  ]);

  // Mock Selected Students list
  const [selectedStudents, setSelectedStudents] = useState([
    { name: "Dhanush Kumar", company: "Google", role: "Software Engineer", package: "35 LPA", joinDate: "2026-09-01" },
    { name: "Amit Patel", company: "Amazon", role: "System Engineer", package: "32 LPA", joinDate: "2026-08-15" },
    { name: "Sneha Paul", company: "TCS", role: "Systems Engineer", package: "7 LPA", joinDate: "2026-08-01" }
  ]);

  // Filter computation
  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute category ratios dynamically for current filtered subset
  const typeCounts = useMemo(() => {
    const counts = { "Product": 0, "Service": 0, "Startup": 0, "Core": 0 };
    filteredCompanies.forEach(c => {
      if (counts[c.type] !== undefined) {
        counts[c.type]++;
      } else {
        counts[c.type] = 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).filter(item => item.value > 0);
  }, [filteredCompanies]);

  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.role) return;
    const c = {
      id: Date.now(),
      ...newCompany,
      applicants: 0,
      selected: 0
    };
    setCompanies(prev => [...prev, c]);
    setNewCompany({ name: "", type: "Product", role: "", salary: "", status: "Active", deadline: "", description: "", cgpa: "8.0", backlogs: "0" });
    setShowAddForm(false);
  };

  const handleApplicationStatus = (id, nextStatus) => {
    setApplications(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleExportApplications = () => {
    const headers = ["ID", "Student Name", "Register No", "Target Company", "CGPA", "ATS Score", "Status"];
    const rows = applications.map(a => [
      a.id, a.name, a.regNo, a.company, a.cgpa, `${a.ats}%`, a.status
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "placed_student_applications.csv");
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
            <FiBriefcase style={{ color: "var(--primary)" }} />
            <span>Company & Drives Management</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Publish recruitment campaigns, audit student applications, and log finalized hiring offers.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleExportApplications} className="start-practice-badge-btn" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FiDownload />
            <span>Export Applications Report</span>
          </button>
        </div>
      </div>

      {/* Dashboard Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Total Recruiters</span>
          <span className="stat-value">52 Partners</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Active Drives</span>
          <span className="stat-value">12 Campaigns</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Closed Drives</span>
          <span className="stat-value">18 Drives</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Placed Students</span>
          <span className="stat-value">65 Selected</span>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "25px", marginBottom: "5px" }}>
        {/* Chart 1: Applicants vs Hired */}
        <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Drive Applicants vs Placed Count</h3>
          {filteredCompanies.length > 0 ? (
            <div style={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <BarChart data={filteredCompanies.map(c => ({ name: c.name, applicants: c.applicants, placed: c.selected }))} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                  <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                  <Tooltip />
                  <Bar name="Applicants" dataKey="applicants" fill="#6366f1" radius={[3, 3, 0, 0]} />
                  <Bar name="Placed" dataKey="placed" fill="#10b981" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ height: 200, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--text-secondary)" }}>No company drives match search criteria.</div>
          )}
        </div>

        {/* Chart 2: Company Type Distribution */}
        <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Company Categories Distribution</h3>
          {typeCounts.length > 0 ? (
            <div style={{ width: "100%", height: 200, display: "flex", justifyContent: "center" }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={typeCounts}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {typeCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "0.78rem" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ height: 200, display: "flex", justifyContent: "center", alignItems: "center", color: "var(--text-secondary)" }}>No data available.</div>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "5px" }}>
        <button onClick={() => setActiveTab("drives")} className={`tab-link ${activeTab === "drives" ? "active" : ""}`}>
          <FiBriefcase />
          <span>Active Placement Drives</span>
        </button>
        <button onClick={() => setActiveTab("applications")} className={`tab-link ${activeTab === "applications" ? "active" : ""}`}>
          <FiUsers />
          <span>Student Applications</span>
        </button>
        <button onClick={() => setActiveTab("selected")} className={`tab-link ${activeTab === "selected" ? "active" : ""}`}>
          <FiCheckCircle />
          <span>Selected Placement Registry</span>
        </button>
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Active Placement Drives */}
        {activeTab === "drives" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Add Placement Drive Form */}
            {showAddForm && (
              <form onSubmit={handleAddCompanySubmit} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", padding: "24px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Create New Placement Drive</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
                  <input 
                    type="text" 
                    placeholder="Company Name" 
                    value={newCompany.name} 
                    onChange={e => setNewCompany({...newCompany, name: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <input 
                    type="text" 
                    placeholder="Job Role (e.g. Developer)" 
                    value={newCompany.role} 
                    onChange={e => setNewCompany({...newCompany, role: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <input 
                    type="text" 
                    placeholder="Package CTC (e.g. 10 LPA)" 
                    value={newCompany.salary} 
                    onChange={e => setNewCompany({...newCompany, salary: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <input 
                    type="date" 
                    value={newCompany.deadline} 
                    onChange={e => setNewCompany({...newCompany, deadline: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <input 
                    type="text" 
                    placeholder="Required CGPA Cutoff (e.g. 8.0)" 
                    value={newCompany.cgpa} 
                    onChange={e => setNewCompany({...newCompany, cgpa: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <input 
                    type="text" 
                    placeholder="Allowed Active Backlogs" 
                    value={newCompany.backlogs} 
                    onChange={e => setNewCompany({...newCompany, backlogs: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="submit" className="solve-btn" style={{ padding: "8px 20px" }}>Publish Campaign</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff", padding: "8px 20px" }}>Cancel</button>
                </div>
              </form>
            )}

            {/* Placement List Panel */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Active Recruiter Campaigns</h3>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input 
                    type="text" 
                    placeholder="Search by company, role..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      outline: "none"
                    }}
                  />
                  {!showAddForm && (
                    <button onClick={() => setShowAddForm(true)} className="start-practice-badge-btn" style={{ padding: "6px 12px", fontSize: "0.82rem" }}><FiPlus /> Create Drive</button>
                  )}
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Company</th>
                      <th style={{ padding: "12px" }}>Job Role</th>
                      <th style={{ padding: "12px" }}>CTC Package</th>
                      <th style={{ padding: "12px" }}>Deadline</th>
                      <th style={{ padding: "12px" }}>Applicants</th>
                      <th style={{ padding: "12px" }}>Status</th>
                      <th style={{ padding: "12px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((c) => (
                      <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{c.name}</strong><br /><span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{c.type} Based</span></td>
                        <td style={{ padding: "12px" }}>{c.role}</td>
                        <td style={{ padding: "12px", fontWeight: "700" }}>{c.salary}</td>
                        <td style={{ padding: "12px" }}>{c.deadline}</td>
                        <td style={{ padding: "12px", color: "#60a5fa", fontWeight: "700" }}>{c.applicants} Students</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            background: c.status === "Active" ? "rgba(16, 185, 129, 0.12)" : c.status === "Closed" ? "rgba(239, 68, 68, 0.12)" : "rgba(255,255,255,0.08)",
                            color: c.status === "Active" ? "#10b981" : c.status === "Closed" ? "#ef4444" : "var(--text-secondary)",
                            fontWeight: "700"
                          }}>{c.status}</span>
                        </td>
                        <td style={{ padding: "12px" }}>
                          <button onClick={() => setCompanies(prev => prev.filter(item => item.id !== c.id))} style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }}><FiTrash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* Tab 2: Student Applications */}
        {activeTab === "applications" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Pending Student Applications</h3>
              
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Candidate Name</th>
                      <th style={{ padding: "12px" }}>Register No</th>
                      <th style={{ padding: "12px" }}>Target Company</th>
                      <th style={{ padding: "12px" }}>CGPA</th>
                      <th style={{ padding: "12px" }}>Resume ATS</th>
                      <th style={{ padding: "12px" }}>Status</th>
                      <th style={{ padding: "12px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{app.name}</strong></td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{app.regNo}</td>
                        <td style={{ padding: "12px", fontWeight: "700" }}>{app.company}</td>
                        <td style={{ padding: "12px" }}>{app.cgpa}</td>
                        <td style={{ padding: "12px", color: "#a78bfa", fontWeight: "700" }}>{app.ats}%</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            background: app.status === "Shortlisted" ? "rgba(16, 185, 129, 0.12)" : app.status === "Rejected" ? "rgba(239, 68, 68, 0.12)" : "rgba(255,255,255,0.08)",
                            color: app.status === "Shortlisted" ? "#10b981" : app.status === "Rejected" ? "#ef4444" : "#ffffff",
                            fontWeight: "700"
                          }}>{app.status}</span>
                        </td>
                        <td style={{ padding: "12px", display: "flex", gap: "10px" }}>
                          <button onClick={() => handleApplicationStatus(app.id, "Shortlisted")} style={{ background: "transparent", border: "none", color: "#10b981", cursor: "pointer" }} title="Shortlist Candidate"><FiCheck size={16} /></button>
                          <button onClick={() => handleApplicationStatus(app.id, "Rejected")} style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }} title="Reject Candidate"><FiXCircle size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Selected Placement Registry */}
        {activeTab === "selected" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Student Selection Registry</h3>
              
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Placed Candidate</th>
                      <th style={{ padding: "12px" }}>Recruiter Company</th>
                      <th style={{ padding: "12px" }}>Hired Job Role</th>
                      <th style={{ padding: "12px" }}>Package CTC</th>
                      <th style={{ padding: "12px" }}>Tentative Join Date</th>
                      <th style={{ padding: "12px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudents.map((sel, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{sel.name}</strong></td>
                        <td style={{ padding: "12px", fontWeight: "700" }}>{sel.company}</td>
                        <td style={{ padding: "12px" }}>{sel.role}</td>
                        <td style={{ padding: "12px", color: "#10b981", fontWeight: "700" }}>{sel.package}</td>
                        <td style={{ padding: "12px" }}>{sel.joinDate}</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            background: "rgba(16, 185, 129, 0.12)",
                            color: "#10b981",
                            fontWeight: "700"
                          }}>Selected</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
