export default function ProgressCards() {
  const progress = [
    {
      title: "Aptitude Progress",
      value: 82,
      icon: "🧠",
    },
    {
      title: "Coding Progress",
      value: 76,
      icon: "💻",
    },
    {
      title: "Resume Progress",
      value: 90,
      icon: "📄",
    },
    {
      title: "Interview Progress",
      value: 70,
      icon: "🎤",
    },
  ];

  const getStatus = (value) => {
    if (value >= 85) return "Excellent";
    if (value >= 70) return "Good";
    return "Needs Work";
  };

  return (
    <div className="progress-grid">

      {progress.map((item) => (
        <div
          key={item.title}
          className="progress-card"
        >

          <div className="progress-header">

            <div className="progress-icon">
              {item.icon}
            </div>

            <span className="progress-status">
              {getStatus(item.value)}
            </span>

          </div>

          <h3>
            {item.title}
          </h3>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${item.value}%`,
              }}
            />

          </div>

          <div className="progress-footer">

            <strong>
              {item.value}%
            </strong>

            <span>
              Completed
            </span>

          </div>

        </div>
      ))}

    </div>
  );
}