"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMessageSquare, FiX, FiSend, FiCpu } from "react-icons/fi";

export default function AIAssistant() {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi Dhanush! I'm your CareerBridge AI Coach. How can I help you prepare for your placements today? Ask me about Coding, Aptitude, Resume ATS, or Mock Interviews!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (input) => {
    const text = input.toLowerCase();
    
    if (text.includes("resume") || text.includes("ats")) {
      return "📄 **ATS Resume Tip:** Keep your resume layout to a single column, avoid using text inside images or tables, and inject keywords directly matching the job description. Try our **Resume Analyzer** to verify your score!";
    }
    if (text.includes("coding") || text.includes("code") || text.includes("compiler")) {
      return "💻 **Coding Prep Tip:** Focus on key DSA topics like HashMaps, Trees, and Dynamic Programming. Practice writing clean code daily. Try solving problems in our **Coding Practice Hub** and compiling them live!";
    }
    if (text.includes("interview") || text.includes("hr") || text.includes("technical")) {
      return "🎤 **Interview Tip:** For behavioral rounds, use the **STAR method** (Situation, Task, Action, Result). For technical rounds, explain your thought process out loud. Practice mock sessions in our **Mock Interview** page!";
    }
    if (text.includes("aptitude") || text.includes("quant") || text.includes("reasoning")) {
      return "🧠 **Aptitude Tip:** Master shortcut calculations for speed. Memorize formulas for Percentage, Profit & Loss, and Time & Work. Complete a set of 10 questions daily in our **Aptitude Training** tab!";
    }
    if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("coach")) {
      return "👋 Hello! Ready to level up your career? Let me know which section you are working on today: Aptitude, Coding, Resumes, or Interviews, and I'll give you custom strategies!";
    }
    if (text.includes("tcs") || text.includes("infosys") || text.includes("zoho") || text.includes("accenture") || text.includes("amazon")) {
      return "🏢 **Company Prep:** Top companies test coding efficiency and logical aptitude. Check out our dedicated **Company Preparation** section for custom learning paths tailored for TCS, Infosys, Zoho, Accenture, and Amazon!";
    }
    
    return "💡 That's a great area to focus on! Remember that placement success requires consistency. Keep practicing coding, solving logical aptitude puzzles daily, and testing your profile. What specific question do you have?";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageInput("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const responseText = getAIResponse(userMessage.text);
      const aiResponse = {
        id: Date.now() + 1,
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="ai-assistant-container">
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`ai-assistant-trigger ${isOpen ? "active" : ""}`}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <FiX size={20} /> : <FiMessageSquare size={20} />}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="ai-assistant-window">
          {/* Header */}
          <div className="ai-assistant-header">
            <div className="ai-assistant-avatar" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--primary-gradient)", color: "white" }}>
              <FiCpu size={16} />
            </div>
            <div className="ai-assistant-title-block">
              <h3>BridgeAI Coach</h3>
              <span>Online • Placement Advisor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="ai-assistant-close" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiX size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="ai-assistant-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message-wrapper ${msg.sender}`}>
                <div className={`ai-message-bubble ${msg.sender}`}>
                  {msg.text.split("**").map((part, index) => 
                    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message-wrapper ai">
                <div className="ai-message-bubble ai typing">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="ai-assistant-input-area">
            <input
              type="text"
              placeholder="Ask a question..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="ai-assistant-input"
            />
            <button type="submit" className="ai-assistant-send-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiSend size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
