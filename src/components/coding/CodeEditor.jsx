"use client";

import { useState, useEffect, useRef } from "react";
import { loader } from "@monaco-editor/react";

// Configure Monaco loader to use the local self-hosted assets in the public directory (completely offline-compatible and immune to CDN blockages)
loader.config({
  paths: {
    vs: "/monaco/vs"
  }
});

export default function CodeEditor({
  code,
  setCode,
  language,
  defaultCode,
}) {
  const [editorError, setEditorError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [monacoInstance, setMonacoInstance] = useState(null);
  const containerRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    loader.init()
      .then((monaco) => {
        setMonacoInstance(monaco);
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

  const currentValue = code || "";

  // Initialize and manage Editor lifecycle
  useEffect(() => {
    if (isLoading || editorError || !containerRef.current || !monacoInstance) {
      return;
    }

    // Create the editor instance
    const editor = monacoInstance.editor.create(containerRef.current, {
      value: currentValue,
      language: language.toLowerCase(),
      theme: "vs-dark",
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
    });

    editorRef.current = editor;

    // Handle change events
    const changeListener = editor.onDidChangeModelContent(() => {
      setCode(editor.getValue());
    });

    // Cleanup on unmount
    return () => {
      changeListener.dispose();
      editor.dispose();
      editorRef.current = null;
    };
  }, [isLoading, editorError, monacoInstance]);

  // Update value and language reactively
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !monacoInstance) return;

    const model = editor.getModel();
    if (model) {
      // Update language if it changed
      const currentLanguage = model.getLanguageId ? model.getLanguageId() : model.getModeId?.();
      if (currentLanguage !== language.toLowerCase()) {
        monacoInstance.editor.setModelLanguage(model, language.toLowerCase());
      }

      // Update value if it's different from the current editor content
      if (editor.getValue() !== currentValue) {
        editor.setValue(currentValue);
      }
    }
  }, [language, currentValue, monacoInstance]);

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

      {isLoading ? (
        <div style={{ height: "550px", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e1e1e", color: "#d4d4d4", borderRadius: "0 0 8px 8px" }}>
          Loading Editor...
        </div>
      ) : null}
      <div
        ref={containerRef}
        style={{
          height: "550px",
          width: "100%",
          display: isLoading ? "none" : "block",
          borderRadius: "0 0 8px 8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}