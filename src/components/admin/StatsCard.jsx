export default function StatsCard({
  title,
  value,
  icon = "📊",
}) {
  return (
    <div className="stats-card">

      <div className="stats-top">

        <span className="stats-icon">
          {icon}
        </span>

      </div>

      <h3>
        {title}
      </h3>

      <h1>
        {value}
      </h1>

    </div>
  );
}