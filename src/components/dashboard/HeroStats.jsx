export default function HeroStats() {
  const stats = [
    {
      title: "Aptitude Score",
      value: "85%",
      icon: "🧠",
      trend: "+5%",
    },
    {
      title: "Coding Score",
      value: "78%",
      icon: "💻",
      trend: "+8%",
    },
    {
      title: "ATS Score",
      value: "88%",
      icon: "📄",
      trend: "+12%",
    },
    {
      title: "Interview Score",
      value: "81%",
      icon: "🎤",
      trend: "+6%",
    },
  ];

  return (
    <div className="hero-stats">

      {stats.map((stat) => (
        <div
          key={stat.title}
          className="hero-stat-card"
        >

          <div className="hero-stat-header">

            <div className="hero-stat-icon">
              {stat.icon}
            </div>

            <span className="hero-trend">
              {stat.trend}
            </span>

          </div>

          <h4>
            {stat.title}
          </h4>

          <h2>
            {stat.value}
          </h2>

        </div>
      ))}

    </div>
  );
}