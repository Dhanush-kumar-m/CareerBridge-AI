export default function CompanyProgress({
  readiness,
}) {
  const getStatus = () => {
    if (readiness >= 85) {
      return "Excellent";
    }

    if (readiness >= 70) {
      return "Good";
    }

    if (readiness >= 50) {
      return "Average";
    }

    return "Needs Improvement";
  };

  return (
    <div className="company-progress-card">

      <div className="progress-header">

        <h3>
          🎯 Company Readiness
        </h3>

        <span className="progress-score">
          {readiness}%
        </span>

      </div>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${readiness}%`,
          }}
        />

      </div>

      <div className="progress-footer">

        <p>
          Current Status:
          {" "}
          <strong>
            {getStatus()}
          </strong>
        </p>

      </div>

    </div>
  );
}