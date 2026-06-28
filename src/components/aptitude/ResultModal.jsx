export default function ResultModal({
  score,
  totalQuestions = 10,
  onRetry,
  onDashboard,
}) {
  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  const getRemark = () => {
    if (percentage >= 90)
      return "🏆 Excellent Performance";
    if (percentage >= 75)
      return "🎯 Great Job";
    if (percentage >= 60)
      return "👍 Good Effort";

    return "📚 Keep Practicing";
  };

  return (
    <div className="result-modal">

      <div className="result-card">

        <div className="result-icon">
          🎉
        </div>

        <h2>
          Quiz Completed
        </h2>

        <p className="result-remark">
          {getRemark()}
        </p>

        <div className="result-score">

          <h1>
            {score}/{totalQuestions}
          </h1>

          <span>
            {percentage}%
          </span>

        </div>

        <div className="result-stats">

          <div className="result-stat">

            <h3>
              Correct
            </h3>

            <p>
              {score}
            </p>

          </div>

          <div className="result-stat">

            <h3>
              Wrong
            </h3>

            <p>
              {totalQuestions - score}
            </p>

          </div>

          <div className="result-stat">

            <h3>
              Accuracy
            </h3>

            <p>
              {percentage}%
            </p>

          </div>

        </div>

        <div className="result-actions">

          <button
            className="retry-btn"
            onClick={onRetry}
          >
            Retry Quiz
          </button>

          <button
            className="dashboard-btn"
            onClick={onDashboard}
          >
            Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}