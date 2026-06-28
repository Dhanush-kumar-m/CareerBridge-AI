export default function LeaderboardTable({
  users,
}) {
  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="leaderboard-container">

      <div className="leaderboard-header">

        <h2>
          🏆 Global Leaderboard
        </h2>

        <p>
          Compete with other students and earn XP.
        </p>

      </div>

      <table className="leaderboard-table">

        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>XP Earned</th>
            <th>Level</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.rank}
              className={
                user.rank <= 3
                  ? "top-rank"
                  : ""
              }
            >

              <td className="rank-cell">
                {getMedal(
                  user.rank
                )}
              </td>

              <td className="user-cell">

                <div className="user-avatar">
                  {user.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <span>
                  {user.name}
                </span>

              </td>

              <td>
                <span className="xp-badge">
                  ⭐ {user.xp}
                </span>
              </td>

              <td>
                {user.level ||
                  "Placement Pro"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}