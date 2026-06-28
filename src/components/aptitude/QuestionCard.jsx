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
            result.includes(
              "Correct"
            )
              ? "correct"
              : "wrong"
          }`}
        >

          <h3>
            {result}
          </h3>

          <p>
            Correct Answer:
            {" "}
            <strong>
              {question.answer}
            </strong>
          </p>

          {question.explanation && (
            <div className="explanation-box">

              <h4>
                Explanation
              </h4>

              <p>
                {
                  question.explanation
                }
              </p>

            </div>
          )}

        </div>

      )}

    </div>
  );
}