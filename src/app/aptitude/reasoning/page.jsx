"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import aptitudeData from "../../../data/aptitude";
import QuestionCard from "../../../components/aptitude/QuestionCard";
import Timer from "../../../components/aptitude/Timer";
import useAptitudeProgress from "../../../hooks/useAptitudeProgress";
import { modules } from "../../../data/aptitudeCurriculum";

export default function ReasoningPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get("module");
  const difficultyParam = searchParams.get("difficulty") || "Easy";

  const [level, setLevel] = useState("Easy");
  const { solvedList, loading: loadingProgress, markAsSolved, resetCategoryProgress } = useAptitudeProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [moduleId, setModuleId] = useState(null);
  
  const [isModuleCompleted, setIsModuleCompleted] = useState(false);
  const redirectTimeoutRef = useRef(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Sync state with URL Query params reactively
  useEffect(() => {
    if (moduleParam) {
      setModuleId(parseInt(moduleParam, 10));
    }
    if (difficultyParam) {
      setLevel(difficultyParam);
    }
    setCurrentQuestionIndex(0);
    setHasAnswered(false);
    setReloadTrigger(prev => prev + 1);
  }, [moduleParam, difficultyParam]);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  // Update session questions when difficulty level or reloadTrigger changes (not on solvedList changes during active session)
  useEffect(() => {
    if (!loadingProgress) {
      const questionsOfLevel = aptitudeData.reasoning.filter(
        (q) => q.difficulty.toLowerCase() === level.toLowerCase()
      );
      const unsolved = questionsOfLevel.filter(
        (q) => !solvedList.includes(`reasoning_${q.id}`)
      );
      setSessionQuestions(unsolved);
      setLoading(false);
    }
  }, [loadingProgress, level, reloadTrigger]);

  const handleLevelChange = (lvl) => {
    setLevel(lvl);
    setCurrentQuestionIndex(0);
    setHasAnswered(false);
    setReloadTrigger(prev => prev + 1);
  };

  const handleResetLevel = (category) => {
    const questionsOfLevel = aptitudeData.reasoning.filter(
      (q) => q.difficulty.toLowerCase() === level.toLowerCase()
    );
    const keysToRemove = questionsOfLevel.map((q) => `${category}_${q.id}`);
    resetCategoryProgress(keysToRemove);
    setCurrentQuestionIndex(0);
    setHasAnswered(false);
    setReloadTrigger(prev => prev + 1);
  };

  const totalQuestions = sessionQuestions.length;
  const currentQuestion = sessionQuestions[currentQuestionIndex];

  const handleAnswerSubmit = (isCorrect) => {
    setHasAnswered(true);
    if (isCorrect && currentQuestion) {
      const key = `reasoning_${currentQuestion.id}`;
      markAsSolved(key);
      
      setPopupMessage("Now I will give the simple explanation to solve this question with formula 💡🚀");
      setTimeout(() => {
        setPopupMessage("");
      }, 2500);
    }
  };

  const handleCancelRedirect = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
    }
    setPopupMessage("");
    setIsModuleCompleted(false);
    setHasAnswered(false);
    router.push("/aptitude");
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setHasAnswered(false);
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      if (moduleId) {
        const nextModuleId = parseInt(moduleId, 10) + 1;
        const nextModule = modules.find((m) => m.id === nextModuleId);
        if (nextModule) {
          const categoryPath = nextModule.category === "Quantitative" 
            ? "quantitative" 
            : nextModule.category === "Reasoning" 
            ? "reasoning" 
            : nextModule.category === "Verbal" 
            ? "verbal" 
            : nextModule.category === "Data Interpretation" 
            ? "data-interpretation" 
            : "abstract-reasoning";
            
          setIsModuleCompleted(true);
          setPopupMessage(`Module ${moduleId} completed (get ready for Module ${nextModuleId})... 🚀`);
          
          redirectTimeoutRef.current = setTimeout(() => {
            setPopupMessage("");
            setIsModuleCompleted(false);
            setHasAnswered(false);
            router.push(`/aptitude/${categoryPath}?difficulty=Easy&module=${nextModuleId}`);
          }, 3500);
        } else {
          setIsModuleCompleted(true);
          setPopupMessage(`Module ${moduleId} completed! All reasoning practice complete! 🥳`);
          redirectTimeoutRef.current = setTimeout(() => {
            setPopupMessage("");
            setIsModuleCompleted(false);
            setHasAnswered(false);
            router.push("/aptitude");
          }, 3500);
        }
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
          <div className="rocking-popup-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
            <h2>{popupMessage}</h2>
            {!isModuleCompleted ? (
              <p>Correct answer! Moving forward...</p>
            ) : (
              <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                <button
                  onClick={handleCancelRedirect}
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    border: "1px solid #ef4444",
                    color: "#f87171",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.35)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"}
                >
                  Not Interested (Exit)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <h1>🧩 Logical Reasoning</h1>
        <p>
          Strengthen your analytical and problem-solving abilities through
          reasoning practice questions.
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
          <h2>45 Min</h2>
          <p>Practice Duration</p>
        </div>

        <div className="stat-card">
          <h2>{level}</h2>
          <p>Difficulty</p>
        </div>

        <div className="stat-card">
          <h2>80%</h2>
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
              Congratulations! You have completed every question in the {level} section of Logical Reasoning.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button
                onClick={() => handleResetLevel("reasoning")}
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
                  onClick={() => router.push("/aptitude/data-interpretation")}
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
                  Go to Data Interpretation ➔
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
