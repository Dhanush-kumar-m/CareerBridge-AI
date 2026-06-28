"use client";

export default function InterviewBot({
  question,
  currentQuestion = 1,
  totalQuestions = 10,
}) {
  return (
    <div className="interview-card">

      <div className="interview-header">

        <div className="interviewer-avatar">
          🤖
        </div>

        <div>
          <h2>
            AI Interviewer
          </h2>

          <p>
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>

      </div>

      <div className="question-box">

        <h3>
          🎤 Interview Question
        </h3>

        <p className="question-text">
          {question}
        </p>

      </div>

      <div className="interview-tips">

        <h4>
          💡 Tips
        </h4>

        <ul>
          <li>
            Speak confidently and clearly
          </li>

          <li>
            Structure your answer logically
          </li>

          <li>
            Give practical examples
          </li>

          <li>
            Maintain a professional tone
          </li>
        </ul>

      </div>

    </div>
  );
}