export default function AnalyticsStats() {
  const stats = [
    {
      title: "Aptitude Score",
      value: "82%",
      icon: "🧠",
    },
    {
      title: "Coding Score",
      value: "76%",
      icon: "💻",
    },
    {
      title: "ATS Score",
      value: "88%",
      icon: "📄",
    },
    {
      title: "Placement Score",
      value: "79%",
      icon: "🚀",
    },
  ];

  return (
    <div className="analytics-stats">

      {stats.map((stat) => (
        <div
          key={stat.title}
          className="analytics-card"
        >

          <div className="analytics-icon">
            {stat.icon}
          </div>

          <h3>
            {stat.title}
          </h3>

          <h1>
            {stat.value}
          </h1>

        </div>
      ))}

    </div>
  );
}