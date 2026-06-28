export default function ATSScore({
  score = 78,
}) {
  const getStatus = () => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 65) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="resume-card">

      <div className="ats-header">

        <div className="ats-icon">
          📄
        </div>

        <span className="ats-status">
          {getStatus()}
        </span>

      </div>

      <h2>
        ATS Score
      </h2>

      <div
        className="ats-circle"
        style={{
          background: `conic-gradient(
            #2563eb 0%,
            #7c3aed ${score}%,
            #1f2937 ${score}% 100%
          )`,
        }}
      >

        <div className="ats-inner">
          {score}%
        </div>

      </div>

      <p className="ats-description">
        Your resume is ATS compatible and
        can pass most applicant tracking
        systems.
      </p>

      <div className="ats-metrics">

        <div className="ats-metric">
          <span>Keywords</span>
          <strong>85%</strong>
        </div>

        <div className="ats-metric">
          <span>Formatting</span>
          <strong>92%</strong>
        </div>

        <div className="ats-metric">
          <span>Skills Match</span>
          <strong>78%</strong>
        </div>

      </div>

      <button className="ats-btn">
        Improve Resume
      </button>

    </div>
  );
}