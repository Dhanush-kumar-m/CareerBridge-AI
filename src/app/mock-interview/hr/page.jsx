"use client";

import { useState } from "react";
import hrQuestions from "../../../data/hrQuestions";
import InterviewBot from "../../../components/interview/InterviewBot";
import VoiceRecorder from "../../../components/interview/VoiceRecorder";
import { FiChevronLeft, FiChevronRight, FiList } from "react-icons/fi";

export default function HRPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    if (currentIndex < hrQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSelectChange = (e) => {
    setCurrentIndex(parseInt(e.target.value, 10));
  };

  return (
    <div className="interview-page" style={{ padding: "10px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <div className="page-header" style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
          🎤 HR Mock Interview
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Practice common HR interview questions, record your answers, and improve your communication skills.
        </p>
      </div>

      {/* Statistics */}
      <div className="interview-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "15px", marginBottom: "30px" }}>
        <div className="stat-card" style={{ textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--primary)", margin: "0 0 5px 0" }}>15+</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem" }}>HR Questions</p>
        </div>
        <div className="stat-card" style={{ textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#10b981", margin: "0 0 5px 0" }}>20+</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem" }}>Companies Covered</p>
        </div>
        <div className="stat-card" style={{ textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#fbbf24", margin: "0 0 5px 0" }}>85%</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem" }}>Target Score</p>
        </div>
        <div className="stat-card" style={{ textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#a78bfa", margin: "0 0 5px 0" }}>10 Min</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem" }}>Interview Session</p>
        </div>
      </div>

      {/* Navigation & Selection Bar */}
      <div className="interview-nav-bar" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
        padding: "12px 20px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        marginBottom: "25px",
        flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FiList style={{ color: "var(--primary)" }} />
          <span style={{ fontSize: "0.9rem", color: "#cbd5e1", fontWeight: "600" }}>Select Question:</span>
          <select
            value={currentIndex}
            onChange={handleSelectChange}
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#ffffff",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            {hrQuestions.map((q, idx) => (
              <option key={q.id} value={idx}>Q{q.id}: {q.question.substring(0, 30)}...</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="start-practice-badge-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              opacity: currentIndex === 0 ? 0.4 : 1,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              padding: "6px 12px",
              fontSize: "0.85rem"
            }}
          >
            <FiChevronLeft />
            <span>Prev</span>
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentIndex === hrQuestions.length - 1}
            className="start-practice-badge-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              opacity: currentIndex === hrQuestions.length - 1 ? 0.4 : 1,
              cursor: currentIndex === hrQuestions.length - 1 ? "not-allowed" : "pointer",
              padding: "6px 12px",
              fontSize: "0.85rem"
            }}
          >
            <span>Next</span>
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Current Question */}
      <div className="interview-section" style={{ marginBottom: "30px" }}>
        <InterviewBot
          question={hrQuestions[currentIndex].question}
          currentQuestion={currentIndex + 1}
          totalQuestions={hrQuestions.length}
        />
      </div>

      {/* Voice Recorder */}
      <div className="interview-section" style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
          🎙 Record Your Answer
        </h2>
        <VoiceRecorder type="hr" key={currentIndex} />
      </div>

      {/* Tips */}
      <div className="interview-section" style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
          🚀 HR Interview Tips
        </h2>
        <ul className="tips-list" style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Introduce yourself confidently.</li>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Maintain positive body language and speaking pace.</li>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Use real examples while answering (STAR method: Situation, Task, Action, Result).</li>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Be honest about your strengths and weaknesses.</li>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Practice speaking clearly, avoiding filler words (um, like, etc.).</li>
        </ul>
      </div>
    </div>
  );
}