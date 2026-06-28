
"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const reports = [
    {
      title: "Placement Performance Report",
      description:
        "Student placement readiness, coding and aptitude performance.",
      icon: "📊",
      metrics: {
        "Total Assessed Students": "1,520",
        "Placement Ready Students": "1,110 (73%)",
        "Average Aptitude Test Score": "78%",
        "Average Coding Challenges Solved": "38 per student",
        "Top Performing Branch": "Computer Science & Engineering"
      }
    },
    {
      title: "Resume Analysis Report",
      description:
        "ATS scores, resume quality and improvement statistics.",
      icon: "📄",
      metrics: {
        "Total Resumes Evaluated": "870",
        "ATS Approved (>= 75 Score)": "645 (74.1%)",
        "Average ATS Match Rating": "78%",
        "Flagged Improvement Areas": "Formatting, Key Skills section",
        "Average Review Turnaround": "Instant (AI-Powered)"
      }
    },
    {
      title: "Mock Interview Report",
      description:
        "Interview scores, feedback and performance trends.",
      icon: "🎤",
      metrics: {
        "Mock Interviews Attempted": "540 sessions",
        "Average Performance Rating": "4.5 / 5",
        "Most Selected Mode": "Technical - Software Development",
        "Key Weakness Pointed": "Logical structuring in coding walkthrough",
        "Mock Interview Pass Rate": "82%"
      }
    },
    {
      title: "Company Preparation Report",
      description:
        "Company-wise preparation progress and question completion.",
      icon: "🏢",
      metrics: {
        "Most Practiced Company": "TCS (450 students)",
        "Highest Completion Rate": "Zoho (91% active completion)",
        "Total Company Specific Questions": "560 questions",
        "Average Practice Time": "2.8 hours per student",
        "Material Engagement Factor": "High (92.4% regular return)"
      }
    },
  ];

  const handleGenerateReport = (report) => {
    setActiveReport(report);
    setIsGenerating(true);
    setShowModal(true);

    // Simulate generating report
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  const handleDownloadReport = () => {
    if (!activeReport) return;

    let content = `==================================================\n`;
    content += `        CAREERBRIDGE AI - MANAGEMENT SYSTEM        \n`;
    content += `        ${activeReport.title.toUpperCase()}        \n`;
    content += `        Generated on: ${new Date().toLocaleString()}  \n`;
    content += `==================================================\n\n`;
    
    Object.entries(activeReport.metrics).forEach(([key, val]) => {
      content += `${key.padEnd(38)}: ${val}\n`;
    });
    
    content += `\n==================================================\n`;
    content += `Confidential. For Internal Placement Officers Only. \n`;
    content += `==================================================\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = activeReport.title.toLowerCase().replace(/\s+/g, "_") + ".txt";
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>📈 Reports & Analytics</h1>
        <p>
          Generate detailed placement reports and track student performance.
        </p>
      </div>

      <div className="report-stats">
        <div className="report-stat-card">
          <h2>1500+</h2>
          <p>Students</p>
        </div>
        <div className="report-stat-card">
          <h2>92%</h2>
          <p>Placement Readiness</p>
        </div>
        <div className="report-stat-card">
          <h2>540</h2>
          <p>Mock Interviews</p>
        </div>
        <div className="report-stat-card">
          <h2>2300+</h2>
          <p>Questions Solved</p>
        </div>
      </div>

      <h2 className="section-title">Available Reports</h2>

      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report.title} className="report-card">
            <div className="report-icon">{report.icon}</div>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <button className="admin-btn" onClick={() => handleGenerateReport(report)}>
              Generate Report
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Generation / Viewing / Download - High Visibility Design */}
      {showModal && activeReport && (
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
            padding: "25px",
            borderRadius: "14px",
            border: "1.5px solid #3b82f6",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 12px rgba(59, 130, 246, 0.2)"
          }}>
            {isGenerating ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div className="spin-loader" style={{ 
                  width: "50px", 
                  height: "50px", 
                  border: "4px solid rgba(255,255,255,0.1)", 
                  borderTop: "4px solid #3b82f6", 
                  borderRadius: "50%", 
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 20px"
                }} />
                <h3 style={{ color: "#ffffff" }}>Generating {activeReport.title}...</h3>
                <p style={{ color: "#94a3b8", marginTop: "8px", fontSize: "0.9rem" }}>Compiling latest database metrics and statistics.</p>
              </div>
            ) : (
              <div>
                <h2 style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "10px", fontSize: "1.25rem", color: "#ffffff" }}>
                  <span>📋 {activeReport.title}</span>
                  <button 
                    onClick={() => setShowModal(false)}
                    style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
                  >
                    &times;
                  </button>
                </h2>
                
                <div style={{ 
                  background: "rgba(255,255,255,0.02)", 
                  border: "1px solid rgba(255,255,255,0.08)", 
                  borderRadius: "10px", 
                  padding: "15px",
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  marginBottom: "20px",
                  lineHeight: "1.6",
                  color: "#ffffff"
                }}>
                  <div style={{ textAlign: "center", borderBottom: "1px dashed rgba(255,255,255,0.15)", paddingBottom: "8px", marginBottom: "10px", fontWeight: "bold", color: "#60a5fa" }}>
                    CAREERBRIDGE REPORT SUMMARY
                  </div>
                  {Object.entries(activeReport.metrics).map(([key, val]) => (
                    <div key={key} style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
                      <span style={{ color: "#cbd5e1" }}>{key}:</span>
                      <strong style={{ textAlign: "right", color: "#ffffff" }}>{val}</strong>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    style={{ 
                      padding: "10px 18px", 
                      background: "rgba(255,255,255,0.05)", 
                      border: "1px solid rgba(255,255,255,0.15)", 
                      borderRadius: "8px", 
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: "0.88rem",
                      cursor: "pointer"
                    }}
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleDownloadReport}
                    style={{ 
                      padding: "10px 18px", 
                      background: "#3b82f6", 
                      border: "none", 
                      borderRadius: "8px", 
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.88rem",
                      cursor: "pointer"
                    }}
                  >
                    📥 Download Report (.txt)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


