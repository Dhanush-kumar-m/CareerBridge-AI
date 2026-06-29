"use client";

import { useState } from "react";

export default function QuestionCard({
  question,
  onAnswerSubmit,
}) {
  const [selected, setSelected] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [result, setResult] =
    useState("");

  const checkAnswer = () => {
    if (!selected) {
      alert(
        "Please select an answer."
      );
      return;
    }

    setSubmitted(true);

    const isCorrect = selected === question.answer;

    if (isCorrect) {
      setResult("Correct ✅");
    } else {
      setResult("Wrong ❌");
    }

    if (onAnswerSubmit) {
      onAnswerSubmit(isCorrect);
    }
  };

  return (
    <div className="question-card">

      <div className="question-header">

        <h2>
          {question.question}
        </h2>

      </div>

      <div className="options-container">

        {question.options.map(
          (option) => (
            <button
              key={option}
              className={`option-btn
                ${
                  selected === option
                    ? "selected-option"
                    : ""
                }
              `}
              onClick={() =>
                setSelected(option)
              }
            >
              {option}
            </button>
          )
        )}

      </div>

      <button
        className="submit-btn"
        onClick={checkAnswer}
      >
        Submit Answer
      </button>

      {submitted && (
        <div
          className={`result-box ${
            result.includes("Correct")
              ? "correct"
              : "wrong"
          }`}
        >
          <h3>
            {result}
          </h3>

          {!result.includes("Correct") && question.hint && (
            <div 
              className="hint-box"
              style={{
                marginTop: "18px",
                padding: "20px",
                background: "rgba(239, 68, 68, 0.06)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "10px",
                textAlign: "left"
              }}
            >
              <h4 style={{ color: "#f87171", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 10px 0", fontSize: "1.05rem", fontWeight: "700" }}>
                <span>💡</span> Hint to solve
              </h4>
              <div 
                style={{ 
                  color: "#cbd5e1", 
                  fontSize: "0.92rem", 
                  lineHeight: "1.6"
                }}
              >
                {question.hint}
              </div>
            </div>
          )}

          {result.includes("Correct") && question.explanation && (
            <div 
              className="explanation-box"
              style={{
                marginTop: "18px",
                padding: "20px",
                background: "rgba(16, 185, 129, 0.06)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                borderRadius: "10px",
                textAlign: "left"
              }}
            >
              <h4 style={{ color: "#34d399", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 10px 0", fontSize: "1.05rem", fontWeight: "700" }}>
                <span>💡</span> Simple Solve Method & Formula
              </h4>
              <div 
                style={{ 
                  color: "#cbd5e1", 
                  fontSize: "0.92rem", 
                  lineHeight: "1.6", 
                  whiteSpace: "pre-line" 
                }}
              >
                {question.explanation}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}