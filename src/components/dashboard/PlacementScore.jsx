export default function PlacementScore() {
  const score = 81;

  const getStatus = () => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Interview Ready";
    if (score >= 70) return "Good Progress";
    return "Needs Improvement";
  };

  return (
    <div className="placement-score-card">

      <div className="placement-header">

        <h2>
          🚀 Placement Readiness
        </h2>

        <span className="placement-status">
          {getStatus()}
        </span>

      </div>

      <div className="score-circle">

        <div className="score-inner">
          {score}%
        </div>

      </div>

      <div className="placement-info">

        <p>
          You are interview ready.
          Continue improving coding,
          aptitude, and mock interview
          performance to reach
          90%+ readiness.
        </p>

      </div>

      <div className="placement-metrics">

        <div className="metric-item">
          <span>🧠 Aptitude</span>
          <strong>85%</strong>
        </div>

        <div className="metric-item">
          <span>💻 Coding</span>
          <strong>78%</strong>
        </div>

        <div className="metric-item">
          <span>📄 ATS</span>
          <strong>88%</strong>
        </div>

        <div className="metric-item">
          <span>🎤 Interview</span>
          <strong>81%</strong>
        </div>

      </div>

      <button className="improve-btn">
        Improve Score →
      </button>

    </div>
  );
}