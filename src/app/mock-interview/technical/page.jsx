"use client";

import { useState } from "react";
import technicalQuestions from "../../../data/technicalQuestions";
import InterviewBot from "../../../components/interview/InterviewBot";
import VoiceRecorder from "../../../components/interview/VoiceRecorder";
import { FiChevronLeft, FiChevronRight, FiList } from "react-icons/fi";

export default function TechnicalPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    if (currentIndex < technicalQuestions.length - 1) {
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
          💻 Technical Mock Interview
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Practice technical interview questions, improve problem-solving skills, and prepare for software engineering placement rounds.
        </p>
      </div>

      {/* Statistics */}
      <div className="interview-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "15px", marginBottom: "30px" }}>
        <div className="stat-card" style={{ textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--primary)", margin: "0 0 5px 0" }}>20+</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem" }}>Technical Questions</p>
        </div>
        <div className="stat-card" style={{ textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#10b981", margin: "0 0 5px 0" }}>25+</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem" }}>Companies Covered</p>
        </div>
        <div className="stat-card" style={{ textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#fbbf24", margin: "0 0 5px 0" }}>85%</h2>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem" }}>Target Score</p>
        </div>
        <div className="stat-card" style={{ textAlign: "center", padding: "15px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#a78bfa", margin: "0 0 5px 0" }}>15 Min</h2>
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
            {technicalQuestions.map((q, idx) => (
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
            disabled={currentIndex === technicalQuestions.length - 1}
            className="start-practice-badge-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              opacity: currentIndex === technicalQuestions.length - 1 ? 0.4 : 1,
              cursor: currentIndex === technicalQuestions.length - 1 ? "not-allowed" : "pointer",
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
          question={technicalQuestions[currentIndex].question}
          currentQuestion={currentIndex + 1}
          totalQuestions={technicalQuestions.length}
        />
      </div>

      {/* Voice Recorder */}
      <div className="interview-section" style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
          🎙 Record Your Answer
        </h2>
        <VoiceRecorder type="technical" key={currentIndex} />
      </div>

      {/* Important Topics */}
      <div className="interview-section" style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
          📚 Important Technical Topics
        </h2>
        <div className="topics-grid" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["Data Structures", "Algorithms", "OOPs", "DBMS", "SQL", "Operating Systems", "Computer Networks", "Java", "Python", "JavaScript"].map((t) => (
            <span key={t} style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", fontSize: "0.88rem", color: "var(--primary)", fontWeight: "600" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="interview-section" style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "15px", color: "#ffffff" }}>
          🚀 Technical Interview Tips
        </h2>
        <ul className="tips-list" style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Explain your thought process clearly; walk the interviewer through your logic.</li>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Focus on time complexity and space complexity (Big O notation) for code explanations.</li>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Revise DSA fundamentals (arrays, linked lists, binary search trees) regularly.</li>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Review DBMS Normalization rules, key definitions, and difference between SQL and NoSQL.</li>
          <li style={{ padding: "8px 12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>Use proper technical terms (e.g., polymorphism, multithreading) instead of generic language.</li>
        </ul>
      </div>
    </div>
  );
}