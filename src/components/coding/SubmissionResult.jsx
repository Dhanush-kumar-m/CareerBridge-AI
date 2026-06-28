"use client";

export default function SubmissionResult({
  passed,
  passedCount = 0,
  totalCount = 2,
  hint = "",
  error = "",
  line = null,
}) {
  return (
    <div
      className={`submission-result ${
        passed
          ? "success-result"
          : "failed-result"
      }`}
      style={{ marginTop: "20px", borderRadius: "12px", padding: "20px" }}
    >

      {passed ? (
        <>
          <div className="result-icon">
            🎉
          </div>

          <h2>
            All Test Cases Passed ({passedCount}/{totalCount})
          </h2>

          <p>
            Congratulations! Your solution has passed all test cases.
          </p>

          <div className="result-stats">

            <div className="result-stat">
              <h4>Status</h4>
              <span>
                Accepted ✅
              </span>
            </div>

            <div className="result-stat">
              <h4>XP Earned</h4>
              <span>
                +50 ⭐
              </span>
            </div>

            <div className="result-stat">
              <h4>Streak</h4>
              <span>
                +1 🔥
              </span>
            </div>

          </div>
        </>
      ) : (
        <>
          <div className="result-icon">
            ❌
          </div>

          <h2>
            Test Cases Failed ({passedCount}/{totalCount})
          </h2>

          {error ? (
            <div className="error-details" style={{ backgroundColor: "#3a1e1e", borderLeft: "4px solid #f44336", padding: "12px", borderRadius: "6px", margin: "12px 0", textAlign: "left", fontFamily: "monospace" }}>
              <strong style={{ color: "#ff8a80" }}>Error:</strong> {error}
              {line !== null && (
                <div style={{ marginTop: "4px", fontSize: "0.9rem", color: "#ffb74d" }}>
                  📍 Occurred at Line <strong>{line}</strong>
                </div>
              )}
            </div>
          ) : (
            <p>
              Some test cases returned incorrect outputs. Review your logic and try again.
            </p>
          )}

          {hint && (
            <div className="hint-details" style={{ backgroundColor: "#1e3a2f", borderLeft: "4px solid #4caf50", padding: "12px", borderRadius: "6px", margin: "12px 0", textAlign: "left" }}>
              <strong style={{ color: "#a5d6a7" }}>💡 Solution Hint:</strong>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.95rem", color: "#e8f5e9" }}>{hint}</p>
            </div>
          )}

          <div className="result-stats">

            <div className="result-stat">
              <h4>Status</h4>
              <span>
                Wrong Answer
              </span>
            </div>

            <div className="result-stat">
              <h4>Suggestion</h4>
              <span>
                Review logic
              </span>
            </div>

          </div>
        </>
      )}

    </div>
  );
}