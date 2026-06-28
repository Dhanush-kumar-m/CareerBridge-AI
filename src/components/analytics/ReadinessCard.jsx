export default function ReadinessCard({
  title,
  value,
}) {
  const getIcon = () => {
    switch (title) {
      case "Aptitude":
        return "🧠";
      case "Coding":
        return "💻";
      case "Resume":
        return "📄";
      case "Interview":
        return "🎤";
      case "Placement":
        return "🚀";
      default:
        return "📊";
    }
  };

  return (
    <div className="readiness-card">

      <div className="readiness-header">

        <span className="readiness-icon">
          {getIcon()}
        </span>

        <h3>
          {title}
        </h3>

      </div>

      <h1>
        {value}%
      </h1>

      <div className="readiness-progress">

        <div
          className="readiness-fill"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

      <p className="readiness-status">

        {value >= 85
          ? "Excellent"
          : value >= 70
          ? "Good"
          : value >= 50
          ? "Average"
          : "Needs Improvement"}

      </p>

    </div>
  );
}