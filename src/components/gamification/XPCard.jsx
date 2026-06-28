export default function XPCard({
  xp,
}) {
  const level =
    Math.floor(xp / 1000) + 1;

  const currentXP =
    xp % 1000;

  const progress =
    (currentXP / 1000) * 100;

  return (
    <div className="xp-card">

      <div className="xp-header">

        <div className="xp-icon">
          🔥
        </div>

        <span className="xp-level">
          Level {level}
        </span>

      </div>

      <h2>
        Total XP
      </h2>

      <h1>
        {xp.toLocaleString()}
      </h1>

      <div className="xp-progress">

        <div
          className="xp-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="xp-info">
        {currentXP} / 1000 XP
        to next level
      </p>

      <div className="xp-rank">
        🏆 Placement Champion
      </div>

    </div>
  );
}