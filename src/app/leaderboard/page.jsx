import leaderboard from "../../data/leaderboard";

import LeaderboardTable
from "../../components/gamification/LeaderboardTable";

export default function LeaderboardPage() {

  const topPlayer =
    leaderboard[0];

  return (
    <div className="leaderboard-page">

      {/* Header */}

      <div className="page-header">

        <h1>
          🏆 Leaderboard
        </h1>

        <p>
          Compete with fellow students,
          earn XP, complete challenges,
          and climb the rankings.
        </p>

      </div>

      {/* Stats */}

      <div className="leaderboard-stats">

        <div className="stat-card">
          <h2>
            {leaderboard.length}
          </h2>

          <p>
            Active Players
          </p>
        </div>

        <div className="stat-card">
          <h2>
            25,000+
          </h2>

          <p>
            Total XP Earned
          </p>
        </div>

        <div className="stat-card">
          <h2>
            1,500+
          </h2>

          <p>
            Challenges Completed
          </p>
        </div>

        <div className="stat-card">
          <h2>
            500+
          </h2>

          <p>
            Achievements Unlocked
          </p>
        </div>

      </div>

      {/* Champion Card */}

      {topPlayer && (

        <div className="champion-card">

          <div className="champion-icon">
            👑
          </div>

          <div>

            <h2>
              Current Champion
            </h2>

            <h3>
              {topPlayer.name}
            </h3>

            <p>
              XP: {topPlayer.xp}
            </p>

          </div>

        </div>

      )}

      {/* Leaderboard */}

      <div className="leaderboard-section">

        <h2>
          📊 Rankings
        </h2>

        <LeaderboardTable
          users={leaderboard}
        />

      </div>

      {/* Rewards */}

      <div className="leaderboard-rewards">

        <h2>
          🎁 Rewards & Benefits
        </h2>

        <ul>

          <li>
            🥇 Rank 1 - Elite Placement Badge
          </li>

          <li>
            🥈 Rank 2 - Coding Champion Badge
          </li>

          <li>
            🥉 Rank 3 - Aptitude Master Badge
          </li>

          <li>
            🔥 Weekly Streak Rewards
          </li>

          <li>
            🚀 Exclusive Company Challenges
          </li>

        </ul>

      </div>

    </div>
  );
}