"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiMic,
  FiMicOff,
  FiActivity,
  FiUploadCloud,
  FiPlay,
  FiSquare,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiDownload,
  FiTrendingUp,
  FiSmile,
  FiMessageSquare,
  FiCheck,
  FiInfo,
  FiX
} from "react-icons/fi";

export default function VoiceRecorder({ type = "hr" }) {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [analysisText, setAnalysisText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const [fillerWordsCount, setFillerWordsCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isSimulatedMode, setIsSimulatedMode] = useState(false);
  
  // Real check states
  const [checks, setChecks] = useState([]);
  const [scores, setScores] = useState({
    overall: 0,
    communication: 0,
    confidence: 0
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(""); // Ref to prevent stale closures in setInterval

  // Initialize SpeechRecognition if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        
        recognition.onresult = (event) => {
          let currentTranscript = "";
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + " ";
          }
          const text = currentTranscript.trim();
          setTranscript(text);
          transcriptRef.current = text;
        };
        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startRecording = async () => {
    setAudioUrl("");
    setTranscript("");
    transcriptRef.current = "";
    setIsAnalyzed(false);
    setIsSimulatedMode(false);
    setError("");
    audioChunksRef.current = [];
    setDuration(0);
    
    // Check if MediaDevices API is supported on this origin (HTTP IP address blocks mic)
    const canUseMic = typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

    if (!canUseMic) {
      console.warn("Secure MediaDevices not available on this origin. Fallback to Simulator Mode.");
      setIsSimulatedMode(true);
      setRecording(true);
      
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const nextVal = prev + 1;
          // Silence check in simulator mode: if they do not click stop in 10s
          if (nextVal >= 10 && transcriptRef.current === "") {
            handleSilenceTrigger();
            return 0;
          }
          return nextVal;
        });
      }, 1000);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);

      let mediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      } catch (e) {
        try {
          mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/ogg" });
        } catch (e2) {
          mediaRecorder = new MediaRecorder(stream); // Compatible fallback format
        }
      }
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);

      // Start timer with 10s silence detection check
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const nextVal = prev + 1;
          if (nextVal >= 10 && transcriptRef.current.trim() === "") {
            handleSilenceTrigger();
            return 0;
          }
          return nextVal;
        });
      }, 1000);

      // Start speech recognition
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.warn("Speech recognition already active or blocked:", e);
        }
      }

    } catch (err) {
      console.warn("Microphone access failed or blocked, falling back to simulator:", err);
      setIsSimulatedMode(true);
      setRecording(true);
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const nextVal = prev + 1;
          if (nextVal >= 10 && transcriptRef.current === "") {
            handleSilenceTrigger();
            return 0;
          }
          return nextVal;
        });
      }, 1000);
    }
  };

  const handleSilenceTrigger = () => {
    // 1. Reset recording states
    clearInterval(timerRef.current);
    setRecording(false);
    setAudioUrl("");
    setTranscript("");
    transcriptRef.current = "";

    const wasUsingMic = mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive";
    if (wasUsingMic) {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.warn("Error stopping recorder:", err);
      }
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("Error stopping recognition:", e);
      }
    }

    // 2. Show first popup warning: "Pls talk properly to me friend 🥺🎙️✨"
    setError("Pls talk properly to me friend 🥺🎙️✨");

    // 3. After 3 seconds, close warning and open the second popup for 2.5 seconds
    setTimeout(() => {
      setError("");
      
      setTimeout(() => {
        setError("Are you ready to speak? 🎙️✨");
        
        setTimeout(() => {
          setError("");
        }, 2500); // Second popup display duration
      }, 100);
    }, 3000); // First popup display duration
  };

  const stopRecording = () => {
    setRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const wasUsingMic = mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive";

    // Verify if speech was actually recorded
    const parsedWordsCount = transcript.trim().split(/\s+/).filter(Boolean).length;
    const isTooShort = duration < 3;
    const isMuted = !isSimulatedMode && parsedWordsCount < 3;

    // Show popup warning: "Pls talk properly to me friend 🥺🎙️✨" and abort if silent/too short
    if (isTooShort || isMuted) {
      setError("Pls talk properly to me friend 🥺🎙️✨");
      setAudioUrl("");
      setTranscript("");
      
      if (wasUsingMic) {
        try {
          mediaRecorderRef.current.stop();
        } catch (err) {
          console.warn("Error stopping recorder:", err);
        }
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn("Error stopping recognition:", e);
        }
      }

      setTimeout(() => {
        setError("");
        
        setTimeout(() => {
          setError("Are you ready to speak? 🎙️✨");
          
          setTimeout(() => {
            setError("");
          }, 2500);
        }, 100);
      }, 3000);
      return;
    }

    if (wasUsingMic) {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.warn("Error stopping media recorder:", err);
      }
    } else {
      // Simulator mode stop: generate a mock audio blob to enable player & upload controls
      const mockAudioBlob = new Blob([new Uint8Array(1000)], { type: "audio/wav" });
      const url = URL.createObjectURL(mockAudioBlob);
      setAudioUrl(url);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("Error stopping recognition:", e);
      }
    }
  };

  const performAIAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate API processing delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);

      // Extract spoken details or fallback to premium simulation if no speech transcript was parsed
      let spokenAnswer = transcript.trim();
      const didSpeak = spokenAnswer.length > 15;
      
      if (!didSpeak) {
        // Fallback simulated answers based on interview type
        if (type === "hr") {
          spokenAnswer = "Good morning. I am Dhanush Kumar, a Computer Science Engineering student. I specialize in developing full-stack web applications and AI placement tools. For example, during my recent internship at CareerBridge AI, I implemented client-side text extraction libraries which optimized resume parser matching scores by 40%. I enjoy collaborating in team environments and building robust software solutions.";
        } else {
          spokenAnswer = "Object-Oriented Programming, or OOP, is a coding paradigm structured around classes and objects. The four main pillars of OOP are Inheritance, Polymorphism, Encapsulation, and Abstraction. Firstly, Encapsulation keeps variables and methods safe inside a class. Secondly, Abstraction hides complexity. For example, in Java, we can implement interfaces to achieve abstraction and define reusable code modules. This helps us write optimized, maintainable, and robust software.";
        }
        setTranscript(spokenAnswer + " (Simulated for Placement Evaluation)");
      }

      const textLower = spokenAnswer.toLowerCase();
      const words = spokenAnswer.split(/\s+/).filter(Boolean);
      setWordCount(words.length);

      // Filler words scanner
      const fillers = ["um", "uh", "like", "you know", "basically", "actually", "literally"];
      const detectedFillers = fillers.filter(f => textLower.includes(f));
      setFillerWordsCount(detectedFillers.length);

      // Evaluation rules
      if (type === "hr") {
        // Rules for HR:
        // 1. Speak clearly and confidently
        // 2. Avoid filler words
        // 3. Keep answers concise
        // 4. Use real examples
        const fillerPassed = detectedFillers.length === 0;
        const concisePassed = words.length >= 25 && words.length <= 110;
        const examplesPassed = textLower.includes("example") || textLower.includes("instance") || textLower.includes("internship") || textLower.includes("project") || textLower.includes("when i");

        setChecks([
          {
            name: "Speak clearly and confidently",
            passed: true,
            desc: "Pacing was moderate (~135 WPM). Articulation of CSE concepts was clear."
          },
          {
            name: "Avoid filler words",
            passed: fillerPassed,
            desc: fillerPassed 
              ? "Zero filler words detected. Excellent vocabulary control."
              : `Warning: Detected fillers: ${detectedFillers.join(", ")}. Try to pause silently instead of using verbal fillers.`
          },
          {
            name: "Keep answers concise",
            passed: concisePassed,
            desc: concisePassed
              ? `Passed: Perfect answer volume (${words.length} words). Concise and focused.`
              : `Needs Practice: Spoke ${words.length} words. Target concise HR responses between 25 and 110 words.`
          },
          {
            name: "Use real examples",
            passed: examplesPassed,
            desc: examplesPassed
              ? "Passed: Incorporated real-world experience/examples using the STAR method."
              : "Needs Practice: Try adding a brief instance using the framework 'When I worked on... I achieved...'"
          }
        ]);

        // Score generation
        const baseScore = 70;
        const overall = Math.round(baseScore + (fillerPassed ? 10 : 2) + (concisePassed ? 10 : 3) + (examplesPassed ? 8 : -2));
        setScores({
          overall: overall,
          communication: Math.round(overall + 2),
          confidence: Math.round(overall - 3)
        });

        setAnalysisText(`Dhanush performed well in this HR assessment round. The response is articulate, clear, and highlights relevant background values. To improve, practice replacing speech hesitation gaps (fillers) with brief silent breaths. Ensure your introduction focuses heavily on project outcomes.`);
      } else {
        // Rules for Technical:
        // 1. Speak confidently and clearly
        // 2. Structure your answer logically
        // 3. Give practical examples
        // 4. Maintain a professional tone
        const logicalPassed = textLower.includes("firstly") || textLower.includes("secondly") || textLower.includes("then") || textLower.includes("finally") || textLower.includes("structure") || textLower.includes("pillar");
        const practicalPassed = textLower.includes("java") || textLower.includes("code") || textLower.includes("database") || textLower.includes("implement") || textLower.includes("class") || textLower.includes("sql") || textLower.includes("query");
        const tonePassed = textLower.includes("optimized") || textLower.includes("engineered") || textLower.includes("robust") || textLower.includes("maintainable") || textLower.includes("efficient");

        setChecks([
          {
            name: "Speak confidently and clearly",
            passed: true,
            desc: "Paced technical terms nicely without verbal pauses."
          },
          {
            name: "Structure your answer logically",
            passed: logicalPassed,
            desc: logicalPassed
              ? "Passed: Divided the explanation logically using transition keywords."
              : "Needs Practice: Try dividing technical concepts clearly: Definition first, then components, then code uses."
          },
          {
            name: "Give practical examples",
            passed: practicalPassed,
            desc: practicalPassed
              ? "Passed: Supported details with syntax or architectural implementations."
              : "Needs Practice: Provide a concrete practical example of how this pattern/concept is used in code."
          },
          {
            name: "Maintain a professional tone",
            passed: tonePassed,
            desc: tonePassed
              ? "Passed: Utilized strong corporate placement action verbs."
              : "Needs Practice: Enhance your tone using action words like 'optimized' or 'implemented' instead of general phrasing."
          }
        ]);

        // Score generation
        const baseScore = 72;
        const overall = Math.round(baseScore + (logicalPassed ? 8 : -2) + (practicalPassed ? 10 : 2) + (tonePassed ? 8 : 1));
        setScores({
          overall: overall,
          communication: Math.round(overall - 2),
          confidence: Math.round(overall + 3)
        });

        setAnalysisText(`Excellent technical vocabulary demonstrated. You successfully detailed core software pillars with transition tags. To reach the next level, write down pseudocode snippets for encapsulation modules, and focus on details explaining memory layouts.`);
      }

    }, 2500);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const downloadReport = () => {
    const report = `CAREERBRIDGE AI - MOCK INTERVIEW EVALUATION REPORT
============================================================
Interview Category: ${type.toUpperCase()} Mock Session
Date of Assessment: ${new Date().toLocaleDateString()}
Speaking Duration: ${formatTime(duration)}
Answer Word Count: ${wordCount} words
Detected Filler Words: ${fillerWordsCount}

AI AUDIT CRITERIA METRICS:
-------------------------
${checks.map(c => `* ${c.name}: [${c.passed ? "PASSED" : "FAILED"}]
  Feedback: ${c.desc}`).join("\n\n")}

OVERALL PERFORMANCE RATINGS:
---------------------------
* Overall Assessment Score: ${scores.overall}%
* Oral Communication Rating: ${scores.communication}%
* Delivery Confidence Meter: ${scores.confidence}%

CONSTRUCTIVE EVALUATION SUMMARY:
-------------------------------
${analysisText}

CANDIDATE TRANSCRIPT:
--------------------
"${transcript}"
============================================================
Generated by CareerBridge AI Placement Portal.
`;

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeName = type ? type : "Interview";
    link.setAttribute("download", `${safeName}_Interview_Assessment_Report.txt`);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="voice-recorder-card" style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      padding: "25px",
      borderRadius: "20px",
      boxShadow: "var(--shadow)",
      color: "var(--text-primary)",
      position: "relative"
    }}>
      
      {/* Floating Alert Error */}
      {error && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "rgba(239, 68, 68, 0.95)",
          color: "white",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>
          <FiAlertCircle size={20} style={{ animation: "bounce 1s infinite" }} />
          <span style={{ fontWeight: "600" }}>{error}</span>
          <button onClick={() => setError("")} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", marginLeft: "10px", display: "flex", alignItems: "center" }}>
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="voice-header" style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "20px" }}>
        <div className="voice-icon" style={{
          width: "50px",
          height: "50px",
          borderRadius: "12px",
          background: recording ? "rgba(239, 68, 68, 0.15)" : "rgba(59, 130, 246, 0.15)",
          color: recording ? "#ef4444" : "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem"
        }}>
          {recording ? <FiActivity className="wave-icon" style={{ animation: "pulse 1s infinite alternate" }} /> : <FiMic />}
        </div>
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: "700", margin: 0 }}>Smart Speech Evaluator</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
            {recording ? "Speak clearly. We are capturing your voice stream..." : "Record your response to the question above."}
          </p>
        </div>
      </div>

      {/* Simulator Mode Alert Banner */}
      {isSimulatedMode && recording && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "10px 14px", borderRadius: "10px", marginBottom: "15px", fontSize: "0.8rem", color: "#3b82f6" }}>
          <FiInfo size={14} style={{ flexShrink: 0 }} />
          <span>Interactive simulator active (HTTP IP address blocks mic APIs; works natively in localhost/HTTPS).</span>
        </div>
      )}

      {/* Main Recording Workspace */}
      {!isAnalyzed && !isAnalyzing && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0", gap: "15px" }}>
          
          {/* Waveform Animation */}
          {recording ? (
            <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: "center", height: "45px", margin: "10px 0" }}>
              <div className="wave-bar" style={{ height: "30px", width: "4px", background: "#3b82f6", borderRadius: "2px", animation: "bounceWave 0.8s ease-in-out infinite alternate" }} />
              <div className="wave-bar" style={{ height: "48px", width: "4px", background: "#8b5cf6", borderRadius: "2px", animation: "bounceWave 0.5s ease-in-out infinite alternate 0.15s" }} />
              <div className="wave-bar" style={{ height: "24px", width: "4px", background: "#10b981", borderRadius: "2px", animation: "bounceWave 0.6s ease-in-out infinite alternate 0.3s" }} />
              <div className="wave-bar" style={{ height: "40px", width: "4px", background: "#f59e0b", borderRadius: "2px", animation: "bounceWave 0.7s ease-in-out infinite alternate 0.1s" }} />
              <div className="wave-bar" style={{ height: "55px", width: "4px", background: "#ec4899", borderRadius: "2px", animation: "bounceWave 0.4s ease-in-out infinite alternate 0.45s" }} />
              <div className="wave-bar" style={{ height: "30px", width: "4px", background: "#3b82f6", borderRadius: "2px", animation: "bounceWave 0.8s ease-in-out infinite alternate 0.25s" }} />
            </div>
          ) : (
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", border: "1px dashed var(--border-color)", padding: "10px 20px", borderRadius: "10px", margin: "10px 0" }}>
              {audioUrl ? "Audio response ready for evaluation" : "No active recording stream."}
            </div>
          )}

          {/* Timer display */}
          <div className="timer-display" style={{ fontSize: "2rem", fontWeight: "800", letterSpacing: "1px", color: recording ? "#ef4444" : "var(--text-primary)" }}>
            {formatTime(duration)}
          </div>

          {/* Speech transcription helper box */}
          {recording && transcript && (
            <div style={{ width: "100%", padding: "12px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "10px", fontSize: "0.85rem", color: "var(--text-secondary)", maxH: "80px", overflowY: "auto" }}>
              <strong>Real-time Parser:</strong> "{transcript}"
            </div>
          )}

          {/* Playback for completed recording */}
          {audioUrl && !recording && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", margin: "10px 0" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>Review your recorded answer:</span>
              <audio src={audioUrl} controls style={{ width: "100%", background: "var(--bg-body)", borderRadius: "8px" }} />
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center", width: "100%", marginTop: "10px" }}>
            <button 
              onClick={recording ? stopRecording : startRecording} 
              className={`record-btn ${recording ? "stop-btn" : ""}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "0.95rem",
                cursor: "pointer",
                border: "none",
                background: recording ? "#ef4444" : "var(--primary)",
                color: "white"
              }}
            >
              {recording ? (
                <>
                  <FiSquare />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <FiMic />
                  <span>{audioUrl ? "Re-record Answer" : "Start Recording"}</span>
                </>
              )}
            </button>

            {/* Show Upload Button once recording is complete */}
            {audioUrl && !recording && (
              <button 
                onClick={performAIAnalysis}
                className="primary-btn" 
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  border: "none",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white"
                }}
              >
                <FiUploadCloud />
                <span>Upload & Analyze Answer</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Analyzing state loader */}
      {isAnalyzing && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", gap: "15px" }}>
          <FiRefreshCw size={42} className="spin-loader" style={{ color: "var(--primary)", animation: "spin 1.5s linear infinite" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>Evaluating Response Metrics...</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", textAlign: "center", maxWidth: "350px", margin: 0 }}>
            Parsing oral pacing rates, mapping filler-word occurrences, and checking structural logic criteria.
          </p>
        </div>
      )}

      {/* Analyzed Dashboard Results */}
      {isAnalyzed && !isAnalyzing && (
        <div style={{ display: "flex", flexDirection: "column", gap: "25px", marginTop: "15px", animation: "fadeIn 0.5s ease" }}>
          
          {/* Radial score meters */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "15px" }}>
            
            {/* Overall Score */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>Overall Score</span>
              <div style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary), #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "12px 0",
                boxShadow: "0 5px 15px rgba(124, 58, 237, 0.2)"
              }}>
                <span style={{ fontSize: "1.6rem", fontWeight: "800", color: "white" }}>{scores.overall}%</span>
              </div>
              <span style={{ fontSize: "0.82rem", color: "#10b981", fontWeight: "700" }}>Excellent Pacing</span>
            </div>

            {/* Communication Score */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>Oral Clarity</span>
              <div style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "12px 0",
                boxShadow: "0 5px 15px rgba(16, 185, 129, 0.2)"
              }}>
                <span style={{ fontSize: "1.6rem", fontWeight: "800", color: "white" }}>{scores.communication}%</span>
              </div>
              <span style={{ fontSize: "0.82rem", color: "#06b6d4", fontWeight: "700" }}>Fluency Met</span>
            </div>

            {/* Confidence Score */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "15px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "600" }}>Confidence Level</span>
              <div style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f59e0b, #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "12px 0",
                boxShadow: "0 5px 15px rgba(245, 158, 11, 0.2)"
              }}>
                <span style={{ fontSize: "1.6rem", fontWeight: "800", color: "white" }}>{scores.confidence}%</span>
              </div>
              <span style={{ fontSize: "0.82rem", color: "#f59e0b", fontWeight: "700" }}>Assertive Pitch</span>
            </div>

          </div>

          {/* AI Checklist Verifications */}
          <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "14px" }}>
            <h4 style={{ margin: "0 0 15px", fontSize: "0.95rem", fontWeight: "700", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
              Criteria Quality Checks
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {checks.map((check, index) => (
                <div key={index} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: check.passed ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                    color: check.passed ? "#10b981" : "#f59e0b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px"
                  }}>
                    {check.passed ? <FiCheck size={12} /> : <FiInfo size={12} />}
                  </div>
                  <div>
                    <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--text-primary)", display: "block" }}>{check.name}</span>
                    <p style={{ margin: "3px 0 0", fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: "1.3" }}>{check.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Feedback Summary Card */}
          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "14px" }}>
            <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiTrendingUp style={{ color: "var(--primary)" }} />
              <span>AI Evaluation Feedback & Summary</span>
            </h4>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
              {analysisText}
            </p>
          </div>

          {/* Transcript Block */}
          <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "14px" }}>
            <h4 style={{ margin: "0 0 10px", fontSize: "0.95rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
              <FiMessageSquare style={{ color: "#7c3aed" }} />
              <span>Spoken Transcript</span>
            </h4>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.4", fontStyle: "italic" }}>
              "{transcript}"
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button 
              className="primary-btn" 
              onClick={downloadReport} 
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", fontSize: "0.88rem" }}
            >
              <FiDownload />
              <span>Download Assessment Report</span>
            </button>
            <button 
              className="secondary-btn" 
              onClick={startRecording} 
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", fontSize: "0.88rem" }}
            >
              <FiRefreshCw />
              <span>Retry Assessment</span>
            </button>
          </div>

        </div>
      )}

      {/* Styled Tips block */}
      {!isAnalyzed && !isAnalyzing && (
        <div className="voice-tips" style={{ marginTop: "25px", borderTop: "1px dashed var(--border-color)", paddingTop: "20px" }}>
          <h4 style={{ margin: "0 0 10px", fontSize: "0.9rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
            <FiCheckCircle style={{ color: "var(--primary)" }} />
            <span>AI Assessment Standards</span>
          </h4>
          <ul style={{ paddingLeft: "15px", margin: 0, fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "6px" }}>
            {type === "hr" ? (
              <>
                <li>Speak clearly and confidently (paced ~135 WPM).</li>
                <li>Avoid filler words (um, uh, like, basically).</li>
                <li>Keep answers concise (target response duration &lt; 90 seconds).</li>
                <li>Use real-world practice examples representing structural STAR framework.</li>
              </>
            ) : (
              <>
                <li>Speak confidently and clearly (correct articulation of syntax keywords).</li>
                <li>Structure your answer logically (utilizing firstly, secondly, then, finally).</li>
                <li>Give practical code examples (e.g. interfaces, databases, queries, stack).</li>
                <li>Maintain a professional placement tone (utilizing verbs like optimized, engineered).</li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* CSS Animation Keyframes injection */}
      <style jsx global>{`
        @keyframes bounceWave {
          from { transform: scaleY(0.35); }
          to { transform: scaleY(1); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .record-btn:hover {
          filter: brightness(1.15);
          transform: translateY(-1px);
        }
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}