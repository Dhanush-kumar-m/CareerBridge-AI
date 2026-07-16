"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import codingQuestions from "../../../data/codingQuestions";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("../../../components/coding/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "600px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "10px" }}>
      <span style={{ color: "var(--text-secondary)" }}>Loading Code Editor...</span>
    </div>
  )
});
import LanguageSelector from "../../../components/coding/LanguageSelector";
import OutputPanel from "../../../components/coding/OutputPanel";
import TestCases from "../../../components/coding/TestCases";
import SubmissionResult from "../../../components/coding/SubmissionResult";
const ConfettiSuccess = dynamic(() => import("../../../components/coding/ConfettiSuccess"), {
  ssr: false
});
import useCodingProgress from "../../../hooks/useCodingProgress";

// Helper functions for code execution
const parseInput = (input, questionId) => {
  try {
    switch (questionId) {
      case 1: // Hello World
        return [];
      case 2: // Even or Odd Check
      case 7: // FizzBuzz
      case 9: // Factorial
      case 10: // Fibonacci Series
      case 11: // Prime Number Check
        return [parseInt(input, 10)];
      case 3: // Two Sum
      case 15: { // Binary Search
        const commaIndex = input.lastIndexOf(",");
        const arrStr = input.substring(0, commaIndex).trim();
        const targetStr = input.substring(commaIndex + 1).trim();
        const arr = JSON.parse(arrStr);
        const target = parseInt(targetStr, 10);
        return [arr, target];
      }
      case 4: // Reverse String
      case 5: // Palindrome Check
      case 12: // Valid Parentheses
      case 16: // Longest Palindromic Substring
        return [input.replace(/^["']|["']$/g, "")];
      case 6: // Find Largest Number
      case 13: // Container With Most Water
        return [JSON.parse(input)];
      case 8: { // Anagram Check
        // input is like '"listen","silent"'
        const parts = input.split('","');
        const str1 = parts[0].replace(/^["']|["']$/g, "");
        const str2 = parts[1].replace(/^["']|["']$/g, "");
        return [str1, str2];
      }
      case 14: { // Merge Sorted Arrays
        const arrays = JSON.parse("[" + input + "]");
        return [arrays[0], arrays[1]];
      }
      default:
        return [input];
    }
  } catch (e) {
    return [input];
  }
};

const getExpectedFuncName = (id) => {
  switch (id) {
    case 1: return "helloWorld";
    case 2: return "evenOrOdd";
    case 3: return "twoSum";
    case 4: return "reverseString";
    case 5: return "isPalindrome";
    case 6: return "findLargest";
    case 7: return "fizzBuzz";
    case 8: return "isAnagram";
    case 9: return "factorial";
    case 10: return "fibonacci";
    case 11: return "isPrime";
    case 12: return "isValid";
    case 13: return "maxArea";
    case 14: return "mergeSortedArrays";
    case 15: return "binarySearch";
    case 16: return "longestPalindrome";
    default: return "solve";
  }
};

const getLineNumberFromError = (error, code) => {
  if (!error.stack) return null;
  const match = error.stack.match(/(?:anonymous|eval|Function):(\d+):(\d+)/) || error.stack.match(/<anonymous>:(\d+):(\d+)/);
  if (match) {
    let line = parseInt(match[1], 10);
    return line > 1 ? line - 1 : line;
  }
  
  if (error instanceof SyntaxError) {
    const msgMatch = error.message.match(/(\d+):(\d+)/);
    if (msgMatch) return parseInt(msgMatch[1], 10);
  }
  
  return null;
};

const getDefaultCodeForQuestion = (question, language) => {
  return "";
};

const runCompilerTestCases = async (code, language, question) => {
  const lang = language.toLowerCase();
  
  const LANGUAGE_IDS = {
    c: 50,
    cpp: 54,
    java: 62,
    javascript: 63,
    python: 71,
    csharp: 51,
    go: 60,
    kotlin: 78,
    php: 68,
    ruby: 72,
    rust: 73,
    swift: 83,
    typescript: 74
  };

  const languageId = LANGUAGE_IDS[lang] || 63;

  try {
    const res = await fetch("/api/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        test_cases: question.testCases.map(tc => ({
          input: tc.input,
          expected: tc.expected
        }))
      })
    });

    if (!res.ok) {
      throw new Error(`API compilation failed with status ${res.status}`);
    }

    const data = await res.json();
    const results = data.results || [];
    
    let passedCount = 0;
    const testCaseResults = [];
    let compilationError = "";
    let runtimeError = "";

    results.forEach((resItem) => {
      if (resItem.status === "Compilation Error") {
        compilationError = resItem.compile_output;
      } else if (resItem.status === "Runtime Error") {
        runtimeError = resItem.stderr;
      }

      let actualStr = String(resItem.stdout || resItem.stderr || "").trim();
      let expectedStr = String(resItem.expected || "").trim();
      
      const cleanStringForComparison = (str) => {
        if (typeof str !== "string") return String(str);
        let cleaned = str.trim();
        if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
          cleaned = cleaned.substring(1, cleaned.length - 1);
        }
        if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
          cleaned = cleaned.substring(1, cleaned.length - 1);
        }
        return cleaned.replace(/\s+/g, "").toLowerCase();
      };

      const normActual = cleanStringForComparison(actualStr);
      const normExpected = cleanStringForComparison(expectedStr);
      
      const passed = resItem.status === "Accepted" && normActual === normExpected;
      if (passed) passedCount++;

      testCaseResults.push({
        input: resItem.input,
        expected: expectedStr,
        actual: resItem.status === "Compilation Error" ? "Compilation Error" : (resItem.status === "Runtime Error" ? "Runtime Error" : actualStr),
        passed
      });
    });

    if (compilationError) {
      return {
        error: `Compilation Error:\n${compilationError}`,
        success: false,
        passedCount: 0,
        totalCount: question.testCases.length,
        results: testCaseResults
      };
    }

    if (runtimeError && passedCount === 0) {
      return {
        error: `Runtime Error:\n${runtimeError}`,
        success: false,
        passedCount: 0,
        totalCount: question.testCases.length,
        results: testCaseResults
      };
    }

    const success = passedCount === question.testCases.length;
    return {
      success,
      passedCount,
      totalCount: question.testCases.length,
      results: testCaseResults,
      logs: []
    };

  } catch (err) {
    return {
      error: err.message || "Failed to execute code",
      success: false,
      passedCount: 0,
      totalCount: question.testCases.length,
      results: []
    };
  }
};

export default function CompilerPage() {
  const router = useRouter();
  const [level, setLevel] = useState("Easy");
  const { solvedIds, markAsSolved, addSubmission } = useCodingProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [language, setLanguage] = useState("Java");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [passed, setPassed] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState(0);

  // Advanced execution state variables
  const [passedCount, setPassedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(2);
  const [errorDetails, setErrorDetails] = useState("");
  const [errorLine, setErrorLine] = useState(null);
  
  // Timer state (20 mins = 1200 seconds)
  const [timeLeft, setTimeLeft] = useState(1200);
  const [showTimeUpPopup, setShowTimeUpPopup] = useState(false);
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState("");
  // Filter codingQuestions by selected difficulty
  const questionsOfLevel = codingQuestions.filter(
    (q) => q.difficulty.toLowerCase() === level.toLowerCase()
  );

  const question = questionsOfLevel[currentQuestionIndex] || questionsOfLevel[0] || codingQuestions[0];

  // Save code to local storage when changed
  useEffect(() => {
    if (code && question && language) {
      localStorage.setItem(`code_${question.id}_${language}`, code);
    }
  }, [code, question, language]);

  // Load code from local storage when question or language changes
  useEffect(() => {
    if (question && language) {
      const saved = localStorage.getItem(`code_${question.id}_${language}`);
      if (saved) {
        setCode(saved);
      } else {
        setCode("");
      }
    }
  }, [question, language]);

  // Load question ID from URL if provided
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get("id");
      if (idParam) {
        const id = parseInt(idParam, 10);
        const q = codingQuestions.find(q => q.id === id);
        if (q) {
          const diff = q.difficulty; // e.g. "Easy", "Medium", "Hard"
          setLevel(diff);
          
          // Find question index within that level
          const lvlQuestions = codingQuestions.filter(
            (item) => item.difficulty.toLowerCase() === diff.toLowerCase()
          );
          const idx = lvlQuestions.findIndex((item) => item.id === id);
          if (idx !== -1) {
            setCurrentQuestionIndex(idx);
          }
        }
      }
    }
  }, []);

  // 20-minute practice timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowTimeUpPopup(true);
      const timeout = setTimeout(() => {
        setShowTimeUpPopup(false);
        moveToNextQuestion();
      }, 3500);
      return () => clearTimeout(timeout);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode("");
    setPassed(false);
    setHasSubmitted(false);
    setOutput("");
    setErrorDetails("");
    setErrorLine(null);
    setPassedCount(0);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setHasSubmitted(false);
  };

  const handleLevelChange = (lvl) => {
    setLevel(lvl);
    setCurrentQuestionIndex(0);
    setCode("");
    setPassed(false);
    setHasSubmitted(false);
    setOutput("");
    setErrorDetails("");
    setErrorLine(null);
    setPassedCount(0);
    setTimeLeft(1200);

    const filtered = codingQuestions.filter(x => x.difficulty.toLowerCase() === lvl.toLowerCase());
    if (filtered.length > 0) {
      window.history.pushState(null, "", `/coding/compiler?id=${filtered[0].id}`);
    }
  };

  const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
    setCode("");
    setPassed(false);
    setHasSubmitted(false);
    setOutput("");
    setErrorDetails("");
    setErrorLine(null);
    setPassedCount(0);
    setTimeLeft(1200); // Reset timer to 20 minutes
    
    // Update URL query parameters
    const nextQuestion = questionsOfLevel[index];
    if (nextQuestion) {
      window.history.pushState(null, "", `/coding/compiler?id=${nextQuestion.id}`);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questionsOfLevel.length - 1) {
      handleQuestionChange(currentQuestionIndex + 1);
    } else {
      // Completed all questions of this level! Move to next level automatically
      if (level.toLowerCase() === "easy") {
        handleLevelChange("Medium");
      } else if (level.toLowerCase() === "medium") {
        handleLevelChange("Hard");
      } else {
        setOutput("🎉 CONGRATULATIONS! You have successfully completed all coding practice sessions!");
        setTimeout(() => {
          router.push("/coding/practice");
        }, 1500);
      }
    }
  };

  const downloadCode = () => {
    const extMap = {
      c: "c",
      cpp: "cpp",
      java: "java",
      javascript: "js",
      python: "py",
      csharp: "cs",
      go: "go",
      kotlin: "kt",
      php: "php",
      ruby: "rb",
      rust: "rs",
      swift: "swift",
      typescript: "ts"
    };
    const ext = extMap[language.toLowerCase()] || "txt";
    const userCode = code || getDefaultCodeForQuestion(question, language);
    const blob = new Blob([userCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution_${question.id}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearEditor = () => {
    if (window.confirm("Are you sure you want to reset the editor? This will clear your current code.")) {
      setCode("");
      localStorage.removeItem(`code_${question.id}_${language}`);
    }
  };

  const copyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert("Output copied to clipboard!");
    }
  };

  const handleCorrectSolution = (userCode, evaluation) => {
    setOutput(`✅ Solution Accepted!\nPassed all ${evaluation.passedCount} test cases.`);
    setShowCorrectPopup(true);
    setPassed(true);
    setHasSubmitted(true);
    setPassedCount(evaluation.passedCount);
    setTotalCount(evaluation.totalCount);
    
    // Save solved question ID to Supabase/localStorage
    const updatedSolvedList = solvedIds.includes(question.id) ? solvedIds : [...solvedIds, question.id];
    markAsSolved(question.id, question.difficulty);

    // Record Submission History in Supabase/localStorage
    addSubmission({
      questionId: question.id,
      questionTitle: question.title,
      code: userCode,
      language: language,
      status: "Accepted",
      difficulty: question.difficulty,
      passedCount: evaluation.passedCount || 0,
      totalCount: evaluation.totalCount || question.testCases.length
    });

    // Auto-route to next session/question after 2.5 seconds
    setTimeout(() => {
      setShowCorrectPopup(false);
      
      // Check if all questions in the current level are solved
      const levelQuestions = codingQuestions.filter(
        (q) => q.difficulty.toLowerCase() === level.toLowerCase()
      );
      const unsolvedInLevel = levelQuestions.filter(
        (q) => !updatedSolvedList.includes(q.id)
      );
      
      if (unsolvedInLevel.length === 0) {
        // All solved in this level! Move to next level automatically
        if (level.toLowerCase() === "easy") {
          setLevel("Medium");
          setCurrentQuestionIndex(0);
          const nextLevelQuestions = codingQuestions.filter(q => q.difficulty === "Medium");
          if (nextLevelQuestions.length > 0) {
            window.history.pushState(null, "", `/coding/compiler?id=${nextLevelQuestions[0].id}`);
          }
        } else if (level.toLowerCase() === "medium") {
          setLevel("Hard");
          setCurrentQuestionIndex(0);
          const nextLevelQuestions = codingQuestions.filter(q => q.difficulty === "Hard");
          if (nextLevelQuestions.length > 0) {
            window.history.pushState(null, "", `/coding/compiler?id=${nextLevelQuestions[0].id}`);
          }
        } else {
          // Completed Hard!
          setOutput("🎉 CONGRATULATIONS! You have successfully completed all coding practice sessions!");
          setTimeout(() => {
            router.push("/coding/practice");
          }, 1500);
        }
      } else {
        // Move to the next unsolved question in this level
        const nextUnsolvedIdx = levelQuestions.findIndex(
          (q) => !updatedSolvedList.includes(q.id)
        );
        if (nextUnsolvedIdx !== -1) {
          setCurrentQuestionIndex(nextUnsolvedIdx);
          window.history.pushState(null, "", `/coding/compiler?id=${levelQuestions[nextUnsolvedIdx].id}`);
        } else {
          // Fallback: move index forward if within range
          if (currentQuestionIndex < levelQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            window.history.pushState(null, "", `/coding/compiler?id=${levelQuestions[currentQuestionIndex + 1].id}`);
          }
        }
      }
    }, 2500);
  };

  const handleWrongSolution = (userCode, evaluation) => {
    setPassed(false);
    setHasSubmitted(true);
    setPassedCount(evaluation.passedCount);
    setTotalCount(evaluation.totalCount);

    let outputText = `❌ Solution Rejected.\n`;
    outputText += `Passed ${evaluation.passedCount}/${evaluation.totalCount} Test Cases.\n\n`;
    
    if (evaluation.results) {
      evaluation.results.forEach((res, i) => {
        outputText += `Test Case ${i + 1}: ${res.passed ? 'PASSED ✅' : 'FAILED ❌'}\n`;
        outputText += `  Input:    ${res.input}\n`;
        outputText += `  Expected: ${res.expected}\n`;
        outputText += `  Actual:   ${res.actual}\n\n`;
      });
    }

    outputText += `💡 Hint: ${question.hint || "Review your solution logic and check variable definitions."}\n`;
    setOutput(outputText);

    // Record Submission History in Supabase/localStorage
    addSubmission({
      questionId: question.id,
      questionTitle: question.title,
      code: userCode,
      language: language,
      status: "Wrong Answer",
      difficulty: question.difficulty,
      passedCount: evaluation.passedCount || 0,
      totalCount: evaluation.totalCount || question.testCases.length
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setHasSubmitted(false);
    setErrorDetails("");
    setErrorLine(null);

    const userCode = code ? code.trim() : "";
    if (!userCode) {
      setIsRunning(false);
      setOutput("❌ Error: Code cannot be empty. Please write your solution logic in the editor.");
      return;
    }

    if (useCustomInput) {
      setOutput(`Compiling & Executing ${language} code with Custom Input...\n\n`);

      const lang = language.toLowerCase();
      const LANGUAGE_IDS = {
        c: 50,
        cpp: 54,
        java: 62,
        javascript: 63,
        python: 71,
        csharp: 51,
        go: 60,
        kotlin: 78,
        php: 68,
        ruby: 72,
        rust: 73,
        swift: 83,
        typescript: 74
      };

      const languageId = LANGUAGE_IDS[lang] || 63;

      try {
        const res = await fetch("/api/compile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: userCode,
            language_id: languageId,
            stdin: customInput
          })
        });

        setIsRunning(false);

        if (!res.ok) {
          throw new Error(`API compilation failed with status ${res.status}`);
        }

        const data = await res.json();

        if (data.status === "Compilation Error") {
          setOutput(`❌ Compilation Error:\n${data.compile_output}`);
          setErrorDetails(data.compile_output);
        } else if (data.status === "Runtime Error") {
          setOutput(`❌ Runtime Error:\n${data.stderr}`);
          setErrorDetails(data.stderr);
        } else {
          let outputText = `✅ Custom Input Execution Completed.\n`;
          outputText += `Status: ${data.status}\n`;
          outputText += `Time:   ${data.time} sec\n`;
          outputText += `Memory: ${data.memory} MB\n\n`;
          outputText += `Output:\n${data.stdout || "(No Output)"}\n`;
          setOutput(outputText);
        }
      } catch (err) {
        setIsRunning(false);
        setErrorDetails(err.message);
        setOutput(`❌ Error: ${err.message}`);
      }
      return;
    }

    setOutput(`Compiling & Executing ${language} code...\n\n`);

    try {
      const evaluation = await runCompilerTestCases(userCode, language, question);
      setIsRunning(false);

      if (evaluation.error) {
        setErrorDetails(evaluation.error);
        setErrorLine(evaluation.line);
        setOutput(`❌ Compilation/Runtime Error:\n${evaluation.error}`);
      } else {
        if (evaluation.success) {
          handleCorrectSolution(userCode, evaluation);
        } else {
          handleWrongSolution(userCode, evaluation);
        }
      }
    } catch (err) {
      setIsRunning(false);
      setErrorDetails(err.message);
      setOutput(`❌ Error: ${err.message}`);
    }
  };

  const submitCode = async () => {
    setIsSubmitting(true);
    setHasSubmitted(false);
    setErrorDetails("");
    setErrorLine(null);
    setOutput(`Submitting solution for target evaluation...\n`);

    const userCode = code ? code.trim() : "";
    if (!userCode) {
      setIsSubmitting(false);
      setOutput("❌ Error: Code cannot be empty. Please write your solution logic in the editor.");
      return;
    }

    try {
      const evaluation = await runCompilerTestCases(userCode, language, question);
      setIsSubmitting(false);

      setSubmissions(prev => prev + 1);

      if (evaluation.error) {
        setErrorDetails(evaluation.error);
        setErrorLine(evaluation.line);
        setOutput(`❌ Submission Failed due to Compilation/Runtime Error:\n${evaluation.error}`);
      } else {
        if (evaluation.success) {
          handleCorrectSolution(userCode, evaluation);
        } else {
          handleWrongSolution(userCode, evaluation);
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorDetails(err.message);
      setOutput(`❌ Error: ${err.message}`);
    }
  };

  const questionSpecificDefaultCode = getDefaultCodeForQuestion(question, language);

  return (
    <div className="compiler-page">
      {/* Time is Up Popup Overlay */}
      {showTimeUpPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          backdropFilter: "blur(5px)"
        }}>
          <div style={{
            backgroundColor: "#1e1e24",
            border: "2px solid #ef5350",
            borderRadius: "16px",
            padding: "40px",
            maxWidth: "480px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(239, 83, 80, 0.3)",
          }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: "20px" }}>⏳</span>
            <h2 style={{ color: "#ef5350", fontSize: "2.2rem", margin: "0 0 16px 0", fontWeight: "bold" }}>
              Time is Up!
            </h2>
            <p style={{ fontSize: "1.15rem", color: "#e0e0e0", margin: "0 0 24px 0", lineHeight: "1.6" }}>
              Time is up! Keep coding efficiently and manage the time.
            </p>
            <div style={{
              display: "inline-block",
              width: "24px",
              height: "24px",
              border: "3px solid #ef5350",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }}></div>
            <p style={{ fontSize: "0.9rem", color: "#888", margin: "10px 0 0 0" }}>
              Moving to the next coding session...
            </p>
          </div>
        </div>
      )}

      {/* Rocking Success Popup Overlay */}
      {showCorrectPopup && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          backdropFilter: "blur(5px)"
        }}>
          <div style={{
            backgroundColor: "#0d0e12",
            border: "2px solid #4caf50",
            borderRadius: "16px",
            padding: "40px",
            maxWidth: "450px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(76, 175, 80, 0.3)"
          }}>
            <span style={{ fontSize: "4.5rem", display: "block", marginBottom: "20px" }}>🎸</span>
            <h2 style={{ color: "#4caf50", fontSize: "2.2rem", margin: "0 0 16px 0", fontWeight: "bold" }}>
              Keep Rocking!
            </h2>
            <p style={{ fontSize: "1.15rem", color: "#e0e0e0", margin: "0 0 16px 0", lineHeight: "1.6" }}>
              All test cases passed successfully!
            </p>
            <p style={{ fontSize: "1rem", color: "#888", margin: 0 }}>
              Moving to the next coding challenge...
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <h1>💻 Coding Compiler & Practice</h1>
        <p>
          Solve coding challenges, run your code, analyze compilation errors, and complete multiple sessions sequentially.
        </p>
      </div>

      {/* Difficulty Tabs */}
      <div className="difficulty-tabs" style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        {["Easy", "Medium", "Hard"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            style={{
              padding: "10px 24px",
              borderRadius: "30px",
              border: "1px solid",
              borderColor: level.toLowerCase() === lvl.toLowerCase() 
                ? (lvl === "Easy" ? "#4caf50" : (lvl === "Medium" ? "#ff9800" : "#f44336"))
                : "#374151",
              backgroundColor: level.toLowerCase() === lvl.toLowerCase()
                ? (lvl === "Easy" ? "rgba(76, 175, 80, 0.15)" : (lvl === "Medium" ? "rgba(255, 152, 0, 0.15)" : "rgba(244, 67, 54, 0.15)"))
                : "#111827",
              color: level.toLowerCase() === lvl.toLowerCase()
                ? (lvl === "Easy" ? "#81c784" : (lvl === "Medium" ? "#ffb74d" : "#e57373"))
                : "#94a3b8",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              transition: "all 0.2s"
            }}
          >
            {lvl === "Easy" ? "🟢 Easy" : (lvl === "Medium" ? "🟡 Medium" : "🔴 Hard")}
          </button>
        ))}
      </div>

      {/* Question Selector Tabs */}
      <div className="question-selector-tabs" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
        {questionsOfLevel.map((q, idx) => {
          const isSolved = solvedIds.includes(q.id);
          return (
            <button
              key={q.id}
              onClick={() => handleQuestionChange(idx)}
              className={`tab-btn ${idx === currentQuestionIndex ? 'active' : ''}`}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: idx === currentQuestionIndex ? "#4caf50" : "#444",
                backgroundColor: idx === currentQuestionIndex ? "rgba(76, 175, 80, 0.15)" : "#1e1e24",
                color: idx === currentQuestionIndex ? "#81c784" : "#ccc",
                cursor: "pointer",
                fontWeight: idx === currentQuestionIndex ? "bold" : "normal",
                transition: "all 0.2s"
              }}
            >
              {idx === currentQuestionIndex ? "👉 " : ""}
              {q.id}. {q.title} {isSolved ? "✅" : ""}
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="compiler-stats">
        <div className="stat-card timer-card" style={{ borderColor: timeLeft < 120 ? '#ff5252' : '#e0e0e0' }}>
          <h2 style={{ color: timeLeft < 120 ? '#ff5252' : 'inherit' }}>
            ⏱ {formatTime(timeLeft)}
          </h2>
          <p>Time Remaining</p>
        </div>

        <div className="stat-card">
          <h2>{submissions}</h2>
          <p>Submissions</p>
        </div>

        <div className="stat-card">
          <h2>{language}</h2>
          <p>Language</p>
        </div>

        <div className="stat-card">
          <h2>
            {passed ? "Passed ✅" : "Pending"}
          </h2>
          <p>Current Status</p>
        </div>
      </div>

      <div className="compiler-layout">
        {/* Question Panel */}
        <div className="question-panel">
          <div className="question-header">
            <h2>{question.title}</h2>
            <span className="difficulty">{question.difficulty}</span>
          </div>

          <p className="question-description">
            {question.description}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "16px 0" }}>
            <div className="testcase-card" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div className="testcase-section" style={{ margin: 0 }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600" }}>
                  Sample Input
                </label>
                <pre style={{ overflowX: "auto" }}>
                  {question.sampleInput}
                </pre>
              </div>
            </div>
            <div className="testcase-card" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div className="testcase-section" style={{ margin: 0 }}>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600" }}>
                  Sample Output
                </label>
                <pre style={{ overflowX: "auto" }}>
                  {question.sampleOutput}
                </pre>
              </div>
            </div>
          </div>

          <TestCases testCases={question.testCases} />
        </div>

        {/* Editor Panel */}
        <div className="editor-panel">
          <LanguageSelector
            language={language}
            setLanguage={handleLanguageChange}
            onDownload={downloadCode}
            onReset={clearEditor}
          />

          <CodeEditor
            code={code}
            setCode={handleCodeChange}
            language={language}
            defaultCode={questionSpecificDefaultCode}
          />

          {/* Custom Input Section */}
          <div style={{ margin: "15px 0", background: "#0d0e12", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontWeight: "600", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.85rem" }}>
              <input 
                type="checkbox" 
                checked={useCustomInput} 
                onChange={(e) => setUseCustomInput(e.target.checked)} 
                style={{ cursor: "pointer" }}
              />
              <span>Use Custom Input</span>
            </label>
            {useCustomInput && (
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type your custom program inputs here..."
                rows={3}
                style={{
                  width: "100%",
                  background: "#1e1e24",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "6px",
                  color: "#f3f4f6",
                  padding: "10px",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                  resize: "vertical",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#4caf50"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.08)"}
              />
            )}
          </div>

          <div className="editor-actions">
            <button
              className="run-btn"
              onClick={runCode}
              disabled={isRunning || isSubmitting}
            >
              {isRunning ? "⌛ Running..." : "▶ Run Code"}
            </button>

            <button
              className="submit-btn"
              onClick={submitCode}
              disabled={isRunning || isSubmitting}
            >
              {isSubmitting ? "⌛ Submitting..." : "🚀 Submit"}
            </button>
          </div>

          <div style={{ position: "relative" }}>
            <OutputPanel output={output} />
            {output && (
              <button 
                onClick={copyOutput}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "#374151",
                  border: "none",
                  color: "#ffffff",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  zIndex: 10
                }}
              >
                📋 Copy Output
              </button>
            )}
          </div>

          {hasSubmitted && (
            <>
              {passed && <ConfettiSuccess />}
              <SubmissionResult
                passed={passed}
                passedCount={passedCount}
                totalCount={totalCount}
                hint={question.hint}
                error={errorDetails}
                line={errorLine}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
