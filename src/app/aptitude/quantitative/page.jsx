"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import aptitudeData from "../../../data/aptitude";
import QuestionCard from "../../../components/aptitude/QuestionCard";
import Timer from "../../../components/aptitude/Timer";
import useAptitudeProgress from "../../../hooks/useAptitudeProgress";

export default function QuantitativePage() {
  const router = useRouter();
  const [level, setLevel] = useState("Easy");
  const { solvedList, loading: loadingProgress, markAsSolved, resetCategoryProgress } = useAptitudeProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [moduleId, setModuleId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const mod = params.get("module");
      if (mod) {
        setModuleId(parseInt(mod));
      }
    }
  }, []);

  // Update session questions when solvedList or difficulty level changes
  useEffect(() => {
    if (!loadingProgress) {
      const questionsOfLevel = aptitudeData.quantitative.filter(
        (q) => q.difficulty.toLowerCase() === level.toLowerCase()
      );
      const unsolved = questionsOfLevel.filter(
        (q) => !solvedList.includes(`quantitative_${q.id}`)
      );
      setSessionQuestions(unsolved);
      setLoading(false);
    }
  }, [solvedList, loadingProgress, level]);

  const handleLevelChange = (lvl) => {
    setLevel(lvl);
    setCurrentQuestionIndex(0);
    setHasAnswered(false);
  };

  const handleResetLevel = (category) => {
    const questionsOfLevel = aptitudeData.quantitative.filter(
      (q) => q.difficulty.toLowerCase() === level.toLowerCase()
    );
    const keysToRemove = questionsOfLevel.map((q) => `${category}_${q.id}`);
    resetCategoryProgress(keysToRemove);
    setCurrentQuestionIndex(0);
    setHasAnswered(false);
  };

  const totalQuestions = sessionQuestions.length;
  const currentQuestion = sessionQuestions[currentQuestionIndex];

  const handleAnswerSubmit = (isCorrect) => {
    setHasAnswered(true);
    if (isCorrect) {
      // Mark as solved
      if (currentQuestion) {
        const key = `quantitative_${currentQuestion.id}`;
        markAsSolved(key);
      }

      setPopupMessage("Now I will give the simple explanation to solve this question with formula 💡🚀");
      setTimeout(() => {
        setPopupMessage("");
      }, 2500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setPopupMessage("Moving to next question... 🚀");
      setTimeout(() => {
        setPopupMessage("");
        setHasAnswered(false);
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 2000);
    } else {
      if (moduleId) {
        setPopupMessage(`Thanks for completing Module ${moduleId} 🥳`);
        setTimeout(() => {
          setPopupMessage("");
          setHasAnswered(false);
          router.push(`/aptitude?completedModule=${moduleId}`);
        }, 2500);
      } else {
        setPopupMessage("Correct! Level Completed! 🎉");
        setTimeout(() => {
          setPopupMessage("");
          setHasAnswered(false);
          if (level === "Easy") {
            setLevel("Medium");
            setCurrentQuestionIndex(0);
          } else if (level === "Medium") {
            setLevel("Hard");
            setCurrentQuestionIndex(0);
          } else {
            router.push("/aptitude/verbal");
          }
        }, 2500);
      }
    }
  };

  if (loading || loadingProgress) {
    return <div className="aptitude-page"><h2>Loading session...</h2></div>;
  }

  return (
    <div className="aptitude-page">
      {/* Rocking Popup Overlay */}
      {popupMessage && (
        <div className="rocking-popup-overlay">
          <div className="rocking-popup-content">
            <h2>{popupMessage}</h2>
            <p>Correct answer! Moving forward...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <h1>📊 Quantitative Aptitude</h1>
        <p>
          Improve your quantitative skills with company-focused aptitude
          questions and timed practice.
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="difficulty-tabs" style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        {["Easy", "Medium", "Hard"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            style={{
              padding: "10px 24px",
              borderRadius: "30px",
              border: "1px solid",
              borderColor: level.toLowerCase() === lvl.toLowerCase() 
                ? (lvl === "Easy" ? "#4caf50" : (lvl === "Medium" ? "#ff9800" : "#f44336"))
                : "#374151",
              backgroundColor: level.toLowerCase() === lvl.toLowerCase()
                ? (lvl === "Easy" ? "rgba(76, 175, 80, 0.15)" : (lvl === "Medium" ? "rgba(255, 152, 0, 0.15)" : "rgba(244, 67, 54, 0.15)"))
                : "#111827",
              color: level.toLowerCase() === lvl.toLowerCase()
                ? (lvl === "Easy" ? "#81c784" : (lvl === "Medium" ? "#ffb74d" : "#e57373"))
                : "#94a3b8",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              transition: "all 0.2s"
            }}
          >
            {lvl === "Easy" ? "🟢 Easy" : (lvl === "Medium" ? "🟡 Medium" : "🔴 Hard")}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="aptitude-stats">
        <div className="stat-card">
          <h2>{totalQuestions > 0 ? currentQuestionIndex + 1 : 0} / {totalQuestions}</h2>
          <p>Question Progress</p>
        </div>

        <div className="stat-card">
          <h2>60 Min</h2>
          <p>Practice Duration</p>
        </div>

        <div className="stat-card">
          <h2>{level}</h2>
          <p>Difficulty</p>
        </div>

        <div className="stat-card">
          <h2>85%</h2>
          <p>Target Score</p>
        </div>
      </div>

      {/* Timer */}
      <div className="timer-section">
        <h2>⏱ Practice Timer</h2>
        <Timer />
      </div>

      {/* Questions or Completion Block */}
      <div className="questions-section">
        {totalQuestions === 0 ? (
          <div style={{
            backgroundColor: "#111827",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            marginTop: "20px"
          }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: "20px" }}>🏆</span>
            <h2 style={{ color: "#fff", fontSize: "1.8rem", marginBottom: "12px" }}>
              All {level} Questions Solved!
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "1.05rem", marginBottom: "24px" }}>
              Congratulations! You have completed every question in the {level} section of Quantitative.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button
                onClick={() => handleResetLevel("quantitative")}
                className="solve-btn"
                style={{
                  background: "transparent",
                  border: "1px solid #2563eb",
                  color: "#2563eb",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                🔄 Reset Section
              </button>
              {level !== "Hard" ? (
                <button
                  onClick={() => handleLevelChange(level === "Easy" ? "Medium" : "Hard")}
                  className="solve-btn"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Go to {level === "Easy" ? "Medium" : "Hard"} Section ➔
                </button>
              ) : (
                <button
                  onClick={() => router.push("/aptitude/verbal")}
                  className="solve-btn"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Go to Verbal Ability ➔
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <h2>
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h2>

            {currentQuestion && (
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                onAnswerSubmit={handleAnswerSubmit}
              />
            )}

            {hasAnswered && !popupMessage && (
              <div className="manual-next-container" style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                <button 
                  onClick={handleNextQuestion}
                  className="solve-btn"
                  style={{ padding: "12px 30px", fontSize: "1rem" }}
                >
                  {currentQuestionIndex < totalQuestions - 1 ? "Next Question ➔" : "Go to Next Level ➔"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
