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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  FiMic,
  FiVideo,
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
  FiCheck,
  FiAlertTriangle
} from "react-icons/fi";

const COLORS = ["#6366f1", "#10b981", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4"];

export default function AdminInterviewsPage() {
  const [activeTab, setActiveTab] = useState("sessions");
  const [selectedSession, setSelectedSession] = useState(null);

  // Mock scheduled interview sessions
  const [sessions, setSessions] = useState([
    { id: 301, title: "Google Placement Mock", category: "Technical", difficulty: "Hard", duration: "60 mins", qCount: 5, company: "Google", mode: "AI Interview", assigned: 15, completed: 8 },
    { id: 302, title: "TCS HR Simulation", category: "HR", difficulty: "Easy", duration: "15 mins", qCount: 4, company: "TCS", mode: "AI Interview", assigned: 45, completed: 30 },
    { id: 303, title: "System Design Review", category: "System Design", difficulty: "Hard", duration: "45 mins", qCount: 3, company: "Amazon", mode: "Manual Interview", assigned: 10, completed: 4 },
    { id: 304, title: "Accenture General Mock", category: "Behavioral", difficulty: "Medium", duration: "30 mins", qCount: 6, company: "Accenture", mode: "Voice Interview", assigned: 25, completed: 18 }
  ]);

  // Form states for creating new interview
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInterview, setNewInterview] = useState({
    title: "", category: "Technical", difficulty: "Medium", duration: "30 mins", qCount: 5, company: "Google", mode: "AI Interview"
  });

  // Mock student evaluation logs
  const [evaluations, setEvaluations] = useState([
    { id: 401, name: "Dhanush Kumar", regNo: "SRM202201", session: "Google Placement Mock", aiScore: 82, communication: 85, confidence: 80, techScore: 82, grammar: 88, status: "Evaluated" },
    { id: 402, name: "Arun Kumar", regNo: "SRM202202", session: "TCS HR Simulation", aiScore: 78, communication: 80, confidence: 75, techScore: 78, grammar: 82, status: "Evaluated" },
    { id: 403, name: "Priya Sharma", regNo: "SRM202203", session: "Google Placement Mock", aiScore: 85, communication: 88, confidence: 85, techScore: 85, grammar: 90, status: "Pending Review" }
  ]);

  // ==========================================
  // CHARTS DATASETS
  // ==========================================

  // Company-wise mock interview statistics
  const companyInterviewStats = [
    { name: "Google", completed: 45, scheduled: 12 },
    { name: "Microsoft", completed: 32, scheduled: 8 },
    { name: "Amazon", completed: 58, scheduled: 15 },
    { name: "TCS", completed: 180, scheduled: 45 },
    { name: "Zoho", completed: 90, scheduled: 20 },
    { name: "Accenture", completed: 110, scheduled: 30 }
  ];

  // Average confidence score trend over time
  const confidenceTrendData = [
    { week: "Week 1", score: 72 },
    { week: "Week 2", score: 76 },
    { week: "Week 3", score: 81 },
    { week: "Week 4", score: 84 },
    { week: "Week 5", score: 88 }
  ];

  // Radar metrics for Student Competencies (HR, Technical, Coding, Communication, Confidence, Grammar)
  const studentCompetencyData = [
    { subject: "HR Prep", score: 85 },
    { subject: "Technical", score: 78 },
    { subject: "Coding", score: 82 },
    { subject: "Communication", score: 90 },
    { subject: "Confidence", score: 88 },
    { subject: "Grammar", score: 84 }
  ];

  // Question bank categories distribution
  const questionCategoriesDistribution = [
    { name: "HR", value: 120 },
    { name: "Technical", value: 240 },
    { name: "Coding", value: 180 },
    { name: "Behavioral", value: 90 }
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newInterview.title) return;
    const s = {
      id: Date.now(),
      ...newInterview,
      assigned: 0,
      completed: 0
    };
    setSessions(prev => [...prev, s]);
    setNewInterview({ title: "", category: "Technical", difficulty: "Medium", duration: "30 mins", qCount: 5, company: "Google", mode: "AI Interview" });
    setShowAddForm(false);
  };

  const handleApproveEvaluation = (id) => {
    setEvaluations(prev => prev.map(ev => {
      if (ev.id === id) {
        return { ...ev, status: "Evaluated" };
      }
      return ev;
    }));
  };

  const handleCSVExport = () => {
    const headers = ["ID", "Student Name", "Register No", "Mock Session", "AI Score", "Communication", "Technical Score", "Status"];
    const rows = evaluations.map(e => [
      e.id, e.name, e.regNo, e.session, e.aiScore, e.communication, e.techScore, e.status
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "placed_interview_evaluations.csv");
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
            <FiMic style={{ color: "var(--primary)" }} />
            <span>AI Mock Interview Manager</span>
          </h1>
          <p style={{ margin: "5px 0 0", fontSize: "0.86rem", color: "var(--text-secondary)" }}>
            Schedule voice/video simulations, evaluate communication parameters, and review audio logs.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleCSVExport} className="start-practice-badge-btn" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FiDownload />
            <span>Export Interview Reports</span>
          </button>
        </div>
      </div>

      {/* Overview stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Total Mock Sessions</span>
          <span className="stat-value">12 Templates</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Completed Sessions</span>
          <span className="stat-value">620 Audited</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Pending Faculty review</span>
          <span className="stat-value">8 Sessions</span>
        </div>
        <div className="stat-pill" style={{ padding: "18px" }}>
          <span className="stat-label">Average Confidence</span>
          <span className="stat-value">84/100 Rating</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <nav className="aptitude-tab-nav" style={{ marginBottom: "5px" }}>
        <button onClick={() => setActiveTab("sessions")} className={`tab-link ${activeTab === "sessions" ? "active" : ""}`}>
          <FiPlay />
          <span>Scheduled Interviews</span>
        </button>
        <button onClick={() => setActiveTab("evaluations")} className={`tab-link ${activeTab === "evaluations" ? "active" : ""}`}>
          <FiCheckCircle />
          <span>Student Evaluations</span>
        </button>
        <button onClick={() => setActiveTab("questions")} className={`tab-link ${activeTab === "questions" ? "active" : ""}`}>
          <FiBookOpen />
          <span>Question Bank Manager</span>
        </button>
      </nav>

      {/* Tabs Content */}
      <main className="aptitude-tab-content">
        
        {/* Tab 1: Scheduled Interviews */}
        {activeTab === "sessions" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Visual Charts Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1.4fr", gap: "25px" }}>
              {/* Chart 1: Company wise Interviews */}
              <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Company-wise Interviews Completed</h3>
                <div style={{ width: "100%", height: 200 }}>
                  <ResponsiveContainer>
                    <BarChart data={companyInterviewStats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                      <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                      <Tooltip />
                      <Bar name="Completed" dataKey="completed" fill="#6366f1" radius={[3, 3, 0, 0]} />
                      <Bar name="Scheduled" dataKey="scheduled" fill="#10b981" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Confidence Trend */}
              <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Average Confidence Rating Trend</h3>
                <div style={{ width: "100%", height: 200 }}>
                  <ResponsiveContainer>
                    <LineChart data={confidenceTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                      <YAxis stroke="rgba(255,255,255,0.3)" style={{ fontSize: "0.78rem" }} />
                      <Tooltip />
                      <Line type="monotone" name="Confidence Score" dataKey="score" stroke="#10b981" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Create Mock Form */}
            {showAddForm && (
              <form onSubmit={handleCreateSubmit} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", padding: "24px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "15px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Schedule New Mock Interview Session</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
                  <input 
                    type="text" 
                    placeholder="Interview Title" 
                    value={newInterview.title} 
                    onChange={e => setNewInterview({...newInterview, title: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <select 
                    value={newInterview.category} 
                    onChange={e => setNewInterview({...newInterview, category: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  >
                    <option value="Technical">Technical</option>
                    <option value="HR">HR</option>
                    <option value="Behavioral">Behavioral</option>
                    <option value="System Design">System Design</option>
                  </select>
                  <select 
                    value={newInterview.difficulty} 
                    onChange={e => setNewInterview({...newInterview, difficulty: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="Duration (e.g. 30 mins)" 
                    value={newInterview.duration} 
                    onChange={e => setNewInterview({...newInterview, duration: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <input 
                    type="text" 
                    placeholder="Company Target (e.g. Google)" 
                    value={newInterview.company} 
                    onChange={e => setNewInterview({...newInterview, company: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  />
                  <select 
                    value={newInterview.mode} 
                    onChange={e => setNewInterview({...newInterview, mode: e.target.value})}
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "10px", borderRadius: "8px" }}
                  >
                    <option value="AI Interview">AI Interview</option>
                    <option value="Manual Interview">Manual Interview</option>
                    <option value="Voice Interview">Voice Interview</option>
                    <option value="Video Interview">Video Interview</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="submit" className="solve-btn" style={{ padding: "8px 20px" }}>Publish Session</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="solve-btn" style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff", padding: "8px 20px" }}>Cancel</button>
                </div>
              </form>
            )}

            {/* List panel */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", margin: 0 }}>Active Mock Assessments</h3>
                {!showAddForm && (
                  <button onClick={() => setShowAddForm(true)} className="start-practice-badge-btn" style={{ padding: "6px 12px", fontSize: "0.82rem" }}><FiPlus /> Create Session</button>
                )}
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Interview Session</th>
                      <th style={{ padding: "12px" }}>Category</th>
                      <th style={{ padding: "12px" }}>Company</th>
                      <th style={{ padding: "12px" }}>Mode</th>
                      <th style={{ padding: "12px" }}>Duration</th>
                      <th style={{ padding: "12px" }}>Assigned</th>
                      <th style={{ padding: "12px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((s) => (
                      <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{s.title}</strong><br /><span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{s.difficulty} difficulty</span></td>
                        <td style={{ padding: "12px" }}>{s.category}</td>
                        <td style={{ padding: "12px", fontWeight: "700" }}>{s.company}</td>
                        <td style={{ padding: "12px" }}>{s.mode}</td>
                        <td style={{ padding: "12px" }}>{s.duration}</td>
                        <td style={{ padding: "12px", color: "#60a5fa" }}>{s.assigned} Students</td>
                        <td style={{ padding: "12px" }}>
                          <button onClick={() => setSessions(prev => prev.filter(item => item.id !== s.id))} style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer" }}><FiTrash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </section>
        )}

        {/* Tab 2: Student Evaluations */}
        {activeTab === "evaluations" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Competency Chart */}
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: "25px", alignItems: "center" }}>
              <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Average Student Competencies Rating</h3>
                <div style={{ width: "100%", height: 230 }}>
                  <ResponsiveContainer>
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={studentCompetencyData}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" style={{ fontSize: "0.78rem" }} />
                      <PolarRadiusAxis stroke="rgba(255,255,255,0.2)" style={{ fontSize: "0.72rem" }} />
                      <Radar name="Performance" dataKey="score" stroke="#818cf8" fill="#818cf8" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", fontSize: "0.88rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "10px" }}>Auto evaluation guidelines</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  AI evaluations compile indicators matching confidence levels, grammar, content accuracy, and keyword alignment. The faculty reviews acts as the override rating parameters.
                </p>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Pending Student Speech Transcripts & Ratings</h3>
              
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>Student Name</th>
                      <th style={{ padding: "12px" }}>Target Session</th>
                      <th style={{ padding: "12px" }}>AI Overall Score</th>
                      <th style={{ padding: "12px" }}>Communication</th>
                      <th style={{ padding: "12px" }}>Technical Accuracy</th>
                      <th style={{ padding: "12px" }}>Status</th>
                      <th style={{ padding: "12px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluations.map((ev) => (
                      <tr key={ev.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "12px" }}><strong style={{ color: "#ffffff" }}>{ev.name}</strong><br /><span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{ev.regNo}</span></td>
                        <td style={{ padding: "12px" }}>{ev.session}</td>
                        <td style={{ padding: "12px", color: "#10b981", fontWeight: "700" }}>{ev.aiScore}%</td>
                        <td style={{ padding: "12px" }}>{ev.communication}/100</td>
                        <td style={{ padding: "12px" }}>{ev.techScore}/100</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            background: ev.status === "Evaluated" ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
                            color: ev.status === "Evaluated" ? "#10b981" : "#f59e0b",
                            fontWeight: "700"
                          }}>{ev.status}</span>
                        </td>
                        <td style={{ padding: "12px" }}>
                          {ev.status === "Pending Review" ? (
                            <button onClick={() => handleApproveEvaluation(ev.id)} style={{ background: "transparent", border: "none", color: "#10b981", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: "700" }}>
                              <FiCheck /> Approve
                            </button>
                          ) : (
                            <span style={{ color: "var(--text-secondary)" }}>Approved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Question Bank Manager */}
        {activeTab === "questions" && (
          <section className="tab-pane fade-in" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            {/* Visual breakdown of questions */}
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.6fr", gap: "25px", alignItems: "center" }}>
              <div className="chart-box" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff", marginBottom: "15px" }}>Question Categories Distribution</h3>
                <div style={{ width: "100%", height: 200, display: "flex", justifyContent: "center" }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={questionCategoriesDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {questionCategoriesDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "0.78rem" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Subject/Topic wise question categories */}
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>Topics & Categories Questions Bank</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { name: "HR / Behavioral Self Introduction Questions", count: "120 Qs" },
                    { name: "Technical Java Programming basics", count: "210 Qs" },
                    { name: "Technical DBMS & SQL indexes queries", count: "180 Qs" },
                    { name: "Behavioral Conflict Resolution situations", count: "90 Qs" }
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                      <span style={{ fontSize: "0.9rem", color: "#ffffff" }}>{item.name}</span>
                      <span style={{ fontSize: "0.82rem", color: "#60a5fa", fontWeight: "700" }}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI setting templates */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
              <h3 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "15px" }}>AI Voice & Video Speech Scanner Rules</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
                <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "6px" }}>
                  <strong>Fluency Grade Rules:</strong> Subtract 2 points for every filler word (e.g. "like", "basically", "um") beyond 3 count.
                </div>
                <div style={{ padding: "10px", background: "rgba(255,255,255,0.02)", borderRadius: "6px" }}>
                  <strong>Confidence Grade Rules:</strong> eye contact alignment limits (should remain inside camera grid boundary &gt; 80% time).
                </div>
              </div>
            </div>

          </section>
        )}

      </main>
    </div>
  );
}
