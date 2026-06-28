"use client";

import { useState } from "react";

export default function InterviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const interviewTypes = [
    {
      title: "HR Interviews",
      questionsCount: 220,
      attendedStudents: 410,
      registeredStudents: 500,
      completionRate: "92%",
      icon: "👨‍💼",
      attendees: [
        { name: "Dhanush Kumar", rating: "4.8/5", feedback: "Excellent communication, well-structured answers." },
        { name: "Arun Kumar", rating: "4.2/5", feedback: "Good confidence, needs slightly better posture." },
        { name: "Priya Sharma", rating: "4.9/5", feedback: "Flawless delivery, very professional." }
      ]
    },
    {
      title: "Technical Interviews",
      questionsCount: 180,
      attendedStudents: 320,
      registeredStudents: 425,
      completionRate: "85%",
      icon: "💻",
      attendees: [
        { name: "Rahul Kumar", rating: "4.0/5", feedback: "Solid coding skills, needs optimization explanations." },
        { name: "Suresh Raina", rating: "4.5/5", feedback: "Strong DSA fundamentals and explanation." }
      ]
    },
    {
      title: "Company Specific",
      questionsCount: 90,
      attendedStudents: 240,
      registeredStudents: 290,
      completionRate: "89%",
      icon: "🏢",
      attendees: [
        { name: "Amit Patel", rating: "4.6/5", feedback: "Prepared well for Zoho round-specific topics." },
        { name: "Neha Gupta", rating: "4.7/5", feedback: "TCS-specific topics are very clear." }
      ]
    },
    {
      title: "Mock Assessments",
      questionsCount: 50,
      attendedStudents: 150,
      registeredStudents: 215,
      completionRate: "78%",
      icon: "📝",
      attendees: [
        { name: "Rohan Das", rating: "3.8/5", feedback: "Needs to manage assessment time better." },
        { name: "Vijay Kumar", rating: "4.3/5", feedback: "Cleared all sections with solid scores." }
      ]
    },
  ];

  const handleExportNotAttending = (category) => {
    // Generate mock list of students who registered but did not attend mock interviews
    const notAttendingNames = [
      "Ganesh Hegde", "Sumit Sharma", "Komal Patel", "Jatin Dev", "Richa Chadda",
      "Anil Kapoor", "Sonam Gupta", "Hardik Pandya", "Jasprit Bumrah", "Rohit Sharma",
      "Virat Kohli", "Shikhar Dhawan", "KL Rahul", "Rishabh Pant", "Ravindra Jadeja"
    ].slice(0, category.registeredStudents - category.attendedStudents || 10);

    const headers = ["Student Name", "Absence Reason", "Registration Date", "Track Readiness Score"];
    const reasons = [
      "Slot booking expired", "Did not join AI video call", "Technical connection timeout",
      "Rescheduled by student", "No-show at scheduled time", "Cancelled by candidate",
      "Preparation review pending"
    ];

    const rows = notAttendingNames.map((name, index) => [
      name,
      reasons[index % reasons.length],
      `June ${Math.floor(Math.random() * 10) + 15}, 2026`,
      `${Math.floor(Math.random() * 30) + 50}%`
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = `${category.title.toLowerCase().replace(/\s+/g, "_")}_absent_students.csv`;
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportAllNotAttending = () => {
    const headers = ["Category", "Student Name", "Absence Reason", "Registration Date", "Track Readiness Score"];
    const reasons = [
      "Slot booking expired", "Did not join AI video call", "Technical connection timeout",
      "Rescheduled by student", "No-show at scheduled time", "Cancelled by candidate",
      "Preparation review pending"
    ];

    const rows = [];
    interviewTypes.forEach(category => {
      const notAttendingNames = [
        "Ganesh Hegde", "Sumit Sharma", "Komal Patel", "Jatin Dev", "Richa Chadda",
        "Anil Kapoor", "Sonam Gupta", "Hardik Pandya", "Jasprit Bumrah", "Rohit Sharma",
        "Virat Kohli", "Shikhar Dhawan", "KL Rahul", "Rishabh Pant", "Ravindra Jadeja"
      ].slice(0, category.registeredStudents - category.attendedStudents || 10);

      notAttendingNames.forEach((name, index) => {
        rows.push([
          category.title,
          name,
          reasons[index % reasons.length],
          `June ${Math.floor(Math.random() * 10) + 15}, 2026`,
          `${Math.floor(Math.random() * 30) + 50}%`
        ]);
      });
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "all_mock_interviews_absent_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="interviews-page">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <h1>🎤 Mock Interview Management</h1>
          <p>
            Monitor student mock interview performance, track category-wise attendance, and view participant ratings.
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

      <div className="interview-stats">
        <div className="interview-stat-card">
          <h2>1,120</h2>
          <p>Completed Interviews</p>
        </div>
        <div className="interview-stat-card">
          <h2>86%</h2>
          <p>Avg Completion Rate</p>
        </div>
        <div className="interview-stat-card">
          <h2>540+</h2>
          <p>Questions Covered</p>
        </div>
        <div className="interview-stat-card">
          <h2>4.5/5</h2>
          <p>Average Student Rating</p>
        </div>
      </div>

      <h2 className="section-title">Interview Categories & Attendance</h2>

      <div className="interview-grid">
        {interviewTypes.map((item) => (
          <div key={item.title} className="interview-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="interview-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p style={{ margin: "5px 0 15px", color: "var(--text-secondary)" }}>
                Total Questions: <strong>{item.questionsCount}</strong>
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.9rem", borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Students Attended:</span>
                  <span style={{ fontWeight: "bold" }}>{item.attendedStudents}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Completion Rate:</span>
                  <span style={{ fontWeight: "bold", color: "var(--primary)" }}>{item.completionRate}</span>
                </div>
              </div>
            </div>

            <button 
              className="interview-btn"
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
              onClick={() => setSelectedCategory(item)}
            >
              View Attendance
            </button>
          </div>
        ))}
      </div>

      {/* Modal for detailed attendance - High Visibility Design */}
      {selectedCategory && (
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
                <span>📊</span> {selectedCategory.title} Attendance
              </span>
              <button 
                onClick={() => setSelectedCategory(null)}
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
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Total Registered</span>
                <strong style={{ fontSize: "0.88rem", color: "#ffffff" }}>{selectedCategory.registeredStudents} Students</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Attended</span>
                <strong style={{ fontSize: "0.88rem", color: "#60a5fa" }}>{selectedCategory.attendedStudents} Students</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Absent / No-Show</span>
                <strong style={{ fontSize: "0.88rem", color: "#f87171" }}>{selectedCategory.registeredStudents - selectedCategory.attendedStudents} Students</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Completion Rate</span>
                <strong style={{ fontSize: "0.88rem", color: "#34d399" }}>{selectedCategory.completionRate}</strong>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <h3 style={{ fontSize: "0.95rem", color: "#ffffff", margin: 0 }}>Recent Technical Submissions</h3>
              <span style={{ fontSize: "0.72rem", color: "#cbd5e1", background: "rgba(59, 130, 246, 0.15)", padding: "2px 6px", borderRadius: "10px" }}>
                Total Items: {selectedCategory.questionsCount}
              </span>
            </div>

            {/* Scrollable Attendees List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "120px", overflowY: "auto", paddingRight: "4px" }}>
              {selectedCategory.attendees.map((attendee, idx) => (
                <div key={idx} style={{ background: "rgba(255, 255, 255, 0.03)", padding: "8px 10px", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1, minWidth: 0, marginRight: "10px" }}>
                    <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.82rem", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{attendee.name}</span>
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{attendee.feedback}</span>
                  </div>
                  <span style={{ color: "#eab308", fontWeight: "700", fontSize: "0.82rem", flexShrink: 0 }}>⭐ {attendee.rating.split('/')[0]}</span>
                </div>
              ))}
            </div>

            {/* Horizontal Compact Buttons */}
            <div style={{ display: "flex", gap: "8px", marginTop: "18px" }}>
              <button 
                type="button" 
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
                onClick={() => setSelectedCategory(null)}
              >
                Close
              </button>
              <button 
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
                onClick={() => handleExportNotAttending(selectedCategory)}
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


