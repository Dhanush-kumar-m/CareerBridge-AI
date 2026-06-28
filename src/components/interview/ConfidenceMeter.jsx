export default function ConfidenceMeter({
  score,
}) {
  const getLevel = () => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Confident";
    if (score >= 60) return "Average";
    return "Needs Practice";
  };

  return (
    <div className="interview-score-card">

      <div className="score-header">

        <div className="score-icon">
          🎯
        </div>

        <span className="score-level">
          {getLevel()}
        </span>

      </div>

      <h3>
        Confidence Score
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
        Measures confidence level,
        body language, speaking style,
        and interview presence.
      </p>

      <div className="score-tips">

        <div className="tip-item">
          ✅ Maintain eye contact
        </div>

        <div className="tip-item">
          ✅ Speak clearly
        </div>

        <div className="tip-item">
          ✅ Avoid long pauses
        </div>

      </div>

    </div>
  );
}