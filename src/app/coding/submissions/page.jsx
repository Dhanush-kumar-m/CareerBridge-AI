"use client";

import { useState } from "react";
import useCodingProgress from "../../../hooks/useCodingProgress";

export default function SubmissionsPage() {
  const { submissions, loading } = useCodingProgress();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  if (loading) {
    return (
      <div className="submissions-page" style={{ padding: "40px", textShadow: "none" }}>
        <h2>Loading submissions...</h2>
      </div>
    );
  }

  const acceptedCount = submissions.filter(
    (s) => s.status === "Accepted"
  ).length;

  const successRate = submissions.length > 0 ? Math.round(
    (acceptedCount / submissions.length) * 100
  ) : 0;

  return (
    <div className="submissions-page" style={{ position: "relative" }}>
      {/* Modal Popup for Submission Details */}
      {selectedSubmission && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          backdropFilter: "blur(5px)",
          padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#0d0e12",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "750px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)"
          }}>
            {/* Modal Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              background: "#111827"
            }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                  Submission Details
                </h2>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "4px", display: "inline-block" }}>
                  Submitted on {selectedSubmission.date}
                </span>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              padding: "24px",
              overflowY: "auto",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}>
              {/* Info grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
                backgroundColor: "#111827",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.03)"
              }}>
                <div>
                  <h4 style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 4px 0", textTransform: "uppercase" }}>Question</h4>
                  <strong style={{ color: "#fff", fontSize: "0.95rem" }}>{selectedSubmission.title}</strong>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 4px 0", textTransform: "uppercase" }}>Language</h4>
                  <strong style={{ color: "#818cf8", fontSize: "0.95rem" }}>{selectedSubmission.language}</strong>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 4px 0", textTransform: "uppercase" }}>Runtime</h4>
                  <strong style={{ color: "#34d399", fontSize: "0.95rem" }}>{selectedSubmission.runtime}</strong>
                </div>
                <div>
                  <h4 style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 4px 0", textTransform: "uppercase" }}>Status</h4>
                  <span style={{
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    color: selectedSubmission.status === "Accepted" ? "#34d399" : (selectedSubmission.status === "Compilation Error" ? "#fbbf24" : "#f87171")
                  }}>
                    {selectedSubmission.status}
                  </span>
                </div>
              </div>

              {/* Code section */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "1rem", color: "#fff", margin: 0 }}>Submitted Code</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedSubmission.code);
                      alert("Code copied to clipboard!");
                    }}
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#cbd5e1",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      cursor: "pointer"
                    }}
                  >
                    Copy Code
                  </button>
                </div>
                <pre style={{
                  backgroundColor: "#1e1e24",
                  padding: "16px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  fontFamily: "Consolas, Monaco, monospace",
                  fontSize: "0.9rem",
                  color: "#e2e8f0",
                  overflowX: "auto",
                  maxHeight: "350px",
                  textAlign: "left",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all"
                }}>
                  {selectedSubmission.code}
                </pre>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div style={{
              padding: "16px 24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
              background: "#111827",
              textAlign: "right"
            }}>
              <button
                onClick={() => setSelectedSubmission(null)}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}

      <div className="submission-header">

        <h1>
          📋 Submission History
        </h1>

        <p>
          Track your coding submissions,
          performance trends, and placement
          preparation progress.
        </p>

      </div>

      {/* Stats */}

      <div className="submission-stats">

        <div className="submission-card">
          <h3>Total Submissions</h3>
          <h2>{submissions.length}</h2>
        </div>

        <div className="submission-card">
          <h3>Accepted</h3>
          <h2>{acceptedCount}</h2>
        </div>

        <div className="submission-card">
          <h3>Success Rate</h3>
          <h2>{successRate}%</h2>
        </div>

        <div className="submission-card">
          <h3>Current Streak</h3>
          <h2>14 🔥</h2>
        </div>

      </div>

      {/* Achievement Banner */}

      <div className="submission-banner">

        <h3>
          🏆 Great Progress!
        </h3>

        <p>
          You have solved multiple coding
          problems successfully. Keep
          practicing to improve your
          placement readiness score.
        </p>

      </div>

      {/* Table */}

      <div className="submission-table-container">

        <table className="submission-table">

          <thead>

            <tr>
              <th>Problem</th>
              <th>Language</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>Runtime</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {submissions.map(
              (submission) => (
                <tr key={submission.id}>

                  <td>
                    {submission.title}
                  </td>

                  <td>
                    {submission.language}
                  </td>

                  <td>

                    <span
                      className={`difficulty-badge ${submission.difficulty.toLowerCase()}`}
                    >
                      {submission.difficulty}
                    </span>

                  </td>

                  <td>

                    <span
                      className={`status-badge ${
                        submission.status === "Accepted"
                          ? "accepted"
                          : submission.status === "Compilation Error"
                          ? "tle" // orange-ish theme
                          : "wrong"
                      }`}
                    >
                      {submission.status}
                    </span>

                  </td>

                  <td>
                    {submission.runtime}
                  </td>

                  <td>
                    {submission.date}
                  </td>

                  <td>
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="login-btn"
                      style={{
                        padding: "6px 12px",
                        fontSize: "0.8rem",
                        borderRadius: "6px",
                        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      View Code
                    </button>
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}
