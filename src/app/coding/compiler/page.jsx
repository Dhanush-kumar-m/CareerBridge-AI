"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import codingQuestions from "../../../data/codingQuestions";
import CodeEditor from "../../../components/coding/CodeEditor";
import LanguageSelector from "../../../components/coding/LanguageSelector";
import OutputPanel from "../../../components/coding/OutputPanel";
import TestCases from "../../../components/coding/TestCases";
import SubmissionResult from "../../../components/coding/SubmissionResult";
import ConfettiSuccess from "../../../components/coding/ConfettiSuccess";

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
  const lang = language.toLowerCase();
  if (lang === "python") {
    return `# Write your Python code here\n`;
  }
  return `// Write your ${language} code here\n`;
};

// Python/Java/C/C++ to Javascript Transpiler for client-side execution
const transpileToJS = (code, language) => {
  const lang = language.toLowerCase();
  if (lang === "javascript") return code;
  
  let jsCode = code;
  
  if (lang === "python") {
    const lines = code.split("\n");
    let indentLevels = [];
    let resultLines = [];
    const hasClass = /\bclass\b/.test(code);
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const spaceMatch = line.match(/^\s*/);
      const spaces = spaceMatch ? spaceMatch[0].length : 0;
      let trimmed = line.trim();
      
      // Keep comments but replace # with //
      if (trimmed.startsWith("#")) {
        resultLines.push(" ".repeat(spaces) + "//" + trimmed.substring(1));
        continue;
      }
      
      if (!trimmed) {
        resultLines.push("");
        continue;
      }
      
      // Close indent blocks
      while (indentLevels.length > 0 && spaces < indentLevels[indentLevels.length - 1]) {
        indentLevels.pop();
        resultLines.push(" ".repeat(spaces) + "}");
      }
      
      let jsLine = trimmed;
      
      // Translate def function with parameter cleaning
      if (jsLine.startsWith("def ")) {
        // Match: def name(params) -> returnType:
        const defMatch = jsLine.match(/def\s+(\w+)\s*\(([^)]*)\)\s*(?:->\s*[^:]+)?\s*:/);
        if (defMatch) {
          const name = defMatch[1];
          const rawParams = defMatch[2];
          
          // Clean parameters
          const cleanedParams = rawParams.split(",")
            .map(p => p.trim())
            .filter(p => p && p !== "self" && !p.startsWith("self:")) // strip self
            .map(p => p.split(":")[0].trim()) // strip type annotations (e.g. nums: List[int] -> nums)
            .join(", ");
            
          if (hasClass) {
            jsLine = `${name}(${cleanedParams}) {`;
          } else {
            jsLine = `function ${name}(${cleanedParams}) {`;
          }
          indentLevels.push(spaces + 4);
        }
      }
      // Translate class
      else if (jsLine.startsWith("class ")) {
        const classMatch = jsLine.match(/class\s+(\w+)/);
        if (classMatch) {
          jsLine = `class ${classMatch[1]} {`;
          indentLevels.push(spaces + 4);
        }
      }
      // Translate loops
      else if (jsLine.startsWith("for ") && jsLine.includes(" in ")) {
        const forRangeMatch = jsLine.match(/for\s+(\w+)\s+in\s+range\(([^)]+)\):/);
        if (forRangeMatch) {
          const varName = forRangeMatch[1];
          const argsStr = forRangeMatch[2].trim();
          
          const resolvedArgs = argsStr.replace(/len\(([^)]+)\)/g, "$1.length");
          const args = resolvedArgs.split(",").map(s => s.trim());
          
          let start = "0";
          let end = args[0];
          let step = "1";
          if (args.length === 2) {
            start = args[0];
            end = args[1];
          } else if (args.length === 3) {
            start = args[0];
            end = args[1];
            step = args[2];
          }
          jsLine = `for (let ${varName} = ${start}; ${varName} < ${end}; ${varName} += ${step}) {`;
          indentLevels.push(spaces + 4);
        } else {
          // Standard for x in y:
          const forInMatch = jsLine.match(/for\s+(\w+)\s+in\s+([^:]+):/);
          if (forInMatch) {
            const varName = forInMatch[1];
            const arrName = forInMatch[2].trim();
            jsLine = `for (let ${varName} of ${arrName}) {`;
            indentLevels.push(spaces + 4);
          }
        }
      }
      // Translate conditions
      else if (jsLine.startsWith("if ") || jsLine.startsWith("elif ") || jsLine.startsWith("while ") || jsLine.startsWith("else:")) {
        if (jsLine.startsWith("elif ")) {
          jsLine = jsLine.replace("elif ", "else if ");
        }
        
        if (jsLine.endsWith(":")) {
          jsLine = jsLine.slice(0, -1);
        }
        
        if (jsLine.startsWith("if ") && !jsLine.startsWith("if (")) {
          jsLine = "if (" + jsLine.substring(3).trim() + ")";
        } else if (jsLine.startsWith("else if ") && !jsLine.startsWith("else if (")) {
          jsLine = "else if (" + jsLine.substring(8).trim() + ")";
        } else if (jsLine.startsWith("while ") && !jsLine.startsWith("while (")) {
          jsLine = "while (" + jsLine.substring(6).trim() + ")";
        }
        
        jsLine = jsLine + " {";
        indentLevels.push(spaces + 4);
      }
      
      // General expressions translations
      jsLine = jsLine
        .replace(/(\w+)\s+not\s+in\s+(\w+)/g, "!($1 in $2)")
        .replace(/(\w+)\s+in\s+(\w+)/g, "($1 in $2)")
        .replace(/\band\b/g, "&&")
        .replace(/\bor\b/g, "||")
        .replace(/\bnot\b/g, "!")
        .replace(/\bTrue\b/g, "true")
        .replace(/\bFalse\b/g, "false")
        .replace(/\bNone\b/g, "null")
        .replace(/\blen\(([^)]+)\)/g, "$1.length")
        .replace(/\bint\(([^)]+)\)/g, "parseInt($1, 10)")
        .replace(/\bfloat\(([^)]+)\)/g, "parseFloat($1)")
        .replace(/\bstr\(([^)]+)\)/g, "String($1)")
        .replace(/list\(map\(int,\s*([^)]+)\)\)/g, "$1.map(x => parseInt(x, 10))")
        .replace(/map\(int,\s*([^)]+)\)/g, "$1.map(x => parseInt(x, 10))")
        .replace(/list\(([^)]+)\)/g, "$1")
        .replace(/\.split\(\)/g, ".trim().split(/\\s+/)")
        .replace(/\.append\(/g, ".push(")
        .replace(/print\(/g, "console.log(")
        .replace(/\bpass\b/g, "");
        
      resultLines.push(" ".repeat(spaces) + jsLine);
    }
    
    while (indentLevels.length > 0) {
      indentLevels.pop();
      resultLines.push("}");
    }
    
    return resultLines.join("\n");
  }
  
  if (["java", "cpp", "c"].includes(lang)) {
    // 1. Remove header imports, standard namespaces, packages
    jsCode = jsCode
      .replace(/#include\s+<[^>]+>/g, "")
      .replace(/using\s+namespace\s+\w+;/g, "")
      .replace(/import\s+[\w.]+;/g, "")
      .replace(/package\s+[\w.]+;/g, "");
      
    jsCode = jsCode.replace(/\bstd::/g, "");
    jsCode = jsCode.replace(/\bSystem\.in\b/g, "__input__");
    
    // 2. Transpile class name
    jsCode = jsCode.replace(/\bpublic class Solution\b/g, "class Solution");
    
    const hasClass = /\bclass\b/.test(jsCode);
    
    // 3. Transpile functions signature
    const fnNames = [
      "helloWorld", "evenOrOdd", "twoSum", "reverseString", "isPalindrome",
      "findLargest", "fizzBuzz", "isAnagram", "factorial", "fibonacci",
      "isPrime", "isValid", "maxArea", "mergeSortedArrays", "binarySearch",
      "longestPalindrome", "main"
    ];
    
    fnNames.forEach(fn => {
      // Matches returnType name(parameters)
      const regex = new RegExp(`(?:(?:public\\s+|private\\s+|protected\\s+|static\\s+|virtual\\s+|const\\s+|inline\\s+|(?:\\w+[*&<>\\s\\[\\]]+))\\s+)+${fn}\\s*\\(([^)]*)\\)[^{;]*`, "g");
      jsCode = jsCode.replace(regex, (match, argsStr) => {
        const cleanedParams = argsStr.split(",")
          .map(p => p.trim())
          .filter(p => p)
          .map(p => {
            const parts = p.split(/\s+/);
            const name = parts[parts.length - 1];
            return name.replace(/[*&[\]]/g, ""); // Strip pointers/references and array brackets
          })
          .join(", ");
          
        if (hasClass) {
          return ` ${fn}(${cleanedParams}) `;
        } else {
          return ` function ${fn}(${cleanedParams}) `;
        }
      });
    });
    
    // 4. Translate output prints
    jsCode = jsCode
      .replace(/\bSystem\.out\.println\(/g, "console.log(")
      .replace(/\bSystem\.out\.print\(/g, "console.log(")
      .replace(/\bprintf\(/g, "console.log(")
      .replace(/\bcout\s*<<\s*([^;]+);/g, (match, body) => {
        const expr = body.replace(/<<\s*endl/g, "").replace(/<</g, "+");
        return `console.log(${expr});`;
      })
      .replace(/\s*<<\s*endl/g, "");
      
    // 5. Replace C++ standard vector/array/map initialization braces
    jsCode = jsCode
      .replace(/=\s*\{([^}]+)\};/g, "= [$1];")
      .replace(/return\s*\{([^}]+)\};/g, "return [$1];")
      .replace(/new\s+\w+\[\]\s*\{([^}]+)\}/g, "[$1]")
      .replace(/\w+<[^>]+>\s*\{([^}]+)\}/g, "[$1]");
      
    // 6. Map size()/length() to length
    jsCode = jsCode
      .replace(/\.length\(\)/g, ".length")
      .replace(/\.size\(\)/g, ".length");

    // 7. Replace C++ cin >>
    jsCode = jsCode.replace(/\bcin\s*>>\s*([^;]+);/g, (match, body) => {
      const vars = body.split(">>").map(v => v.trim());
      return vars.map(v => `${v} = input();`).join(" ");
    });

    // 8. Replace type specifiers in variable declarations with 'let'
    const typeRegex = /\b(?:int|double|float|char|boolean|String|auto|vector<\w+>|Map<\w+,\s*\w+>|HashMap<\w+,\s*\w+>|bool|string|Scanner|BufferedReader|InputStreamReader)\b(?![\s*&]*\()(?:\s+[*&]*|\s+)([a-zA-Z_]\w*)/g;
    jsCode = jsCode.replace(typeRegex, "let $1");
    
    // Cleanup any lingering type keywords used in declarations
    jsCode = jsCode
      .replace(/\bint\[\]\b/g, "")
      .replace(/\bint\b/g, "")
      .replace(/\bbool\b/g, "")
      .replace(/\bchar\*\b/g, "")
      .replace(/\bchar\b/g, "")
      .replace(/\bstring\b/g, "")
      .replace(/\bString\b/g, "")
      .replace(/\bvoid\b/g, "")
      .replace(/\bdouble\b/g, "")
      .replace(/\bfloat\b/g, "")
      .replace(/\bpublic\b/g, "")
      .replace(/\bprivate\b/g, "")
      .replace(/\bprotected\b/g, "")
      .replace(/\bstatic\b/g, "");
  }
  
  return jsCode;
};

const runCompilerTestCases = (code, language, question) => {
  const lang = language.toLowerCase();
  
  // 1. Logic checking of tokens to display EXACT coding mistakes (fallbacks)
  const lowerCode = code.toLowerCase();
  let logicError = "";
  switch (question.id) {
    case 1:
      if (!lowerCode.includes("hello") && !lowerCode.includes("world")) {
        logicError = "❌ Logic Error: Missing expected text output 'Hello World'. Check your spelling.";
      }
      break;
    case 2:
      if (!lowerCode.includes("%")) {
        logicError = "❌ Logic Error: Missing modulo operator (%) to perform even/odd checks.";
      }
      break;
    case 3:
      if (!lowerCode.includes("for") && !lowerCode.includes("while")) {
        logicError = "❌ Logic Error: Missing loop control structures ('for' or 'while') to traverse numbers.";
      } else if (!lowerCode.includes("map") && !lowerCode.includes("dict") && !lowerCode.includes("hash") && !lowerCode.includes("complement")) {
        logicError = "❌ Logic Error: Missing complements lookup table (HashMap/Dictionary) to search complement index in O(N).";
      }
      break;
    case 4:
      if (!lowerCode.includes("reverse") && !lowerCode.includes("swap") && !lowerCode.includes("[::-1]")) {
        logicError = "❌ Logic Error: Missing string reversal helper, manual character swaps, or reverse slice indexing.";
      }
      break;
    case 5:
      if (!lowerCode.includes("==") && !lowerCode.includes("equals") && !lowerCode.includes("compare")) {
        logicError = "❌ Logic Error: Missing equality comparison check (== or equals) to validate front and back character symmetry.";
      }
      break;
    case 6:
      if (!lowerCode.includes(">") && !lowerCode.includes("max")) {
        logicError = "❌ Logic Error: Missing iteration variable comparison (>) or max check statement.";
      }
      break;
    case 7:
      if (!lowerCode.includes("%")) {
        logicError = "❌ Logic Error: Missing modulo checks (%) to verify numbers divisibility.";
      } else if (!lowerCode.includes("fizz") || !lowerCode.includes("buzz")) {
        logicError = "❌ Logic Error: Missing conditional results for 'Fizz' or 'Buzz' outputs.";
      }
      break;
    case 8:
      if (!lowerCode.includes("sort") && !lowerCode.includes("count") && !lowerCode.includes("map") && !lowerCode.includes("dict")) {
        logicError = "❌ Logic Error: Missing character sorting or frequency count comparison structures.";
      }
      break;
    case 9:
      if (!lowerCode.includes("*")) {
        logicError = "❌ Logic Error: Missing multiplication operator (*) or recursive multiply step.";
      }
      break;
    case 10:
      if (!lowerCode.includes("+")) {
        logicError = "❌ Logic Error: Missing summation logic (e.g., prev1 + prev2) or loop arrays.";
      }
      break;
    case 11:
      if (!lowerCode.includes("%") && !lowerCode.includes("isprime")) {
        logicError = "❌ Logic Error: Missing factor division checks (modulo % check) to locate prime divisibility.";
      }
      break;
    case 12:
      if (!lowerCode.includes("stack") && !lowerCode.includes("push") && !lowerCode.includes("pop") && !lowerCode.includes("list")) {
        logicError = "❌ Logic Error: Missing Stack declarations or matching bracket push/pop array logic.";
      }
      break;
    case 13:
      if (!lowerCode.includes("pointer") && !lowerCode.includes("left") && !lowerCode.includes("right") && !lowerCode.includes("while")) {
        logicError = "❌ Logic Error: Missing two-pointer index indicators ('left', 'right') or pointers convergence loop.";
      } else if (!lowerCode.includes("max") && !lowerCode.includes("area")) {
        logicError = "❌ Logic Error: Missing container area capacity comparisons (e.g. area check or Math.max).";
      }
      break;
    case 14:
      if (!lowerCode.includes("while") && !lowerCode.includes("for") && !lowerCode.includes("sort")) {
        logicError = "❌ Logic Error: Missing array iteration pointers or merging sort logic.";
      }
      break;
    case 15:
      if (!lowerCode.includes("mid") || (!lowerCode.includes("low") && !lowerCode.includes("high"))) {
        logicError = "❌ Logic Error: Missing binary search boundaries ('low', 'high') or midpoint division ('mid = low + (high - low)/2') inside your loop.";
      }
      break;
    case 16:
      if (!lowerCode.includes("expand") && !lowerCode.includes("center") && !lowerCode.includes("for") && !lowerCode.includes("while")) {
        logicError = "❌ Logic Error: Missing substring palindrome validation or center-expansion iterations.";
      }
      break;
  }

  // Transpile to JS
  let transpiledCode = code;
  try {
    transpiledCode = transpileToJS(code, language);
  } catch (e) {
    return {
      error: `Transpilation Error: ${e.message}`,
      line: null,
      success: false,
      passedCount: 0,
      totalCount: question.testCases.length
    };
  }

  try {
    const funcName = getExpectedFuncName(question.id);
    let passedCount = 0;
    const testCaseResults = [];
    
    for (let i = 0; i < question.testCases.length; i++) {
      const tc = question.testCases[i];
      let logs = [];
      const customConsole = {
        log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
        error: (...args) => logs.push("[ERROR] " + args.join(' ')),
        warn: (...args) => logs.push("[WARN] " + args.join(' '))
      };
      
      // Mocks construction for STDIN reading
      const rawInputStr = String(tc.input);
      const cleanedInputStr = rawInputStr.replace(/[\[\]]/g, " ").replace(/,\s*/g, " ").replace(/["']/g, "").trim();
      const tokens = cleanedInputStr.split(/\s+/).filter(Boolean);
      
      let tokenIdx = 0;
      const inputMock = () => {
        if (tokenIdx >= tokens.length) return "";
        const token = tokens[tokenIdx++];
        if (/^-?\d+$/.test(token)) return parseInt(token, 10);
        if (/^-?\d+\.\d+$/.test(token)) return parseFloat(token);
        return token;
      };
      
      class ScannerMock {
        constructor() {
          this.tokens = tokens;
          this.tokenIdx = 0;
        }
        hasNext() {
          return this.tokenIdx < this.tokens.length;
        }
        next() {
          if (!this.hasNext()) return null;
          const token = this.tokens[this.tokenIdx++];
          if (/^-?\d+$/.test(token)) return parseInt(token, 10);
          if (/^-?\d+\.\d+$/.test(token)) return parseFloat(token);
          return token;
        }
        nextInt() {
          const val = this.next();
          return val !== null ? parseInt(val, 10) : 0;
        }
        nextDouble() {
          const val = this.next();
          return val !== null ? parseFloat(val) : 0.0;
        }
        nextLine() {
          return this.tokens.slice(this.tokenIdx).join(" ");
        }
      }

      // Wrapped execution function matching closures
      const wrapperFunc = new Function('console', 'Scanner', 'input', '__input__', `
        return function executeProgram() {
          ${transpiledCode}
          
          // Check for main method execution
          if (typeof main !== 'undefined') {
            if (typeof main.main === 'function') {
              return main.main([]);
            }
            try {
              const instance = new main();
              if (typeof instance.main === 'function') {
                return instance.main([]);
              }
            } catch(e) {}
          }
          if (typeof Main !== 'undefined') {
            if (typeof Main.main === 'function') {
              return Main.main([]);
            }
            try {
              const instance = new Main();
              if (typeof instance.main === 'function') {
                return instance.main([]);
              }
            } catch(e) {}
          }
          if (typeof main === 'function') {
            return main([]);
          }
          
          // Otherwise look for method name
          if (typeof ${funcName} !== 'undefined') return ${funcName};
          if (typeof Solution !== 'undefined') {
            try {
              const instance = new Solution();
              if (typeof instance.${funcName} === 'function') {
                return (...args) => instance.${funcName}(...args);
              }
            } catch(e) {}
          }
          return null;
        };
      `);
      
      const programExecutor = wrapperFunc(customConsole, ScannerMock, inputMock, cleanedInputStr);
      const executionResult = programExecutor();
      
      let actualValue;
      if (typeof executionResult === 'function') {
        const args = parseInput(tc.input, question.id);
        const retVal = executionResult(...args);
        if (retVal !== undefined && retVal !== null) {
          actualValue = retVal;
        } else if (logs.length > 0) {
          actualValue = logs.join("\n").trim();
        } else {
          actualValue = retVal;
        }
      } else {
        if (logs.length > 0) {
          actualValue = logs.join("\n").trim();
        } else {
          actualValue = executionResult;
        }
      }
      
      let actualStr = typeof actualValue === "object" ? JSON.stringify(actualValue) : String(actualValue).trim();
      let expectedStr = tc.expected.trim();
      
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
      
      const passed = normActual === normExpected;
      if (passed) passedCount++;
      
      testCaseResults.push({
        input: tc.input,
        expected: expectedStr,
        actual: actualStr,
        passed
      });
    }
    
    const success = passedCount === question.testCases.length;
    let errText = "";
    if (!success && logicError) {
      errText = logicError;
    }
    
    return {
      success,
      passedCount,
      totalCount: question.testCases.length,
      results: testCaseResults,
      logs: [],
      error: errText
    };
    
  } catch (err) {
    if (logicError) {
      return {
        error: `${err.toString()}\n\n💡 Suggestion: ${logicError}`,
        line: getLineNumberFromError(err, code),
        success: false,
        passedCount: 0,
        totalCount: question.testCases.length,
        logs: []
      };
    }
    const lineNum = getLineNumberFromError(err, code);
    return {
      error: err.toString(),
      line: lineNum,
      success: false,
      passedCount: 0,
      totalCount: question.testCases.length,
      logs: []
    };
  }
};

export default function CompilerPage() {
  const router = useRouter();
  const [level, setLevel] = useState("Easy");
  const [solvedIds, setSolvedIds] = useState([]);
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

  // Filter codingQuestions by selected difficulty
  const questionsOfLevel = codingQuestions.filter(
    (q) => q.difficulty.toLowerCase() === level.toLowerCase()
  );

  const question = questionsOfLevel[currentQuestionIndex] || questionsOfLevel[0] || codingQuestions[0];

  // Load question ID from URL if provided and load solved IDs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSolved = localStorage.getItem("careerbridge_solved_coding");
      if (savedSolved) {
        try {
          setSolvedIds(JSON.parse(savedSolved));
        } catch (e) {
          console.error(e);
        }
      }

      const params = new URLSearchParams(window.location.search);
      const idParam = params.get("id");
      if (idParam) {
        const id = parseInt(idParam, 10);
        const q = codingQuestions.find(q => q.id === id);
        if (q) {
          const diff = q.difficulty; // e.g. "Easy", "Medium", "Hard"
          setLevel(diff);
          
          const filtered = codingQuestions.filter(x => x.difficulty.toLowerCase() === diff.toLowerCase());
          const idx = filtered.findIndex(x => x.id === id);
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

  const runCode = () => {
    setIsRunning(true);
    setHasSubmitted(false);
    setErrorDetails("");
    setErrorLine(null);
    setOutput(`Compiling & Executing ${language} code...\n\n`);

    const userCode = code || getDefaultCodeForQuestion(question, language);

    setTimeout(() => {
      const evaluation = runCompilerTestCases(userCode, language, question);
      setIsRunning(false);

      if (evaluation.error) {
        setErrorDetails(evaluation.error);
        setErrorLine(evaluation.line);
        setOutput(`❌ Compilation/Runtime Error:\n${evaluation.error}${evaluation.line ? ` on Line ${evaluation.line}` : ''}`);
      } else {
        setPassedCount(evaluation.passedCount);
        setTotalCount(evaluation.totalCount);
        
        let outputText = `✅ Execution Completed.\n`;
        outputText += `Passed ${evaluation.passedCount}/${evaluation.totalCount} Test Cases.\n\n`;
        
        if (evaluation.results) {
          evaluation.results.forEach((res, i) => {
            outputText += `Test Case ${i + 1}: ${res.passed ? 'PASSED ✅' : 'FAILED ❌'}\n`;
            outputText += `  Input:    ${res.input}\n`;
            outputText += `  Expected: ${res.expected}\n`;
            outputText += `  Actual:   ${res.actual}\n\n`;
          });
        }
        
        if (evaluation.logs && evaluation.logs.length > 0) {
          outputText += `Console Output:\n${evaluation.logs.join('\n')}\n`;
        }
        
        setOutput(outputText);
      }
    }, 1000);
  };

  const submitCode = () => {
    setIsSubmitting(true);
    setHasSubmitted(false);
    setErrorDetails("");
    setErrorLine(null);
    setOutput(`Submitting solution for target evaluation...\n`);

    const userCode = code || getDefaultCodeForQuestion(question, language);

    setTimeout(() => {
      const evaluation = runCompilerTestCases(userCode, language, question);
      setIsSubmitting(false);

      setSubmissions(prev => prev + 1);
      setPassed(evaluation.success);
      setPassedCount(evaluation.passedCount);
      setTotalCount(evaluation.totalCount);
      setHasSubmitted(true);

      // Record Submission History in localStorage
      let updatedSubmissionsList = [];
      if (typeof window !== "undefined") {
        const savedSubmissions = localStorage.getItem("careerbridge_coding_submissions");
        if (savedSubmissions) {
          try {
            updatedSubmissionsList = JSON.parse(savedSubmissions);
          } catch (e) {
            console.error("Failed to parse submissions history:", e);
          }
        }
        
        const now = new Date();
        const dateStr = now.getFullYear() + "-" + 
                        String(now.getMonth() + 1).padStart(2, "0") + "-" + 
                        String(now.getDate()).padStart(2, "0") + " " + 
                        String(now.getHours()).padStart(2, "0") + ":" + 
                        String(now.getMinutes()).padStart(2, "0");

        const newSub = {
          id: Date.now().toString(),
          title: question.title,
          language: language,
          status: evaluation.error ? "Compilation Error" : (evaluation.success ? "Accepted" : "Wrong Answer"),
          difficulty: question.difficulty,
          runtime: evaluation.success ? `${Math.floor(Math.random() * 40) + 10} ms` : "-",
          date: dateStr,
          code: userCode
        };
        updatedSubmissionsList.unshift(newSub); // Add newest first
        localStorage.setItem("careerbridge_coding_submissions", JSON.stringify(updatedSubmissionsList));
      }

      if (evaluation.error && !evaluation.success) {
        setErrorDetails(evaluation.error);
        setErrorLine(evaluation.line);
        setOutput(`❌ Submission Failed due to Compilation/Runtime Error:\n${evaluation.error}`);
      } else {
        if (evaluation.success) {
          setOutput(`✅ Solution Accepted!\nPassed all ${evaluation.passedCount} test cases.`);
          setShowCorrectPopup(true); // Large rocking success overlay popup
          
          // Save solved question ID to localStorage
          let updatedSolvedList = [...solvedIds];
          if (!updatedSolvedList.includes(question.id)) {
            updatedSolvedList.push(question.id);
            if (typeof window !== "undefined") {
              localStorage.setItem("careerbridge_solved_coding", JSON.stringify(updatedSolvedList));
            }
            setSolvedIds(updatedSolvedList);
          }

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

        } else {
          setOutput(`❌ Submission Rejected.\nPassed ${evaluation.passedCount}/${evaluation.totalCount} test cases. Review the solution hint and fix errors.`);
        }
      }
    }, 1200);
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

          <div style={{ margin: "16px 0", padding: "12px", backgroundColor: "#1e1e24", borderRadius: "8px" }}>
            <h4 style={{ margin: "0 0 6px 0", color: "#888" }}>Sample Input</h4>
            <pre style={{ margin: 0, fontFamily: "monospace" }}>{question.sampleInput}</pre>
            <h4 style={{ margin: "12px 0 6px 0", color: "#888" }}>Sample Output</h4>
            <pre style={{ margin: 0, fontFamily: "monospace" }}>{question.sampleOutput}</pre>
          </div>

          <TestCases testCases={question.testCases} />
        </div>

        {/* Editor Panel */}
        <div className="editor-panel">
          <LanguageSelector
            language={language}
            setLanguage={handleLanguageChange}
          />

          <CodeEditor
            code={code}
            setCode={handleCodeChange}
            language={language}
            defaultCode={questionSpecificDefaultCode}
          />

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

          <OutputPanel output={output} />

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
