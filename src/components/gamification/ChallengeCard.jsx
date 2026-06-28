export default function ChallengeCard({
  challenge,
}) {
  return (
    <div className="challenge-card">

      <div className="challenge-header">

        <div className="challenge-icon">
          🎯
        </div>

        <span className="challenge-level">
          {challenge.level || "Daily"}
        </span>

      </div>

      <h3>
        {challenge.title}
      </h3>

      <p className="challenge-description">
        {challenge.description}
      </p>

      <div className="challenge-reward">

        <span>
          ⭐ Reward
        </span>

        <strong>
          {challenge.reward} XP
        </strong>

      </div>

      <div className="challenge-progress">

        <div className="challenge-progress-bar">

          <div
            className="challenge-progress-fill"
            style={{
              width: `${
                challenge.progress || 0
              }%`,
            }}
          />

        </div>

        <span>
          {challenge.progress || 0}%
        </span>

      </div>

      <button className="challenge-btn">
        Start Challenge →
      </button>

    </div>
  );
}