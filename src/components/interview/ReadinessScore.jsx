export default function ReadinessScore({
  score,
}) {
  const getStatus = () => {
    if (score >= 90) {
      return "Placement Ready";
    }

    if (score >= 80) {
      return "Interview Ready";
    }

    if (score >= 70) {
      return "Good Progress";
    }

    return "Needs Practice";
  };

  return (
    <div className="interview-score-card">

      <div className="score-header">

        <div className="score-icon">
          🚀
        </div>

        <span className="score-level">
          {getStatus()}
        </span>

      </div>

      <h3>
        Interview Readiness
      </h3>

      <div
        className="score-circle"
        style={{
          background: `conic-gradient(
            #22c55e 0%,
            #2563eb ${score}%,
            #1f2937 ${score}% 100%
          )`,
        }}
      >

        <div className="score-inner">
          {score}%
        </div>

      </div>

      <p className="score-description">
        Overall readiness based on
        aptitude, coding, communication,
        confidence, and interview
        performance.
      </p>

      <div className="readiness-breakdown">

        <div className="breakdown-item">
          <span>🧠 Aptitude</span>
          <strong>85%</strong>
        </div>

        <div className="breakdown-item">
          <span>💻 Coding</span>
          <strong>78%</strong>
        </div>

        <div className="breakdown-item">
          <span>🗣️ Communication</span>
          <strong>82%</strong>
        </div>

        <div className="breakdown-item">
          <span>🎯 Confidence</span>
          <strong>80%</strong>
        </div>

      </div>

    </div>
  );
}