export default function CommunicationScore({
  score,
}) {
  const getLevel = () => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="interview-score-card">

      <div className="score-header">

        <div className="score-icon">
          🗣️
        </div>

        <span className="score-level">
          {getLevel()}
        </span>

      </div>

      <h3>
        Communication Score
      </h3>

      <div className="score-circle">

        <div className="score-inner">
          {score}%
        </div>

      </div>

      <p className="score-description">
        Measures fluency, clarity,
        confidence, and professional
        communication skills.
      </p>

    </div>
  );
}
