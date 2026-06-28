
import challenges from "../../data/challenges";

import ChallengeCard
from "../../components/gamification/ChallengeCard";

export default function ChallengesPage() {

  const completedChallenges =
    challenges.filter(
      (challenge) =>
        challenge.completed
    ).length;

  const totalChallenges =
    challenges.length;

  const completionRate =
    Math.round(
      (completedChallenges /
        totalChallenges) *
        100
    );

  return (
    <div className="page-container">

      <div className="page-header">

        <h1>
          🎯 Daily Challenges
        </h1>

        <p>
          Complete challenges, earn XP,
          unlock achievements and improve
          your placement readiness.
        </p>

      </div>

      {/* Stats */}

      <div className="challenge-stats">

        <div className="stat-card">
          <h2>
            {totalChallenges}
          </h2>

          <p>
            Total Challenges
          </p>
        </div>

        <div className="stat-card">
          <h2>
            {completedChallenges}
          </h2>

          <p>
            Completed
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
            1850 XP
          </h2>

          <p>
            XP Earned
          </p>
        </div>

      </div>

      {/* Progress */}

      <div className="challenge-progress">

        <div className="progress-header">

          <span>
            Challenge Progress
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

      {/* Challenge Cards */}

      <div className="challenge-grid">

        {challenges.map(
          (challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={
                challenge
              }
            />
          )
        )}

      </div>

    </div>
  );
}

