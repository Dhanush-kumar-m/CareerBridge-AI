"use client";

export default function DailyGoal() {
  const goals = [
    {
      task: "Solve 5 Aptitude Questions",
      completed: true,
    },
    {
      task: "Solve 2 Coding Problems",
      completed: true,
    },
    {
      task: "Complete 1 Mock Interview",
      completed: false,
    },
    {
      task: "Improve Resume Score",
      completed: false,
    },
  ];

  const completedGoals =
    goals.filter(
      (goal) => goal.completed
    ).length;

  const progress =
    (completedGoals /
      goals.length) *
    100;

  return (
    <div className="dashboard-card">

      <div className="goal-header">

        <h2>
          🎯 Daily Goal
        </h2>

        <span>
          {completedGoals}/
          {goals.length}
        </span>

      </div>

      <div className="goal-progress">

        <div
          className="goal-fill"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="goal-list">

        {goals.map(
          (goal, index) => (
            <div
              key={index}
              className="goal-item"
            >

              <span>
                {goal.completed
                  ? "✅"
                  : "⭕"}
              </span>

              <p>
                {goal.task}
              </p>

            </div>
          )
        )}

      </div>

      <button className="dashboard-btn">
        Start Challenge
      </button>

    </div>
  );
}