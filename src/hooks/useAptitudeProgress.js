"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function useAptitudeProgress() {
  const { user } = useAuth();
  const [solvedList, setSolvedList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load solved list from Supabase or localStorage
  useEffect(() => {
    async function loadSolvedProgress() {
      setLoading(true);
      if (user && user.role !== "admin") {
        // Authenticated user: fetch from Supabase
        const { data, error } = await supabase
          .from("solved_aptitude")
          .select("question_key")
          .eq("user_id", user.id);
        
        if (!error && data) {
          const keys = data.map((row) => row.question_key);
          setSolvedList(keys);
          // Sync back to localStorage as a local cache/fallback
          localStorage.setItem("careerbridge_solved_aptitude", JSON.stringify(keys));
        }
      } else {
        // Guest user: fallback to localStorage
        const saved = localStorage.getItem("careerbridge_solved_aptitude");
        if (saved) {
          try {
            setSolvedList(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        }
      }
      setLoading(false);
    }

    loadSolvedProgress();
  }, [user]);

  // Mark a question as solved
  const markAsSolved = async (questionKey) => {
    if (solvedList.includes(questionKey)) return;

    const updatedList = [...solvedList, questionKey];
    setSolvedList(updatedList);

    // Save locally
    localStorage.setItem("careerbridge_solved_aptitude", JSON.stringify(updatedList));

    // Save to Supabase if logged in
    if (user && user.role !== "admin") {
      await supabase.from("solved_aptitude").insert({
        user_id: user.id,
        question_key: questionKey,
      });
    }
  };

  // Reset progress for a list of question keys
  const resetCategoryProgress = async (questionKeys) => {
    const updatedList = solvedList.filter((item) => !questionKeys.includes(item));
    setSolvedList(updatedList);

    // Save locally
    localStorage.setItem("careerbridge_solved_aptitude", JSON.stringify(updatedList));

    // Save to Supabase if logged in
    if (user && user.role !== "admin") {
      await supabase
        .from("solved_aptitude")
        .delete()
        .eq("user_id", user.id)
        .in("question_key", questionKeys);
    }
  };

  return {
    solvedList,
    loading,
    markAsSolved,
    resetCategoryProgress,
  };
}
