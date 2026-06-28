
"use client";

import { useState } from "react";

export default function CompaniesPage() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companies = [
    {
      name: "TCS",
      studentsCount: 450,
      driveAttendees: 380,
      questionsCount: 120,
      participationRate: "88%",
      recentActivity: "15 mins ago",
      students: [
        { name: "Dhanush Kumar", score: "85%", activity: "Completed TCS Aptitude" },
        { name: "Arun Kumar", score: "90%", activity: "Attempted TCS Coding Challenge" },
        { name: "Priya Sharma", score: "78%", activity: "Reviewed TCS Interview Prep" }
      ]
    },
    {
      name: "Infosys",
      studentsCount: 380,
      driveAttendees: 310,
      questionsCount: 110,
      participationRate: "79%",
      recentActivity: "42 mins ago",
      students: [
        { name: "Rahul Kumar", score: "82%", activity: "Completed Infosys Verbal Ability" },
        { name: "Suresh Raina", score: "71%", activity: "Attempted Infosys Coding" }
      ]
    },
    {
      name: "Accenture",
      studentsCount: 290,
      driveAttendees: 240,
      questionsCount: 95,
      participationRate: "84%",
      recentActivity: "1 hour ago",
      students: [
        { name: "Amit Patel", score: "89%", activity: "Completed Accenture Aptitude" },
        { name: "Neha Gupta", score: "92%", activity: "Attempted Accenture Coding" }
      ]
    },
    {
      name: "Zoho",
      studentsCount: 310,
      driveAttendees: 270,
      questionsCount: 105,
      participationRate: "91%",
      recentActivity: "5 mins ago",
      students: [
        { name: "Rohan Das", score: "95%", activity: "Completed Zoho Advanced Coding" },
        { name: "Vijay Kumar", score: "84%", activity: "Attempted Zoho Technical Interview" }
      ]
    },
    {
      name: "Amazon",
      studentsCount: 180,
      driveAttendees: 120,
      questionsCount: 130,
      participationRate: "72%",
      recentActivity: "2 hours ago",
      students: [
        { name: "Karan Johar", score: "90%", activity: "Completed Amazon DSA Challenge" },
        { name: "Simran Kaur", score: "86%", activity: "Attempted Amazon Bar Raiser Prep" }
      ]
    },
  ];

  const handleExportNotAttending = (company) => {
    // Generate mock list of students who did not attend the drive
    const notAttendingNames = [
      "Vijay Mallya", "Suresh Kumar", "Divya Teja", "Harish S", "Meghana R",
      "Rohan Malhotra", "Sneha Paul", "Abhishek Verma", "Pooja Hegde", "Varun Dhawan",
      "Kriti Sanon", "Sidharth Malhotra", "Kiara Advani", "Ranbir Kapoor", "Alia Bhatt"
    ].slice(0, company.studentsCount - company.driveAttendees || 10);

    const headers = ["Student Name", "Reason for Absence", "Aptitude Completion", "Coding Completion"];
    const reasons = [
      "Incomplete Preparation", "Absent on Drive Day", "Medical Leave",
      "Opted for Higher Studies", "Secured another offer", "Awaiting results",
      "Technical clearance pending"
    ];

    const rows = notAttendingNames.map((name, index) => [
      name,
      reasons[index % reasons.length],
      `${Math.floor(Math.random() * 40) + 30}%`,
      `${Math.floor(Math.random() * 50) + 20}%`
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = `${company.name}_not_attending_students.csv`;
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportAllNotAttending = () => {
    const headers = ["Company", "Student Name", "Reason for Absence", "Aptitude Completion", "Coding Completion"];
    const reasons = [
      "Incomplete Preparation", "Absent on Drive Day", "Medical Leave",
      "Opted for Higher Studies", "Secured another offer", "Awaiting results",
      "Technical clearance pending"
    ];
    
    const rows = [];
    companies.forEach(company => {
      const notAttendingNames = [
        "Vijay Mallya", "Suresh Kumar", "Divya Teja", "Harish S", "Meghana R",
        "Rohan Malhotra", "Sneha Paul", "Abhishek Verma", "Pooja Hegde", "Varun Dhawan",
        "Kriti Sanon", "Sidharth Malhotra", "Kiara Advani", "Ranbir Kapoor", "Alia Bhatt"
      ].slice(0, company.studentsCount - company.driveAttendees || 10);
      
      notAttendingNames.forEach((name, index) => {
        rows.push([
          company.name,
          name,
          reasons[index % reasons.length],
          `${Math.floor(Math.random() * 40) + 30}%`,
          `${Math.floor(Math.random() * 50) + 20}%`
        ]);
      });
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "all_companies_not_attending_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="companies-page">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h1>🏢 Company Prep Overview</h1>
          <p>
            Monitor student preparation activity, track participation rate, and review engagement analytics across popular companies.
          </p>
        </div>
        <button 
          className="admin-btn" 
          onClick={handleExportAllNotAttending}
          style={{ 
            background: "rgba(239, 68, 68, 0.15)", 
            border: "1px solid rgba(239, 68, 68, 0.3)", 
            color: "#ef4444", 
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.background = "rgba(239, 68, 68, 0.25)"}
          onMouseLeave={(e) => e.target.style.background = "rgba(239, 68, 68, 0.15)"}
        >
          📥 Export All Absent Students (.csv)
        </button>
      </div>

      <div className="company-stats">
        <div className="company-stat-card">
          <h2>5</h2>
          <p>Active Companies</p>
        </div>
        <div className="company-stat-card">
          <h2>1,610</h2>
          <p>Total Student Attended</p>
        </div>
        <div className="company-stat-card">
          <h2>560+</h2>
          <p>Placement Materials</p>
        </div>
        <div className="company-stat-card">
          <h2>82.8%</h2>
          <p>Average Engagement Rate</p>
        </div>
      </div>

      <h2 className="section-title">Popular Recruitment Partners & Stats</h2>

      <div className="companies-grid">
        {companies.map((company) => (
          <div key={company.name} className="company-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3>{company.name}</h3>
              <p style={{ margin: "5px 0 15px", color: "var(--text-secondary)" }}>
                Total Questions: <strong>{company.questionsCount}</strong>
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Students Prepared:</span>
                  <span style={{ fontWeight: "bold" }}>{company.studentsCount}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Drive Attendance:</span>
                  <span style={{ fontWeight: "bold", color: "#3b82f6" }}>{company.driveAttendees} Students</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Participation Rate:</span>
                  <span style={{ fontWeight: "bold", color: "#10b981" }}>{company.participationRate}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Recent Activity:</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{company.recentActivity}</span>
                </div>
              </div>
            </div>

            <button 
              className="company-btn" 
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
              onClick={() => setSelectedCompany(company)}
            >
              View Engagement
            </button>
          </div>
        ))}
      </div>

      {/* Modal for detailed analytics - High Visibility Design */}
      {selectedCompany && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(8, 12, 24, 0.85)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "linear-gradient(145deg, #1e293b, #0f172a)",
            color: "#f8fafc",
            padding: "20px",
            borderRadius: "14px",
            border: "1.5px solid #3b82f6",
            width: "90%",
            maxWidth: "440px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 12px rgba(59, 130, 246, 0.2)"
          }}>
            <h2 style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "8px", fontSize: "1.25rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ffffff" }}>
                <span>📊</span> {selectedCompany.name} Analytics
              </span>
              <button 
                onClick={() => setSelectedCompany(null)}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: "#94a3b8", 
                  fontSize: "1.5rem", 
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "0 4px"
                }}
                onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                onMouseLeave={(e) => e.target.style.color = "#94a3b8"}
              >
                &times;
              </button>
            </h2>

            {/* Compact Grid Stats */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr", 
              gap: "8px", 
              marginBottom: "15px", 
              background: "rgba(255,255,255,0.02)", 
              padding: "10px", 
              borderRadius: "8px", 
              border: "1px solid rgba(255,255,255,0.05)" 
            }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Total Practicing</span>
                <strong style={{ fontSize: "0.88rem", color: "#ffffff" }}>{selectedCompany.studentsCount} Students</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Drive Attendance</span>
                <strong style={{ fontSize: "0.88rem", color: "#60a5fa" }}>{selectedCompany.driveAttendees} Students</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Not Attending</span>
                <strong style={{ fontSize: "0.88rem", color: "#f87171" }}>{selectedCompany.studentsCount - selectedCompany.driveAttendees} Students</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Participation Rate</span>
                <strong style={{ fontSize: "0.88rem", color: "#34d399" }}>{selectedCompany.participationRate}</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <h3 style={{ fontSize: "0.95rem", color: "#ffffff", margin: 0 }}>Recent Student Activity</h3>
              <span style={{ fontSize: "0.72rem", color: "#cbd5e1", background: "rgba(59, 130, 246, 0.15)", padding: "2px 6px", borderRadius: "10px" }}>
                Total Items: {selectedCompany.questionsCount}
              </span>
            </div>

            {/* Scrollable Submissions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "120px", overflowY: "auto", paddingRight: "4px" }}>
              {selectedCompany.students.map((student, idx) => (
                <div key={idx} style={{ background: "rgba(255, 255, 255, 0.03)", padding: "8px 10px", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1, minWidth: 0, marginRight: "10px" }}>
                    <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.82rem", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{student.name}</span>
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{student.activity}</span>
                  </div>
                  <span style={{ color: "#60a5fa", fontWeight: "700", fontSize: "0.82rem", flexShrink: 0 }}>{student.score}</span>
                </div>
              ))}
            </div>

            {/* Horizontal Compact Buttons */}
            <div style={{ display: "flex", gap: "8px", marginTop: "18px" }}>
              <button 
                className="admin-btn" 
                style={{ 
                  flex: 1, 
                  padding: "10px", 
                  background: "rgba(255, 255, 255, 0.05)", 
                  border: "1px solid rgba(255, 255, 255, 0.1)", 
                  borderRadius: "8px", 
                  color: "#ffffff", 
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                onClick={() => setSelectedCompany(null)}
                onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.05)"}
              >
                Close
              </button>
              <button 
                className="admin-btn" 
                style={{ 
                  flex: 1.5, 
                  padding: "10px", 
                  background: "rgba(239, 68, 68, 0.15)", 
                  border: "1px solid rgba(239, 68, 68, 0.3)", 
                  borderRadius: "8px", 
                  color: "#ef4444", 
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onClick={() => handleExportNotAttending(selectedCompany)}
                onMouseEnter={(e) => e.target.style.background = "rgba(239, 68, 68, 0.25)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(239, 68, 68, 0.15)"}
              >
                📥 Export CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



