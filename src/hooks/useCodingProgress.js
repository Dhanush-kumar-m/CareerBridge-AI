"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function useCodingProgress() {
  const { user } = useAuth();
  const [solvedIds, setSolvedIds] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load progress and submissions history
  useEffect(() => {
    async function loadCodingData() {
      setLoading(true);
      if (user && user.role !== "admin") {
        // Authenticated: Load solved question IDs
        const { data: solvedData, error: solvedError } = await supabase
          .from("solved_coding")
          .select("question_id")
          .eq("user_id", user.id);

        let sIds = [];
        if (!solvedError && solvedData) {
          sIds = solvedData.map((row) => parseInt(row.question_id, 10));
          setSolvedIds(sIds);
          localStorage.setItem("careerbridge_solved_coding", JSON.stringify(sIds));
        }

        // Authenticated: Load submissions history
        const { data: subData, error: subError } = await supabase
          .from("coding_submissions")
          .select("*")
          .eq("user_id", user.id)
          .order("submitted_at", { ascending: false });

        if (!subError && subData) {
          const mappedSubs = subData.map((row) => {
            const date = new Date(row.submitted_at);
            const dateStr = date.getFullYear() + "-" + 
                            String(date.getMonth() + 1).padStart(2, "0") + "-" + 
                            String(date.getDate()).padStart(2, "0") + " " + 
                            String(date.getHours()).padStart(2, "0") + ":" + 
                            String(date.getMinutes()).padStart(2, "0");
            return {
              id: row.id.toString(),
              title: row.question_title,
              language: row.language,
              status: row.status,
              difficulty: "Medium", // Default fallback difficulty
              runtime: row.status === "Accepted" ? `${Math.floor(Math.random() * 40) + 10} ms` : "-",
              date: dateStr,
              code: row.code
            };
          });
          setSubmissions(mappedSubs);
          localStorage.setItem("careerbridge_coding_submissions", JSON.stringify(mappedSubs));
        }
      } else {
        // Guest: fallback to localStorage
        const savedSolved = localStorage.getItem("careerbridge_solved_coding");
        if (savedSolved) {
          try {
            setSolvedIds(JSON.parse(savedSolved));
          } catch (e) {
            console.error(e);
          }
        }

        const savedSubs = localStorage.getItem("careerbridge_coding_submissions");
        if (savedSubs) {
          try {
            setSubmissions(JSON.parse(savedSubs));
          } catch (e) {
            console.error(e);
          }
        } else {
          // Initialize mock submissions if none exist
          const mock = [
            {
              id: "mock-1",
              title: "Two Sum",
              language: "Java",
              status: "Accepted",
              difficulty: "Easy",
              runtime: "42 ms",
              date: "2026-06-26 14:35",
              code: `public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Two sum O(N) HashMap solution\n        java.util.Map<Integer, Integer> map = new java.util.HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return null;\n    }\n}`
            },
            {
              id: "mock-2",
              title: "Reverse String",
              language: "Python",
              status: "Accepted",
              difficulty: "Easy",
              runtime: "12 ms",
              date: "2026-06-25 18:20",
              code: `def reverseString(str):\n    # Python slice reverse\n    return str[::-1]`
            },
            {
              id: "mock-3",
              title: "Valid Parentheses",
              language: "JavaScript",
              status: "Wrong Answer",
              difficulty: "Medium",
              runtime: "-",
              date: "2026-06-24 10:12",
              code: `function isValid(str) {\n    // Incorrect logic: only checks length\n    return str.length % 2 === 0;\n}`
            }
          ];
          localStorage.setItem("careerbridge_coding_submissions", JSON.stringify(mock));
          setSubmissions(mock);
        }
      }
      setLoading(false);
    }

    loadCodingData();
  }, [user]);

  // Mark a coding question as solved
  const markAsSolved = async (questionId, difficulty = "Medium") => {
    const qIdNum = parseInt(questionId, 10);
    if (solvedIds.includes(qIdNum)) return;

    const updatedSolved = [...solvedIds, qIdNum];
    setSolvedIds(updatedSolved);
    localStorage.setItem("careerbridge_solved_coding", JSON.stringify(updatedSolved));

    if (user && user.role !== "admin") {
      await supabase.from("solved_coding").insert({
        user_id: user.id,
        question_id: questionId.toString(),
      });
    }
  };

  // Add a new submission to logs
  const addSubmission = async ({ questionId, questionTitle, code, language, status, difficulty = "Medium", passedCount = 0, totalCount = 0 }) => {
    const now = new Date();
    const dateStr = now.getFullYear() + "-" + 
                    String(now.getMonth() + 1).padStart(2, "0") + "-" + 
                    String(now.getDate()).padStart(2, "0") + " " + 
                    String(now.getHours()).padStart(2, "0") + ":" + 
                    String(now.getMinutes()).padStart(2, "0");

    const newSub = {
      id: Date.now().toString(),
      title: questionTitle,
      language: language,
      status: status,
      difficulty: difficulty,
      runtime: status === "Accepted" ? `${Math.floor(Math.random() * 40) + 10} ms` : "-",
      date: dateStr,
      code: code
    };

    const updatedSubs = [newSub, ...submissions];
    setSubmissions(updatedSubs);
    localStorage.setItem("careerbridge_coding_submissions", JSON.stringify(updatedSubs));

    if (user && user.role !== "admin") {
      await supabase.from("coding_submissions").insert({
        user_id: user.id,
        question_id: questionId.toString(),
        question_title: questionTitle,
        code: code,
        language: language,
        status: status,
        passed_test_cases: passedCount,
        total_test_cases: totalCount
      });
    }
  };

  return {
    solvedIds,
    submissions,
    loading,
    markAsSolved,
    addSubmission
  };
}
