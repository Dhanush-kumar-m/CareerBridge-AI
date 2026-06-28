"use client";

import { useEffect, useState } from "react";

export default function Timer() {
  const TOTAL_TIME = 300; // 5 Minutes

  const [seconds, setSeconds] =
    useState(TOTAL_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () =>
      clearInterval(interval);
  }, []);

  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    seconds % 60;

  const percentage =
    (seconds / TOTAL_TIME) * 100;

  return (
    <div className="timer-card">

      <div className="timer-header">

        <h3>
          ⏱ Quiz Timer
        </h3>

        <span
          className={
            seconds <= 60
              ? "timer-danger"
              : ""
          }
        >
          {String(minutes).padStart(
            2,
            "0"
          )}
          :
          {String(
            remainingSeconds
          ).padStart(2, "0")}
        </span>

      </div>

      <div className="timer-progress">

        <div
          className={`timer-fill ${
            seconds <= 60
              ? "danger-fill"
              : ""
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}