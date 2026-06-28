import technicalQuestions
from "../../../data/technicalQuestions";

import InterviewBot
from "../../../components/interview/InterviewBot";

import VoiceRecorder
from "../../../components/interview/VoiceRecorder";

export default function TechnicalPage() {
  return (
    <div className="interview-page">

      {/* Header */}

      <div className="page-header">

        <h1>
          💻 Technical Mock Interview
        </h1>

        <p>
          Practice technical interview questions,
          improve problem-solving skills and prepare
          for software engineering placement rounds.
        </p>

      </div>

      {/* Statistics */}

      <div className="interview-stats">

        <div className="stat-card">
          <h2>300+</h2>
          <p>Technical Questions</p>
        </div>

        <div className="stat-card">
          <h2>25+</h2>
          <p>Companies Covered</p>
        </div>

        <div className="stat-card">
          <h2>85%</h2>
          <p>Target Score</p>
        </div>

        <div className="stat-card">
          <h2>15 Min</h2>
          <p>Interview Session</p>
        </div>

      </div>

      {/* Current Question */}

      <div className="interview-section">

        <h2>
          🧠 Technical Question
        </h2>

        <InterviewBot
          question={
            technicalQuestions[0].question
          }
        />

      </div>

      {/* Voice Recorder */}

      <div className="interview-section">

        <h2>
          🎙 Record Your Answer
        </h2>

        <VoiceRecorder type="technical" />

      </div>

      {/* Important Topics */}

      <div className="interview-section">

        <h2>
          📚 Important Technical Topics
        </h2>

        <div className="topics-grid">

          <span>Data Structures</span>
          <span>Algorithms</span>
          <span>OOPs</span>
          <span>DBMS</span>
          <span>SQL</span>
          <span>Operating Systems</span>
          <span>Computer Networks</span>
          <span>Java</span>
          <span>Python</span>
          <span>JavaScript</span>

        </div>

      </div>

      {/* Tips */}

      <div className="interview-section">

        <h2>
          🚀 Technical Interview Tips
        </h2>

        <ul className="tips-list">

          <li>
            Explain your thought process clearly.
          </li>

          <li>
            Focus on time and space complexity.
          </li>

          <li>
            Revise DSA concepts regularly.
          </li>

          <li>
            Practice coding problems daily.
          </li>

          <li>
            Prepare DBMS, OOPs and OS fundamentals.
          </li>

          <li>
            Use real-world examples while answering.
          </li>

        </ul>

      </div>

    </div>
  );
}