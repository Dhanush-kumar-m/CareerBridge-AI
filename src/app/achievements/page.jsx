
import achievements from "../../data/achievements";

import AchievementCard
from "../../components/gamification/AchievementCard";

export default function AchievementsPage() {

  const unlockedAchievements =
    achievements.filter(
      (achievement) =>
        achievement.unlocked
    ).length;

  const totalAchievements =
    achievements.length;

  const completionRate =
    Math.round(
      (unlockedAchievements /
        totalAchievements) *
        100
    );

  return (
    <div className="achievements-page">

      <div className="page-header">

        <h1>
          🏅 Achievements
        </h1>

        <p>
          Unlock badges, earn XP,
          complete challenges and
          track your placement journey.
        </p>

      </div>

      <div className="achievement-stats">

        <div className="stat-card">
          <h2>
            {totalAchievements}
          </h2>
          <p>
            Total Achievements
          </p>
        </div>

        <div className="stat-card">
          <h2>
            {unlockedAchievements}
          </h2>
          <p>
            Unlocked
          </p>
        </div>

        <div className="stat-card">
          <h2>
            {completionRate}%
          </h2>
          <p>
            Completion Rate
          </p>
        </div>

        <div className="stat-card">
          <h2>
            2450 XP
          </h2>
          <p>
            Total XP Earned
          </p>
        </div>

      </div>

      <div className="achievement-progress">

        <div className="progress-info">

          <span>
            Overall Progress
          </span>

          <span>
            {completionRate}%
          </span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${completionRate}%`,
            }}
          />

        </div>

      </div>

      <div className="achievement-grid">

        {achievements.map(
          (achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={
                achievement
              }
            />
          )
        )}

      </div>

    </div>
  );
}

