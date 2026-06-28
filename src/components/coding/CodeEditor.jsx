"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
  language,
  defaultCode,
}) {
  const getDefaultCode = () => {
    switch (
      language.toLowerCase()
    ) {
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

  return (
    <div className="editor-container" style={{ flexShrink: 0 }}>

      <div className="editor-header">

        <h3>
          💻 Code Editor
        </h3>

        <span>
          {language}
        </span>

      </div>

      <Editor
        height="550px"
        language={language.toLowerCase()}
        theme="vs-dark"
        value={
          code || defaultCode || getDefaultCode()
        }
        loading="Loading Editor..."
        onChange={(value) =>
          setCode(value || "")
        }
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