"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ProgressChart({
  data,
}) {
  return (
    <div className="chart-card">

      <div className="chart-header">

        <h2>
          📈 Progress Trend
        </h2>

        <p>
          Track your aptitude and coding growth
          over time.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart
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
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="aptitude"
            stroke="#2563EB"
            strokeWidth={3}
            activeDot={{
              r: 8,
            }}
            name="Aptitude"
          />

          <Line
            type="monotone"
            dataKey="coding"
            stroke="#7C3AED"
            strokeWidth={3}
            activeDot={{
              r: 8,
            }}
            name="Coding"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}