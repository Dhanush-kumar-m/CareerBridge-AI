import hrQuestions
from "../../../data/hrQuestions";

import InterviewBot
from "../../../components/interview/InterviewBot";

import VoiceRecorder
from "../../../components/interview/VoiceRecorder";

export default function HRPage() {
  return (
    <div className="interview-page">

      {/* Header */}

      <div className="page-header">

        <h1>
          🎤 HR Mock Interview
        </h1>

        <p>
          Practice common HR interview
          questions, record your answers,
          and improve your communication skills.
        </p>

      </div>

      {/* Statistics */}

      <div className="interview-stats">

        <div className="stat-card">
          <h2>150+</h2>
          <p>HR Questions</p>
        </div>

        <div className="stat-card">
          <h2>20+</h2>
          <p>Companies Covered</p>
        </div>

        <div className="stat-card">
          <h2>85%</h2>
          <p>Target Score</p>
        </div>

        <div className="stat-card">
          <h2>10 Min</h2>
          <p>Interview Session</p>
        </div>

      </div>

      {/* Current Question */}

      <div className="interview-section">

        <h2>
          💬 Interview Question
        </h2>

        <InterviewBot
          question={
            hrQuestions[0].question
          }
        />

      </div>

      {/* Voice Recorder */}

      <div className="interview-section">

        <h2>
          🎙 Record Your Answer
        </h2>

        <VoiceRecorder type="hr" />

      </div>

      {/* Tips */}

      <div className="interview-section">

        <h2>
          🚀 HR Interview Tips
        </h2>

        <ul className="tips-list">

          <li>
            Introduce yourself confidently.
          </li>

          <li>
            Maintain eye contact and positive body language.
          </li>

          <li>
            Use real examples while answering.
          </li>

          <li>
            Be honest about your strengths and weaknesses.
          </li>

          <li>
            Research the company before attending.
          </li>

          <li>
            Practice speaking clearly and professionally.
          </li>

        </ul>

      </div>

    </div>
  );
}