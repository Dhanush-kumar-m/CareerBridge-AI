"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ActivityChart({
  data,
}) {
  return (
    <div className="chart-card">

      <div className="chart-header">

        <h2>
          📈 Weekly Activity
        </h2>

        <p>
          Questions solved this week
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="questions"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
            name="Questions Solved"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}