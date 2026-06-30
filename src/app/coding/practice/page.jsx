"use client";

import { useState } from "react";
import { useXP } from "../../../context/XPContext";
import useProgress from "../../../hooks/useProgress";
import codingQuestions from "../../../data/codingQuestions";
import Link from "next/link";
import useCodingProgress from "../../../hooks/useCodingProgress";

export default function CodingPracticePage() {
  const { xp } = useXP();
  const { progress } = useProgress();
  const [difficulty, setDifficulty] = useState("All");
  const { solvedIds } = useCodingProgress();

  const questions = codingQuestions.map((q) => ({
    ...q,
    solved: solvedIds.includes(q.id),
    xp: q.difficulty === "Easy" ? 50 : q.difficulty === "Medium" ? 100 : 150,
  }));

  const filteredQuestions =
    difficulty === "All"
      ? questions
      : questions.filter((q) => q.difficulty === difficulty);

  return (
    <div className="coding-page">

      {/* Header */}

      <div className="coding-header">

        <h1>
          💻 Coding Practice
        </h1>

        <p>
          Master Data Structures,
          Algorithms and Company
          Specific Coding Questions.
        </p>

      </div>

      {/* Stats */}

      <div className="coding-stats">

        <div className="coding-stat-card">
          <h3>Problems</h3>
          <h2>{codingQuestions.length}</h2>
        </div>

        <div className="coding-stat-card">
          <h3>Solved</h3>
          <h2>{solvedIds.length}</h2>
        </div>

        <div className="coding-stat-card">
          <h3>Success Rate</h3>
          <h2>{codingQuestions.length > 0 ? Math.round((solvedIds.length / codingQuestions.length) * 100) : 0}%</h2>
        </div>

        <div className="coding-stat-card">
          <h3>XP Earned</h3>
          <h2>{xp}</h2>
        </div>

      </div>

      {/* Filter */}

      <div className="filter-section">

        <div>
          <h2>
            Coding Challenges
          </h2>

          <p>
            Select difficulty and
            start solving.
          </p>
        </div>

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(
              e.target.value
            )
          }
        >
          <option value="All">
            All
          </option>

          <option value="Easy">
            Easy
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">
            Hard
          </option>

        </select>

      </div>

      {/* Question Table */}

      <div className="questions-table">

        <table>

          <thead>

            <tr>
              <th>Status</th>
              <th>Problem</th>
              <th>Difficulty</th>
              <th>Company</th>
              <th>XP</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredQuestions.map(
              (question) => (
                <tr
                  key={question.id}
                >

                  <td>
                    {question.solved
                      ? "✅"
                      : "⭕"}
                  </td>

                  <td>
                    {question.title}
                  </td>

                  <td>

                    <span
                      className={`difficulty-badge ${question.difficulty.toLowerCase()}`}
                    >
                      {
                        question.difficulty
                      }
                    </span>

                  </td>

                  <td>
                    {question.company}
                  </td>

                  <td>
                    +{question.xp}
                  </td>

                  <td>

                    <Link
                      href={`/coding/compiler?id=${question.id}`}
                      className="solve-btn"
                      style={{ textDecoration: "none", display: "inline-block", textAlign: "center" }}
                    >
                      Solve
                    </Link>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* Tips */}

      <div className="coding-tips">

        <h2>
          🚀 Placement Coding Tips
        </h2>

        <ul>
          <li>
            Solve at least 2 coding
            problems daily.
          </li>

          <li>
            Focus on Arrays,
            Strings, Linked Lists,
            Trees and Graphs.
          </li>

          <li>
            Practice company-specific
            coding rounds.
          </li>

          <li>
            Improve problem-solving
            speed and accuracy.
          </li>

          <li>
            Attempt mock coding
            contests weekly.
          </li>
        </ul>

      </div>

    </div>
  );
}
