export default function AchievementCard({
  achievement,
}) {
  return (
    <div
      className={`achievement-card ${
        achievement.unlocked
          ? "achievement-unlocked"
          : "achievement-locked"
      }`}
    >

      <div className="achievement-header">

        <div className="achievement-icon">
          {achievement.icon}
        </div>

        <span className="achievement-badge">
          {achievement.unlocked
            ? "Unlocked"
            : "Locked"}
        </span>

      </div>

      <h3>
        {achievement.title}
      </h3>

      <p className="achievement-description">
        {achievement.description}
      </p>

      <div className="achievement-footer">

        <span className="achievement-xp">
          ⭐ {achievement.xp} XP
        </span>

      </div>

    </div>
  );
}