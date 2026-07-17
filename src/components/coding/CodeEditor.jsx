"use client";

import { useState, useEffect } from "react";
import Editor, { loader } from "@monaco-editor/react";

// Configure Monaco loader to use the local self-hosted assets in the public directory (completely offline-compatible and immune to CDN blockages)
loader.config({
  paths: {
    vs: "/monaco/vs"
  }
});

const getLanguageExtension = (lang) => {
  switch (lang.toLowerCase()) {
    case "java": return "java";
    case "python": return "py";
    case "javascript": return "js";
    case "c": return "c";
    case "cpp": return "cpp";
    default: return "txt";
  }
};

export default function CodeEditor({
  questionId,
  code,
  setCode,
  language,
  defaultCode,
}) {
  const [editorError, setEditorError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loader.init()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Monaco editor failed to load:", err);
        setEditorError(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleError = (event) => {
      // Intercept script loading failures or generic event errors that Next.js DevTools crashes on
      const isScriptError = event.target?.tagName === "SCRIPT" || event.message === "Script error.";
      const isEventError = String(event.error) === "[object Event]" || (event.error && typeof event.error === "object" && !event.error.message);
      
      if (isScriptError || isEventError) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        console.warn("Intercepted and suppressed script/event error to prevent Next.js dev overlay crash:", event);
      }
    };

    const handleRejection = (event) => {
      const isEventRejection = String(event.reason) === "[object Event]" || (event.reason && typeof event.reason === "object" && !event.reason.message);
      
      if (isEventRejection) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation?.();
        console.warn("Intercepted and suppressed unhandled rejection event to prevent Next.js dev overlay crash:", event);
      }
    };

    window.addEventListener("error", handleError, { capture: true });
    window.addEventListener("unhandledrejection", handleRejection, { capture: true });

    return () => {
      window.removeEventListener("error", handleError, { capture: true });
      window.removeEventListener("unhandledrejection", handleRejection, { capture: true });
    };
  }, []);

  const getDefaultCode = () => {
    switch (language.toLowerCase()) {
      case "java":
        return `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello CareerBridge AI");
    }
}`;

      case "python":
        return `print("Hello CareerBridge AI")`;

      case "javascript":
        return `console.log("Hello CareerBridge AI");`;

      case "c":
        return `#include <stdio.h>

int main() {
    printf("Hello CareerBridge AI");
    return 0;
}`;

      case "cpp":
        return `#include <iostream>
using namespace std;

int main() {
    cout << "Hello CareerBridge AI";
    return 0;
}`;

      default:
        return code;
    }
  };

  const currentValue = code || defaultCode || "";

  if (editorError) {
    return (
      <div className="editor-container" style={{ flexShrink: 0 }}>
        <div className="editor-header">
          <h3>💻 Code Editor (Fallback Mode)</h3>
          <span style={{ color: "#ef4444", fontSize: "0.8rem" }}>Offline / Load Error</span>
        </div>
        <textarea
          style={{
            width: "100%",
            height: "550px",
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            fontFamily: "Consolas, Monaco, monospace",
            fontSize: "15px",
            padding: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0 0 10px 10px",
            outline: "none",
            resize: "none",
            lineHeight: "1.5",
          }}
          value={currentValue}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="editor-container" style={{ flexShrink: 0 }}>
      <div className="editor-header">
        <h3>💻 Code Editor</h3>
        <span>{language}</span>
      </div>

      <Editor
        height="550px"
        language={language.toLowerCase()}
        theme="vs-dark"
        value={currentValue}
        path={`file:///question-${questionId}.${getLanguageExtension(language)}`}
        loading="Loading Editor..."
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 15,
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
        }}
      />
    </div>
  );
}