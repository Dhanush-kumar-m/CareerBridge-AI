export default function ActivityFeed() {
  const activities = [
    {
      icon: "💻",
      text: "Solved Two Sum Problem",
      time: "10 mins ago",
    },
    {
      icon: "🧠",
      text: "Completed Aptitude Test",
      time: "30 mins ago",
    },
    {
      icon: "📄",
      text: "Improved ATS Score to 88%",
      time: "1 hour ago",
    },
    {
      icon: "🎤",
      text: "Finished HR Mock Interview",
      time: "3 hours ago",
    },
    {
      icon: "⭐",
      text: "Earned 100 XP",
      time: "Today",
    },
  ];

  return (
    <div className="dashboard-card">

      <div className="card-header">

        <h2>
          🔥 Recent Activity
        </h2>

        <span className="activity-count">
          {activities.length}
        </span>

      </div>

      <div className="activity-list">

        {activities.map(
          (activity, index) => (
            <div
              key={index}
              className="activity-item"
            >

              <div className="activity-icon">
                {activity.icon}
              </div>

              <div className="activity-content">

                <p>
                  {activity.text}
                </p>

                <span>
                  {activity.time}
                </span>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}