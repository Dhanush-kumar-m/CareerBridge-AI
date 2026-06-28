
"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function AnalyticsPage() {
  const progressData = [
    { month: "Jan", aptitude: 40, coding: 25 },
    { month: "Feb", aptitude: 55, coding: 40 },
    { month: "Mar", aptitude: 65, coding: 55 },
    { month: "Apr", aptitude: 75, coding: 65 },
    { month: "May", aptitude: 85, coding: 78 },
    { month: "Jun", aptitude: 92, coding: 88 },
  ];

  const weeklyActivity = [
    { day: "Mon", solved: 15 },
    { day: "Tue", solved: 22 },
    { day: "Wed", solved: 18 },
    { day: "Thu", solved: 30 },
    { day: "Fri", solved: 28 },
    { day: "Sat", solved: 35 },
    { day: "Sun", solved: 25 },
  ];

  const readinessData = [
    { name: "Aptitude", value: 85 },
    { name: "Coding", value: 78 },
    { name: "Resume", value: 88 },
    { name: "Interview", value: 72 },
  ];

  const COLORS = [
    "#2563EB",
    "#7C3AED",
    "#22C55E",
    "#F59E0B",
  ];

  return (
    <div className="analytics-container">

      {/* Header */}

      <div className="analytics-header">

        <h1>
          📊 Analytics Dashboard
        </h1>

        <p>
          Track your placement preparation,
          performance trends and readiness score.
        </p>

      </div>

      {/* Summary Cards */}

      <div className="analytics-summary">

        <div className="summary-card">
          <span>🏆</span>

          <div>
            <h3>Placement Ready</h3>
            <p>81% Readiness Score</p>
          </div>
        </div>

        <div className="summary-card">
          <span>💻</span>

          <div>
            <h3>Problems Solved</h3>
            <p>245 Coding Questions</p>
          </div>
        </div>

        <div className="summary-card">
          <span>🧠</span>

          <div>
            <h3>Aptitude Completed</h3>
            <p>520 Questions</p>
          </div>
        </div>

        <div className="summary-card">
          <span>📄</span>

          <div>
            <h3>ATS Score</h3>
            <p>88%</p>
          </div>
        </div>

      </div>

      {/* Main Stats */}

      <div className="analytics-cards">

        <div className="analytics-card">
          <h3>Placement Readiness</h3>
          <h2>81%</h2>
          <p>Excellent Progress</p>
        </div>

        <div className="analytics-card">
          <h3>Aptitude Score</h3>
          <h2>85%</h2>
          <p>Top 15% Students</p>
        </div>

        <div className="analytics-card">
          <h3>Coding Score</h3>
          <h2>78%</h2>
          <p>245 Problems Solved</p>
        </div>

        <div className="analytics-card">
          <h3>ATS Score</h3>
          <h2>88%</h2>
          <p>Resume Approved</p>
        </div>

      </div>

      {/* Progress Trend */}

      <div className="chart-box">

        <h2>
          📈 Progress Trend
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart data={progressData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="aptitude"
              stroke="#2563EB"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="coding"
              stroke="#7C3AED"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Weekly Activity */}

      <div className="chart-box">

        <h2>
          🔥 Weekly Activity
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={weeklyActivity}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="solved"
              fill="#2563EB"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Readiness Breakdown */}

      <div className="chart-box">

        <h2>
          🎯 Readiness Breakdown
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>

            <Pie
              data={readinessData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label
            >
              {readinessData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Achievements */}

      <div className="achievement-section">

        <h2>
          🏅 Recent Achievements
        </h2>

        <div className="achievement-cards">

          <div className="achievement-card">
            🚀 First 100 Coding Problems
          </div>

          <div className="achievement-card">
            🧠 Aptitude Master
          </div>

          <div className="achievement-card">
            📄 ATS Score Above 85%
          </div>

          <div className="achievement-card">
            🎤 Mock Interview Completed
          </div>

        </div>

      </div>

    </div>
  );
}

